import React, { useEffect, useState, useCallback } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";

import {
	APP_BAR_HEIGHT,
	POOCOIN_ICON,
	POOCOIN_URL,
	BSCSCAN_ICON,
	BSCSCAN_TOKEN_URL,
	ABI_ERC20,
} from "../../constants.js";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";

import {
	StyledPaper,
	InfoCard,
	StyledBoxForPages,
	WalletPanel,
	SniperSettingsPanel,
	TxsPanel,
} from "../../components";
import { useLocation } from "react-router-dom";
import { TargetData, ExternalSiteButtonProps, PoocoinItemProps, BscScanItemProps } from "../../utils/types";
import { SidePanel } from "../bscsniffer/elements";

// Declare Web3 globally to prevent TypeScript errors
declare global {
	interface Window {
		Web3?: any;
	}
}

export const Sniper = () => {
	const [chainId, setChainId] = useState<number | undefined>();
	const [currentAccount, setCurrentAccount] = useState<string | null>();
	const [balance, setBalance] = useState<string | undefined>();
	const [targetAddressInput, setTargetAddressInput] = useState<string | undefined>();
	const [targetAddress, setTargetAddress] = useState<string | undefined>();
	const [targetData, setTargetData] = useState<TargetData | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	// Safe access to ethereum and web3
	const ethereum = typeof window !== 'undefined' ? window.ethereum : undefined;
	const web3 = ethereum && window.Web3 ? new window.Web3(window.Web3.givenProvider) : null;

	const location = useLocation();
	const redirectedTargetAddress = location.state?.redirectedTargetAddress;

	// Safe clipboard access
	const handlePasteButtonClick = useCallback(async () => {
		try {
			if (!navigator.clipboard) {
				setError("Clipboard API not supported");
				return;
			}
			const clipboardText = await navigator.clipboard.readText();
			setTargetAddressInput(clipboardText);
			setTargetAddressIfValid(clipboardText);
		} catch (err) {
			setError("Failed to read clipboard");
			console.error("Clipboard error:", err);
		}
	}, []);

	// Safe address validation
	const setTargetAddressIfValid = useCallback(async (address: string) => {
		if (!web3) {
			setError("Web3 not available");
			return;
		}
		try {
			const isAddress = await web3.utils.isAddress(address);
			if (isAddress) {
				setTargetAddress(address);
				setError(null);
			} else {
				setTargetAddress(undefined);
				setError("Invalid address format");
			}
		} catch (err) {
			setError("Failed to validate address");
			console.error("Address validation error:", err);
		}
	}, [web3]);

	// Safe balance fetching
	const getBalance = useCallback(async (address: string) => {
		if (!web3) return;
		try {
			const balance = await web3.eth.getBalance(address);
			const formattedBalance = web3.utils.fromWei(balance);
			setBalance(formattedBalance);
		} catch (err) {
			setError("Failed to fetch balance");
			console.error("Balance fetch error:", err);
		}
	}, [web3]);

	// Safe target data fetching
	const getTargetData = useCallback(async (): Promise<TargetData | null> => {
		if (!targetAddress || !currentAccount || !web3) return null;
		
		try {
			const contract = new web3.eth.Contract(ABI_ERC20, targetAddress);
			const [name, symbol, balanceOf, decimals, totalSupply] = await Promise.all([
				contract.methods.name().call(),
				contract.methods.symbol().call(),
				contract.methods.balanceOf(currentAccount).call(),
				contract.methods.decimals().call(),
				contract.methods.totalSupply().call(),
			]);
			return {
				name,
				symbol,
				balanceOf,
				decimals,
				totalSupply,
			};
		} catch (error) {
			setError("Failed to fetch token data");
			console.error("Token data fetch error:", error);
			return null;
		}
	}, [targetAddress, currentAccount, web3]);

	// Handle redirected target address
	useEffect(() => {
		if (redirectedTargetAddress && currentAccount) {
			setTargetAddressInput(redirectedTargetAddress);
			setTargetAddress(redirectedTargetAddress);
		}
	}, [redirectedTargetAddress, currentAccount]);

	// Fetch target data when address or account changes
	useEffect(() => {
		if (targetAddress && currentAccount) {
			setIsLoading(true);
			getTargetData().then((data) => {
				if (data) setTargetData(data);
				setIsLoading(false);
			}).catch(() => {
				setIsLoading(false);
			});
		}
	}, [targetAddress, currentAccount, getTargetData]);

	// Handle chain ID
	useEffect(() => {
		if (!ethereum) {
			console.log("Couldn't detect provider.");
			return;
		}

		const getChainId = async () => {
			try {
				const chainIdResult = await ethereum.request({ method: "eth_chainId" });
				if (typeof chainIdResult === 'string') {
					setChainId(parseInt(chainIdResult, 16));
				}
			} catch (err) {
				console.error("Chain ID error:", err);
				setError("Failed to get chain ID");
			}
		};

		getChainId();

		// Handle chain changes
		const handleChainChanged = () => {
			window.location.reload();
		};

		ethereum.on("chainChanged", handleChainChanged);

		return () => {
			ethereum.removeListener?.("chainChanged", handleChainChanged);
		};
	}, [ethereum]);

	// Handle accounts
	useEffect(() => {
		if (!ethereum) return;

		const handleAccountsChanged = (accounts: string[]) => {
			if (accounts.length === 0) {
				setCurrentAccount(null);
			} else if (accounts[0] !== currentAccount) {
				const newAccount = accounts[0];
				setCurrentAccount(newAccount);
				getBalance(newAccount);
			}
		};

		const getAccounts = async () => {
			try {
				const accountsResult = await ethereum.request({ method: "eth_accounts" });
				if (Array.isArray(accountsResult)) {
					handleAccountsChanged(accountsResult);
				}
			} catch (err) {
				console.error("Accounts error:", err);
			}
		};

		getAccounts();

		const accountsHandler = (accountsData: unknown) => {
			if (Array.isArray(accountsData)) {
				handleAccountsChanged(accountsData as string[]);
			}
		};

		ethereum.on("accountsChanged", accountsHandler);

		return () => {
			ethereum.removeListener?.("accountsChanged", accountsHandler);
		};
	}, [ethereum, currentAccount, getBalance]);

	// Connect function
	const connect = useCallback(async () => {
		if (!ethereum) {
			setError("MetaMask not detected");
			return;
		}

		try {
			const accountsResult = await ethereum.request({ method: "eth_requestAccounts" });
			if (Array.isArray(accountsResult)) {
				if (accountsResult.length === 0) {
					setCurrentAccount(null);
				} else {
					const account = accountsResult[0];
					setCurrentAccount(account);
					getBalance(account);
				}
			}
		} catch (err: any) {
			if (err.code === 4001) {
				setError("Please connect to MetaMask");
			} else {
				setError("Failed to connect to MetaMask");
				console.error("Connection error:", err);
			}
		}
	}, [ethereum, getBalance]);

	// DEX settings
	const [selectedDexVer, setSelectedDexVer] = useState("auto");
	const [selectedDexAddress, setSelectedDexAddress] = useState<string | undefined>();
	const [buyAmount, setBuyAmount] = useState(0);

	const handleSelectedDexVer = (_: React.MouseEvent<HTMLElement>, newSelectedDexVer: string) => {
		if (newSelectedDexVer) {
			setSelectedDexVer(newSelectedDexVer);
			if (newSelectedDexVer === "v1") {
				setSelectedDexAddress(
					"https://v1exchange.pancakeswap.finance/#/swap?outputCurrency=0x27e89d357957cE332Ff442DB69F4b476401BbBc5"
				);
			} else {
				setSelectedDexAddress(
					"https://pancakeswap.finance/swap?outputCurrency=0x27e89d357957cE332Ff442DB69F4b476401BbBc5"
				);
			}
		}
	};

	const TargetPanel = () => {
		return (
			<StyledPaper id="target-section" data-testid="sniper-target-panel">
				<Typography sx={{ pb: 2 }}>Target</Typography>
				<Stack
					spacing={2}
					sx={{
						alignItems: "stretch",
						justifyContent: "space-between",
					}}
				>
					<Stack
						direction="row"
						sx={{
							alignItems: "center",
							borderRadius: 1,
						}}
					>
						<TextField
							id="sniper-target-address"
							size="small"
							label={
								currentAccount
									? "Token Contract Address"
									: "Connect to MetaMask."
							}
							variant="outlined"
							fullWidth
							value={targetAddressInput || ""}
							disabled={!currentAccount}
							onChange={(e) => {
								const address = e.target.value;
								if (address === targetAddressInput) return;
								setTargetAddressInput(address);
								setTargetAddressIfValid(address);
							}}
							sx={{
								backgroundColor: "background.default",
								input: {
									color: targetAddress
										? "text.main"
										: "error.main",
								},
							}}
						/>
						<IconButton
							color="primary"
							sx={{ borderRadius: 1 }}
							onClick={handlePasteButtonClick}
							disabled={!currentAccount}
						>
							<ContentPasteIcon />
						</IconButton>
					</Stack>
				</Stack>
				{targetAddress && (
					<Grid
						container
						spacing={2}
						sx={{
							alignItems: "center",
							pt: 2,
						}}
					>
						{isLoading ? (
							<Grid item xs={12}>
								<Box display="flex" justifyContent="center">
									<CircularProgress />
								</Box>
							</Grid>
						) : targetData ? (
							<>
								{Object.entries(targetData).map(
									([key, value], index) => (
										<InfoCard
											md={12 / 5}
											xs={12 / 5}
											tokenStatus={true}
											key={index}
											title={key}
											value={String(value)}
										/>
									)
								)}
								<Grid item sx={{ width: "fit-content", pt: 2 }}>
									<PoocoinItem targetAddress={targetAddress} />
								</Grid>
								<Grid item sx={{ width: "fit-content", pt: 2 }}>
									<BscScanItem targetAddress={targetAddress} />
								</Grid>
							</>
						) : null}
					</Grid>
				)}
			</StyledPaper>
		);
	};

	return (
		<StyledBoxForPages
			id="sniper"
			data-testid="sniper-page"
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container data-testid="sniper-container" maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						{error && (
							<Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
								{error}
							</Alert>
						)}
						
						{ethereum ? (
							<>
								<Grid data-testid="sniper-grid" container spacing={2} alignItems="stretch">
									<Grid item xs={6} sx={{ display: "grid" }}>
										<WalletPanel
											connect={connect}
											currentAccount={currentAccount}
											chainId={chainId}
											balance={balance}
										/>
									</Grid>
									<Grid item xs={6} sx={{ display: "grid" }}>
										<SniperSettingsPanel
											buyAmount={buyAmount}
											setBuyAmount={setBuyAmount}
											balance={balance || ""}
											selectedDexAddress={selectedDexAddress || ""}
											selectedDexVer={selectedDexVer}
											handleSelectedDexVer={handleSelectedDexVer}
										/>
									</Grid>
									<Grid item xs={12}>
										<TargetPanel />
									</Grid>
									{targetAddress && targetData && (
										<Grid item xs={12}>
											<TxsPanel
												web3={web3}
												chainId={chainId || 0}
												currentAccount={currentAccount || ""}
												buyAmount={buyAmount}
												targetAddress={targetAddress}
											/>
										</Grid>
									)}
								</Grid>
							</>
						) : (
							<Grid item xs={12} sx={{ display: "flex" }}>
								<StyledPaper id="sniper-install-metamask">
									<Typography sx={{ p: 1 }}>
										Please install MetaMask
									</Typography>
								</StyledPaper>
							</Grid>
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

const ButtonToExternalSite: React.FC<ExternalSiteButtonProps> = ({ targetAddress, baseUrl, icon }) => {
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
						alt="External link"
					/>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

const PoocoinItem: React.FC<PoocoinItemProps> = ({ targetAddress }) => {
	return (
		<ButtonToExternalSite
			targetAddress={targetAddress}
			baseUrl={POOCOIN_URL}
			icon={POOCOIN_ICON}
		/>
	);
};

const BscScanItem: React.FC<BscScanItemProps> = ({ targetAddress }) => {
	return (
		<ButtonToExternalSite
			targetAddress={targetAddress}
			baseUrl={BSCSCAN_TOKEN_URL}
			icon={BSCSCAN_ICON}
		/>
	);
};

export default Sniper;
