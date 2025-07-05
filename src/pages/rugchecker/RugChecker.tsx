import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Container from "@mui/material/Container";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import LinearProgress from "@mui/material/LinearProgress";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
// @ts-expect-error - Web3 types not properly resolved
import Web3 from "web3";

import {
	APP_BAR_HEIGHT,
	POOCOIN_ICON,
	POOCOIN_URL,
	BSCSCAN_ICON,
	BSCSCAN_TOKEN_URL,
} from "../../constants.js";
import { safuTest } from "../../utils";
import { StyledPaper, InfoCard } from "../../components";
import { TestResults, TargetAddressComponentProps, ButtonToExternalSiteProps } from "../../utils/types";

let web3 = new Web3(Web3.givenProvider);

const RugChecker = () => {
	const location = useLocation();
	const redirectedTargetAddress = location.state?.redirectedTargetAddress;
	const navigate = useNavigate();

	const [testResults, setTestResults] = useState<TestResults>({ tokenStatus: false });
	const [targetAddressInput, setTargetAddressInput] = useState("");
	const [targetAddress, setTargetAddress] = useState<string | null>(null);

	async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const address = e.target.value;
		setTargetAddressInput(address);
		await setTargetAddressIfValid(address);
	}

	async function handlePasteButtonClick(e: React.MouseEvent<HTMLButtonElement>) {
		const clipboardText = await navigator.clipboard.readText();
		setTargetAddressInput(clipboardText);
		await setTargetAddressIfValid(clipboardText);
	}

	async function setTargetAddressIfValid(address: string) {
		const isAddress = web3.utils.isAddress(address);
		if (isAddress) {
			setTargetAddress(address);
		} else {
			setTargetAddress(null);
		}
	}

	const handleGoToSniperClick = () => {
		navigate("/sniper", {
			state: { redirectedTargetAddress: targetAddress },
		});
	};

	useEffect(() => {
		async function testToken() {
			if (targetAddress == null) {
				setTestResults({ tokenStatus: false });
				return;
			}
			setTargetAddressInput(targetAddress);
			const results = await safuTest(targetAddress);
			if (results) {
				setTestResults(results as TestResults);
			}
		}
		testToken();
	}, [targetAddress]);

	useEffect(() => {
		if (redirectedTargetAddress == null) return;
		setTargetAddress(redirectedTargetAddress);
	}, [redirectedTargetAddress]);

	return (
		<div id="rugchecker">
			<Box
				sx={{
					top: APP_BAR_HEIGHT,
					bottom: 0,
					left: 0,
					right: 0,
					position: "absolute",
				}}
			>
				<Container maxWidth="md" sx={{ p: 2 }}>
					{web3.currentProvider ? (
						<>
							<StyledPaper id="rug-checker-section">
								<Typography
									sx={{
										pb: 2,
										color:
											testResults.tokenStatus === false
												? "error.light"
												: "text.main",
									}}
								>
									Rug Checker
								</Typography>
								<TargetAddressComponent
									tokenStatus={testResults.tokenStatus}
									targetAddressInput={targetAddressInput}
									handleClick={handlePasteButtonClick}
									handleChange={handleChange}
								/>
								{targetAddress && (
									<Grid
										container
										spacing={2}
										alignItems="stretch"
									>
										{testResults.tokenStatus ===
										undefined ? (
											<Grid item sm={12}>
												<LinearProgress />
											</Grid>
										) : (
											<>
												{Object.entries(
													testResults
												).map(([key, value], index) => {
													const nofitems =
														Object.values(
															testResults
														).filter(
															(v) =>
																v != null &&
																typeof v ===
																	"string"
														).length;
													return (
														<InfoCard
															md={12 / nofitems}
															xs={12 / nofitems}
															key={index}
															title={key}
															value={String(value)}
															tokenStatus={
																testResults.tokenStatus
															}
														/>
													);
												})}
												<Grid
													item
													sm={12}
													sx={{ p: "0 !important" }}
												/>
												<PoocoinItem targetAddress={targetAddress} />
												<BscScanItem targetAddress={targetAddress} />
											</>
										)}
									</Grid>
								)}
								{testResults.tokenStatus && (
									<Button
										variant="contained"
										onClick={handleGoToSniperClick}
										sx={{ width: "100%", mt: 2 }}
									>
										Go to Sniper!
									</Button>
								)}
							</StyledPaper>
						</>
					) : (
						<StyledPaper id="rugchecker-install-metamask">
							<Typography sx={{ p: 1 }}>
								Please install MetaMask
							</Typography>
						</StyledPaper>
					)}
				</Container>
			</Box>
		</div>
	);
};

const TargetAddressComponent = (props: TargetAddressComponentProps) => {
	const { targetAddressInput, tokenStatus, handleClick, handleChange } =
		props;
	return (
		<Stack
			direction="row"
			spacing={1}
			sx={{
				alignItems: "center",
				borderRadius: 1,
				mb: 2,
			}}
		>
			<TextField
				id="rugchecker-target-address"
				size="small"
				label="Token Contract Address"
				variant="outlined"
				fullWidth
				value={targetAddressInput}
				onChange={handleChange}
				error={tokenStatus === false ? true : false}
				sx={{
					backgroundColor: "background.default",
					input: {
						color:
							tokenStatus === false ? "error.main" : "text.main",
					},
				}}
			/>
			<IconButton
				color="primary"
				sx={{ borderRadius: 1 }}
				onClick={handleClick}
			>
				<ContentPasteIcon />
			</IconButton>
		</Stack>
	);
};

const ButtonToExternalSite = (props: ButtonToExternalSiteProps) => {
	const { targetAddress, baseUrl, icon } = props;
	const url = new URL(targetAddress, baseUrl).href;
	return (
		<Grid item>
			<Card>
				<CardActionArea
					sx={{
						backgroundColor: "background.default",
						flexGrow: 1,
						p: 1,
					}}
					onClick={() => window.open(url)}
				>
					<img
						src={icon}
						style={{
							width: 24,
							height: 24,
						}}
					/>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

const PoocoinItem = (props: { targetAddress: string }) => {
	const { targetAddress } = props;
	return (
		<ButtonToExternalSite
			targetAddress={targetAddress}
			baseUrl={POOCOIN_URL}
			icon={POOCOIN_ICON}
		/>
	);
};

const BscScanItem = (props: { targetAddress: string }) => {
	const { targetAddress } = props;
	return (
		<ButtonToExternalSite
			targetAddress={targetAddress}
			baseUrl={BSCSCAN_TOKEN_URL}
			icon={BSCSCAN_ICON}
		/>
	);
};

export default RugChecker;
