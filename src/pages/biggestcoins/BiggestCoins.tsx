import { Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import FormHelperText from "@mui/material/FormHelperText";
import FormLabel from "@mui/material/FormLabel";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import SettingsIcon from "@mui/icons-material/Settings";
import Stack from "@mui/material/Stack";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";

import { APP_BAR_HEIGHT, API_URL } from "../../constants.js";
import { StyledBoxForPages, ChartComponent } from "../../components";
import { BiggestCoinsProps, BiggestCoinData, SettingsState, CoinCardProps, SettingsProps } from "../../utils/types";

const BiggestCoins = (props: BiggestCoinsProps) => {
	const { setSettingsButton } = props;
	const [settingsState, setSettingsState] = useState<SettingsState>({
		stable: true,
		wrapped: true,
	});
	const filterFunction = (el: BiggestCoinData) => {
		if (el.stable && !settingsState.stable) {
			return;
		} else if (el.wrapped && !settingsState.wrapped) {
			return;
		} else {
			return el;
		}
	};

	useEffect(() => {
		return () => {
			setSettingsButton();
		};
	}, [setSettingsButton]);

	const { isLoading, error, data } = useQuery<BiggestCoinData[]>({
		queryKey: ["cryptoolsTokensData"],
		queryFn: () =>
			fetch(new URL("tokens", API_URL).toString()).then((res) =>
				res.json()
			),
	});

	if (error) return <>&apos;An error has occurred: &apos; + error.message</>;

	if (isLoading) return <Skeleton variant="rounded" height={60} />;

	return (
		<Box id="biggestcoins" sx={{ height: "100%" }}>
			<StyledBoxForPages
				id="biggestcoins-container"
				sx={{ top: APP_BAR_HEIGHT }}
			>
				<Settings
					settingsState={settingsState}
					setSettingsState={setSettingsState}
					setSettingsButton={setSettingsButton}
				/>
				<Grid
					id="biggestcoins-grid-container"
					container
					alignItems="stretch"
					spacing={1}
					sx={{ p: 1 }}
				>
					{Array.from((data || []).filter((el: BiggestCoinData) => filterFunction(el))).map(
						(coin: BiggestCoinData, index: number) => (
							<Grid
								item
								xs={12}
								md={2.4}
								key={index}
								sx={{ width: "100%" }}
							>
								<CoinCard coin={coin} />
							</Grid>
						)
					)}
				</Grid>
			</StyledBoxForPages>
		</Box>
	);
};

const CoinCard = ({ coin }: CoinCardProps) => {
	const navigate = useNavigate();

	function handleClick() {
		navigate("/charts", {
			state: { symbol: coin.symbol },
		});
	}

	return !coin ? (
		<Skeleton variant="rounded" sx={{ height: "150px" }} />
	) : (
		<Card
			variant="outlined"
			square={true}
			sx={{ width: "100%", height: "100%" }}
		>
			<CardContent
				sx={{ p: 0, [`&:last-child`]: { p: 0 }, height: "100%" }}
			>
				<CardActionArea
					sx={{ height: "100%" }}
					onClick={(p) => handleClick()}
				>
					<Stack
						direction="column"
						spacing={1}
						sx={{ p: 1, height: "100%" }}
					>
						<Stack direction="row" spacing={4}>
							<CardMedia
								component="img"
								sx={{
									objectFit: "contain",
									width: "50px",
									display: "unset",
								}}
								image={coin.image}
								alt={coin.name}
							/>
							<Stack
								direction="row"
								spacing={1}
								alignItems="center"
							>
								<Typography
									variant="body2"
									noWrap
									color="text.secondary"
									gutterBottom
								>
									{coin.marketCapRank}
								</Typography>
								<Typography
									variant="subtitle1"
									noWrap
									component="div"
								>
									{coin.name}
								</Typography>
								<Typography
									sx={{ mb: 1.5 }}
									noWrap
									color="text.secondary"
								>
									[{coin.symbol}]
								</Typography>
								<Typography
									sx={{ mb: 1.5 }}
									noWrap
									color="text.secondary"
								>
									{coin.stable ? "stable" : null}
								</Typography>
							</Stack>
						</Stack>
						<Stack
							direction={"row"}
							spacing={4}
							justifyContent="center"
						>
							<Typography variant="subtitle2" noWrap align="left">
								Market Cap: $ {coin.marketCap}
								<br />
								Market Cap Change (24h): ${" "}
								{coin.marketCapChange24H}
								<br />
								Market Cap Change(24h - %):{" "}
								{coin.marketCapChangePercentage24H}
								<br />
								Price: $ {coin.currentPrice}
								<br />
								Price Change (24h): $ {coin.priceChange24H}
								<br />
								Circulating Supply: {coin.circulatingSupply}
							</Typography>
						</Stack>
						{coin.sparkline7D !== undefined ? (
							<Box sx={{ minHeight: 100 }}>
								{coin !== undefined ? (
									<ChartComponent data={coin.sparkline7D} />
								) : null}
							</Box>
						) : null}
					</Stack>
				</CardActionArea>
			</CardContent>
		</Card>
	);
};

export default BiggestCoins;

const Settings = (props: SettingsProps) => {
	const [open, setOpen] = useState(false);
	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const { settingsState, setSettingsState, setSettingsButton } = props;

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setSettingsState({
			...settingsState,
			[event.target.name]: event.target.checked,
		});
	};

	const SettingsButton = () => {
		return (
			<IconButton
				onClick={handleClickOpen}
				size="large"
				color="inherit"
				sx={{ justifyContent: "right" }}
			>
				<SettingsIcon />
			</IconButton>
		);
	};

	useEffect(() => {
		setSettingsButton(<SettingsButton />);
	}, [setSettingsButton]);

	return (
		<>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogContent>
					<FormControl component="fieldset" variant="standard">
						<FormLabel component="legend" sx={{ mb: 2 }}>
							Settings
						</FormLabel>
						<FormGroup>
							<FormControlLabel
								control={
									<Switch
										checked={settingsState.stable}
										onChange={handleChange}
										name="stable"
									/>
								}
								label="Stable Coins"
							/>
							<FormControlLabel
								control={
									<Switch
										checked={settingsState.wrapped}
										onChange={handleChange}
										name="wrapped"
									/>
								}
								label="Wrapped"
							/>
						</FormGroup>
						<FormHelperText></FormHelperText>
					</FormControl>
				</DialogContent>
			</Dialog>
		</>
	);
};
