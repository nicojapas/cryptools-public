import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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

import Web3 from "web3";

import {
	APP_BAR_HEIGHT,
	POOCOIN_ICON,
	POOCOIN_URL,
	BSCSCAN_ICON,
	BSCSCAN_TOKEN_URL,
} from "../../constants.js";
import { safuTest, validateContractAddress, contractValidationLimiter } from "../../utils";
import { StyledPaper, InfoCard, StyledBoxForPages } from "../../components";
import { TestResults, TargetAddressComponentProps, ButtonToExternalSiteProps } from "../../utils/types";
import { SidePanel } from "../bscsniffer/elements";

let web3 = new Web3(Web3.givenProvider);

const RugChecker = () => {
	const location = useLocation();
	const redirectedTargetAddress = location.state?.redirectedTargetAddress;
	const navigate = useNavigate();

	const [testResults, setTestResults] = useState<TestResults>({ tokenStatus: false });
	const [targetAddressInput, setTargetAddressInput] = useState("");
	const [targetAddress, setTargetAddress] = useState<string | null>(null);
	const [validationError, setValidationError] = useState<string | null>(null);

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const address = e.target.value;
		setTargetAddressInput(address);
		setTargetAddressIfValid(address);
	}

	async function handlePasteButtonClick() {
		try {
			const clipboardText = await navigator.clipboard.readText();
			setTargetAddressInput(clipboardText);
			setTargetAddressIfValid(clipboardText);
		} catch {
			setValidationError("Failed to read from clipboard");
		}
	}

	function setTargetAddressIfValid(address: string) {
		// Clear previous errors
		setValidationError(null);
		
		// Validate the address
		const validation = validateContractAddress(address);
		
		if (validation.isValid && validation.address) {
			setTargetAddress(validation.address);
		} else {
			setTargetAddress(null);
			if (address.trim() && validation.error) {
				setValidationError(validation.error);
			}
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

			// Check rate limiting
			if (!contractValidationLimiter.canMakeRequest()) {
				const waitTime = Math.ceil(contractValidationLimiter.getTimeUntilNextRequest() / 1000);
				setValidationError(`Rate limit exceeded. Please wait ${waitTime} seconds before testing another token.`);
				return;
			}

			setTargetAddressInput(targetAddress);
			setValidationError(null);
			
			try {
				const results = await safuTest(targetAddress);
				if (results) {
					setTestResults(results as TestResults);
				}
			} catch (error) {
				setValidationError("Failed to test token. Please try again.");
				console.error("Token test error:", error);
			}
		}
		testToken();
	}, [targetAddress]);

	useEffect(() => {
		if (redirectedTargetAddress == null) return;
		setTargetAddress(redirectedTargetAddress);
	}, [redirectedTargetAddress]);

	return (
		<StyledBoxForPages 
			id="rugchecker" 
			data-testid="rug-checker-page" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})`, maxHeight: `calc(100vh - ${APP_BAR_HEIGHT})`, overflowY: 'auto' }}
		>
			<Container data-testid="rug-checker-content" maxWidth="lg" sx={{ p: 2, height: '100%', maxHeight: '100%', overflowY: 'auto' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						{web3.currentProvider ? (
							<>
								<StyledPaper id="rug-checker-section" data-testid="rug-checker-section">
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
										validationError={validationError}
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
													{(() => {
														const entries = Object.entries(testResults);
														// Find and reorder 'name', 'msg', and 'safuness'
														const nameIdx = entries.findIndex(([key]) => key.toLowerCase() === 'name');
														let reordered = [...entries];
														// Place 'name' as second
														if (nameIdx !== -1) {
															const [nameEntry] = reordered.splice(nameIdx, 1);
															reordered.splice(1, 0, nameEntry);
														}
														// Place 'msg' as third
														const msgIdxAfterName = reordered.findIndex(([key]) => key.toLowerCase() === 'msg');
														if (msgIdxAfterName !== -1) {
															const [msgEntry] = reordered.splice(msgIdxAfterName, 1);
															reordered.splice(2, 0, msgEntry);
														}
														// Place 'safuness' as fourth
														const safunessIdxAfterMsg = reordered.findIndex(([key]) => key.toLowerCase() === 'safuness');
														if (safunessIdxAfterMsg !== -1) {
															const [safunessEntry] = reordered.splice(safunessIdxAfterMsg, 1);
															reordered.splice(3, 0, safunessEntry);
														}
														return reordered.map(([key, value], index) => (
															<Grid item xs={index < 3 ? 4 : 3} key={index}>
																<InfoCard
																	title={key}
																	value={String(value)}
																	tokenStatus={testResults.tokenStatus}
																	sx={{ height: 80, minHeight: 70, p: 1, fontSize: 12 }}
																/>
															</Grid>
														));
													})()}
													<Grid item xs={12} sx={{ mt: 2, mb: 1, display: 'flex', justifyContent: 'center' }}>
														<Stack direction="row" spacing={3} alignItems="center" justifyContent="center">
															<PoocoinItem targetAddress={targetAddress} />
															<BscScanItem targetAddress={targetAddress} />
														</Stack>
													</Grid>
													<Grid
														item
														sm={12}
														sx={{ p: "0 !important" }}
													/>
													{testResults.tokenStatus && (
														<Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
															<Button
																variant="contained"
																onClick={handleGoToSniperClick}
																sx={{ width: 'auto', px: 4 }}
															>
																Go to Sniper!
															</Button>
														</Grid>
													)}
												</>
											)}
										</Grid>
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
					</Grid>

					{/* Right side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={false} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);
};

const TargetAddressComponent = (props: TargetAddressComponentProps) => {
	const { targetAddressInput, tokenStatus, handleClick, handleChange, validationError } =
		props;
	return (
		<Stack spacing={1} sx={{ mb: 2 }}>
			<Stack
				direction="row"
				spacing={1}
				sx={{
					alignItems: "center",
					borderRadius: 1,
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
					error={!!validationError || tokenStatus === false}
					helperText={validationError}
					sx={{
						backgroundColor: "background.default",
						input: {
							color:
								validationError || tokenStatus === false ? "error.main" : "text.main",
						},
					}}
				/>
				<IconButton
					color="primary"
					sx={{ borderRadius: 1 }}
					onClick={handleClick}
					title="Paste from clipboard"
				>
					<ContentPasteIcon />
				</IconButton>
			</Stack>
		</Stack>
	);
};

const ButtonToExternalSite = (props: ButtonToExternalSiteProps) => {
	const { targetAddress, baseUrl, icon } = props;
	const url = new URL(targetAddress, baseUrl).href;
	// Add a label based on the baseUrl
	let label = '';
	if (baseUrl.includes('poocoin')) label = 'Poocoin';
	if (baseUrl.includes('bscscan')) label = 'BscScan';
	return (
		<Card sx={{ minWidth: 48, minHeight: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', p: 0.25 }}>
			<CardActionArea
				sx={{
					backgroundColor: "background.default",
					flexGrow: 1,
					p: 0.5,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
				}}
				onClick={() => window.open(url)}
			>
				<img
					src={icon}
					style={{
						width: 20,
						height: 20,
						marginBottom: 2,
					}}
				/>
				<Typography variant="body2" sx={{ fontWeight: 500, textAlign: 'center', fontSize: 11 }}>{label}</Typography>
			</CardActionArea>
		</Card>
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
