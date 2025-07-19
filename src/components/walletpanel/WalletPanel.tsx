import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import { StyledPaper } from "..";
import InfoLabel from "../infolabel/InfoLabel";
import { ConnectButtonProps, ExtendedWalletPanelProps } from "../../utils/types";

const ConnectButton = (props: ConnectButtonProps) => {
	const { connect, currentAccount } = props;

	async function handleClick() {
		if (!currentAccount) {
			console.log("Connecting to MetaMask.");
			connect();
		} else {
		}
	}
	return (
		<Button
			id="connect-wallet-button"
			onClick={handleClick}
			variant="outlined"
			color="primary"
			startIcon={
				currentAccount ? (
					<RadioButtonCheckedIcon color="success" />
				) : (
					<RadioButtonUncheckedIcon />
				)
			}
			sx={{ pl: 4, pr: 4 }}
		>
			{currentAccount ? "Connected" : "Connect"}
		</Button>
	);
};

const WalletPanel = (props: ExtendedWalletPanelProps) => {
	const { currentAccount, chainId, balance, connect, buyTxsApproved } = props;

	return (
		<StyledPaper id="wallet-section" data-testid="wallet-panel">
			<Typography sx={{ pb: 2 }}>Wallet</Typography>
			<Stack spacing={2}>
				<Stack
					direction="row"
					spacing={2}
					sx={{
						alignItems: "stretch",
						justifyContent: "space-between",
					}}
				>
					<ConnectButton connect={connect} currentAccount={currentAccount || null} />
					<InfoLabel fullWidth name="ChainId" value={String(chainId || "")} />
				</Stack>
				{currentAccount ? (
					<>
						<Stack spacing={2}>
							<InfoLabel name="Address" value={currentAccount} />
							<InfoLabel name="Balance" value={String(balance || "")} />
							<InfoLabel
								name="Buy Txs Approved"
								value={String(buyTxsApproved || "")}
							/>
						</Stack>
					</>
				) : null}
			</Stack>
		</StyledPaper>
	);
};
export default WalletPanel;
