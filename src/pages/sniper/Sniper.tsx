import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Container from "@mui/material/Container";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

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

export const Sniper = () => {
	const { ethereum } = window;
	const [chainId, setChainId] = useState<number | undefined>();
	const [currentAccount, setCurrentAccount] = useState<string | null>();
	const [balance, setBalance] = useState<string | undefined>();
	const [targetAddressInput, setTargetAddressInput] = useState<string | undefined>();
	const [targetAddress, setTargetAddress] = useState<string | undefined>();

	const [targetData, setTargetData] = useState<TargetData | null>(null);

	const web3 = new Web3(Web3.givenProvider);

	const location = useLocation();
	const redirectedTargetAddress = location.state?.redirectedTargetAddress;

	useEffect(() => {
		if (redirectedTargetAddress == null) return;
		if (currentAccount == null) return;
		setTargetAddressInput(redirectedTargetAddress);
		setTargetAddress(redirectedTargetAddress);
	}, [redirectedTargetAddress, currentAccount]);

	useEffect(() => {
		if (targetAddress == null) return;
		if (currentAccount == null) return;
		getTargetData().then((data) => {
			if (data) setTargetData(data);
		});
	}, [targetAddress, currentAccount]);

	/**********************************************************/
	/* Handle chain (network) and chainChanged (per EIP-1193) */
	/**********************************************************/
	useEffect(() => {
		if (!ethereum) {
			console.log("Couldn't detect provider.");
		} else {
			ethereum
				.request({ method: "eth_chainId" })
				.then((chainIdResult: unknown) => {
					if (typeof chainIdResult === 'string') {
						setChainId(parseInt(chainIdResult, 16));
					}
				})
				.catch((err: Error) => console.log(err));
		}
	}, [ethereum]);

	ethereum?.on(
		"chainChanged",
		(_chainIdData: unknown) => {
			window.location.reload();
		}
	);

	/***********************************************************/
	/* Handle user accounts and accountsChanged (per EIP-1193) */
	/***********************************************************/

	// Note that this event is emitted on page load.
	// If the array of accounts is non-empty, you're already
	// connected.
	useEffect(() => {
		if (ethereum) {
			ethereum
				.request({ method: "eth_accounts" })
				.then((accountsResult: unknown) => {
					if (Array.isArray(accountsResult)) {
						handleAccountsChanged(accountsResult as string[]);
					}
				})
				.catch((err: Error) => {
					console.error(err);
				});
			ethereum.on("accountsChanged", (accountsData: unknown) => {
				if (Array.isArray(accountsData)) {
					handleAccountsChanged(accountsData as string[]);
				}
			});
		}
	}, []);

	function handleAccountsChanged(accounts: string[]) {
		if (accounts.length === 0) {
			setCurrentAccount(null);
		} else if (accounts[0] !== currentAccount) {
			let _currentAccount = accounts[0];
			setCurrentAccount(_currentAccount);
			getBalance(_currentAccount);
		}
	}

	function connect() {
		if (!ethereum) {
			console.log("Couldn't detect provider.");
		} else {
			ethereum
				.request({ method: "eth_requestAccounts" })
				.then((accountsResult: unknown) => {
					if (Array.isArray(accountsResult)) {
						handleAccountsChanged(accountsResult as string[]);
					}
				})
				.catch((err: Error & { code?: number }) => {
					if (err.code === 4001) {
						console.log("Please connect to MetaMask.");
					} else {
						console.error(err);
					}
				});
		}
	}

	async function getBalance(address: string) {
		let balance = await web3.eth.getBalance(address);
		balance = web3.utils.fromWei(balance);
		setBalance(balance);
	}

	async function handlePasteButtonClick() {
		const clipboardText = await navigator.clipboard.readText();
		setTargetAddressInput(clipboardText);
		setTargetAddressIfValid(clipboardText);
	}

	async function setTargetAddressIfValid(address: string) {
		const isAddress = await web3.utils.isAddress(address);
		if (isAddress) {
			setTargetAddress(address);
		} else {
			setTargetAddress(undefined);
		}
		console.log(address);
	}

	useEffect(() => {
		if (redirectedTargetAddress == null) return;
		setTargetAddress(redirectedTargetAddress);
	}, [redirectedTargetAddress]);

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

	const getTargetData = async (): Promise<TargetData | null> => {
		if (!targetAddress || !currentAccount) return null;
		
		const contract = new web3.eth.Contract(ABI_ERC20, targetAddress);
		const handleError = (e: Error) => {
			setTargetAddress(undefined);
			setTargetData(null);
			console.log(e.message);
		};
		try {
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
			handleError(error as Error);
			return null;
		}
	};

	const TargetPanel = () => {
		return (
			<StyledPaper id="target-section">
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
							value={targetAddressInput}
							disabled={currentAccount ? false : true}
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
							disabled={currentAccount ? false : true}
						>
							<ContentPasteIcon />
						</IconButton>
					</Stack>
				</Stack>
				{targetAddress ? (
					<Grid
						container
						spacing={2}
						sx={{
							alignItems: "center",
							pt: 2,
						}}
					>
						{targetData && (
							<>
								{targetAddress && targetData == null ? (
									<CircularProgress />
								) : null}
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
							</>
						)}
						<Grid item sx={{ width: "fit-content", pt: 2 }}>
							<PoocoinItem targetAddress={targetAddress} />
						</Grid>
						<Grid item sx={{ width: "fit-content", pt: 2 }}>
							<BscScanItem targetAddress={targetAddress} />
						</Grid>
					</Grid>
				) : null}
			</StyledPaper>
		);
	};

	return (
		<StyledBoxForPages
			id="sniper"
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden" }}
		>
			<Container maxWidth="md" sx={{ p: 2 }}>
				{ethereum ? (
					<>
						<Grid container spacing={2} alignItems="stretch">
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
							{targetAddress && targetData != null ? (
								<Grid item xs={12}>
									<TxsPanel
										web3={web3}
										chainId={chainId || 0}
										currentAccount={currentAccount || ""}
										buyAmount={buyAmount}
										targetAddress={targetAddress}
									/>
								</Grid>
							) : null}
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
