import { StyledPaper } from "..";
import { useState } from "react";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import {
	PS_ROUTER_ADDRESS,
	PS_ROUTER_ABI,
	WBNB_ADDRESS,
} from "../../constants";
import { TsxPanelProps } from "../../utils/types";

export const TsxPanel = (props: TsxPanelProps) => {
	const { currentAccount, web3, chainId, buyAmount, targetAddress } = props;
	const contractPancakeSwapRouterMainnet = new web3.eth.Contract(
		PS_ROUTER_ABI,
		PS_ROUTER_ADDRESS
	);

	const [statusMessage, setStatusMessage] = useState<string | object | string[] | undefined>(undefined);
	function handleClick() {
		if (!currentAccount) {
			setStatusMessage("No connected account found.");
			return;
		} else if (chainId == 0x38) {
			let msg: Record<string, string> = { action: "attempting transaction on the BSC Mainnet" };
			setStatusMessage(msg);
			buy(
				msg,
				String(buyAmount),
				String(currentAccount),
				targetAddress,
				contractPancakeSwapRouterMainnet,
				WBNB_ADDRESS
			)
				.then((receipt) => {
					setStatusMessage(
						typeof receipt === "string"
							? receipt
							: Object.entries(receipt).map(([k, v]) => String(k) + ": " + String(v))
					);
				})
				.catch(() => {/* Error handled silently */});
		} else {
			console.log("Chain not supported.");
		}
	}

	async function buy(
		msg: Record<string, string>,
		inputAmount: string,
		walletAddress: string,
		targetTokenAddress: string,
		router: any,
		inTokenAddress: string,
		_waitingTime?: number
	) {
		try {
			const waitingTime = _waitingTime || 300000;
			inputAmount =
				"0x" +
				web3.utils
					.toBN(web3.utils.toWei(inputAmount, "ether"))
					.toString(16);
			const amounts = await router.methods
				.getAmountsOut(inputAmount, [
					inTokenAddress,
					targetTokenAddress,
				])
				.call();
			const expectedAmountOut = web3.utils.toBN(amounts[1]);
			const slippage = 0.1;
			const slippageBN = web3.utils.toBN(Math.floor(slippage * 100));
			const amountOutMin = expectedAmountOut.mul(
				web3.utils.toBN(1).sub(slippageBN.div(web3.utils.toBN(100)))
			);
			msg["expected output amount"] = web3.utils.fromWei(
				expectedAmountOut.toString(),
				"ether"
			);
			msg["amount out min"] = web3.utils.fromWei(
				amountOutMin.toString(),
				"ether"
			);
			const swapExactETHForTokensArgs = [
				amountOutMin.toString(),
				[WBNB_ADDRESS, targetTokenAddress],
				walletAddress,
				String(parseInt(Date.now().toString()) + waitingTime),
			];
			const swapPromise = router.methods.swapExactETHForTokens(
				...swapExactETHForTokensArgs
			);
			const gas = await swapPromise.estimateGas({
				from: walletAddress,
				value: inputAmount,
			});
			msg["estimated gas"] = gas;
			setStatusMessage(Object.entries(msg).map(([k, v]) => k + ": " + v));
			const receipt = await swapPromise.send({
				from: walletAddress,
				value: inputAmount,
				gas: gas,
			});
			return receipt;
		} catch (e: any) {
			const jsonStartIndex = e.message.indexOf("{");
			const jsonString = e.message.substring(jsonStartIndex);
			let parsedError = JSON.parse(jsonString);
			parsedError = { status: "error", ...parsedError };
			return parsedError;
		}
	}

	return (
		<StyledPaper id="sniper-tsx" data-testid="transactions-panel">
			<Typography sx={{ pb: 2 }}>Execution</Typography>
			<Grid container spacing={2} direction="row">
				<Grid item xs={2}>
					<Button
						variant="contained"
						onClick={handleClick}
						sx={{ width: "100%" }}
					>
						Buy
					</Button>
				</Grid>
				<Grid item xs={10}>
					<Paper
						variant="outlined"
						sx={{
							backgroundColor: "background.default",
							alignItems: "center",
							height: "100%",
						}}
					>
						<>
							{statusMessage != null ? (
								typeof statusMessage === "string" ? (
									<Typography
										sx={{
											overflowWrap: "break-word",
											p: 1,
											textAlign: "left",
										}}
									>
										{statusMessage}
									</Typography>
								) : (
									(statusMessage as string[]).map((entry, index) => (
										<Typography
											key={index}
											sx={{
												overflowWrap: "break-word",
												p: 1,
												textAlign: "left",
											}}
										>
											{entry}
										</Typography>
									))
								)
							) : null}
						</>
					</Paper>
				</Grid>
			</Grid>
		</StyledPaper>
	);
};

export default TsxPanel;
