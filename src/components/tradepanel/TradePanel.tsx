import React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import InputAdornment from "@mui/material/InputAdornment";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Grid from "@mui/material/Grid";
import { StyledPaper } from "../../components";
import { TradePanelProps } from "../../utils/types";

const TradePanel: React.FC<TradePanelProps> = ({ selectedDexVer, handleSelectedDexVer, selectedDexAddress }) => {
	return (
		<StyledPaper id="trading-section">
			<Typography sx={{ pt: 1 }}>Trade</Typography>
			<Stack
				spacing={1}
				sx={{
					alignItems: "stretch",
					p: 1,
					pl: 20,
					pr: 20,
					justifyContent: "space-between",
				}}
			>
				<Typography>
					Cryptools is not an exchange. This swap feature performs
					swaps on the Pancakeswap DEX.
				</Typography>
				<Grid container justifyContent="flex-start">
					<Grid item xs={6}>
						<Stack
							direction="row"
							spacing={1}
							sx={{ alignItems: "center" }}
						>
							<ToggleButtonGroup
								size="small"
								value={selectedDexVer}
								exclusive
								onChange={handleSelectedDexVer}
								aria-label="selected dex version"
							>
								<ToggleButton value="auto" aria-label="auto">
									Auto
								</ToggleButton>
								<ToggleButton value="v1" aria-label="v1">
									Pancake v1
								</ToggleButton>
								<ToggleButton value="v2" aria-label="v2">
									Pancake v2
								</ToggleButton>
							</ToggleButtonGroup>
							<Stack>
								{selectedDexVer === "auto" ? (
									<Typography variant="button">
										Auto selected
									</Typography>
								) : null}
								<Link
									href={selectedDexAddress}
									target="_blank"
									rel="noreferrer"
								>
									Pancake{" "}
									{selectedDexVer === "auto"
										? "v2"
										: selectedDexVer}
								</Link>
							</Stack>
						</Stack>
					</Grid>
					<Grid item xs={6} sx={{ textAlign: "right" }}>
						<TextField
							size="small"
							label="Slippage (%)"
							defaultValue={0.5}
							InputProps={{
								endAdornment: (
									<InputAdornment position="start">
										<Button sx={{ ml: 1 }}>Auto</Button>
									</InputAdornment>
								),
							}}
						/>
					</Grid>
				</Grid>
				<Stack spacing={1} sx={{ alignItems: "stretch" }}>
					<TextField
						size="small"
						label="From (BNB)"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<img
										src="https://r.poocoin.app/smartchain/assets/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png"
										width="20"
										height="20"
									/>
								</InputAdornment>
							),
							endAdornment: (
								<InputAdornment position="end">
									<Button>Max</Button>
								</InputAdornment>
							),
						}}
						sx={{ backgroundColor: "background.default" }}
					/>
					<div>
						<IconButton
							sx={{
								backgroundColor: "primary.main",
								width: "fit-content",
								boxShadow:
									"0px 3px 1px -2px rgb(0 0 0 / 20%), 0px 2px 2px 0px rgb(0 0 0 / 14%), 0px 1px 5px 0px rgb(0 0 0 / 12%)",
								"&:hover": {
									backgroundColor: "primary.dark",
								},
							}}
						>
							<ArrowDownwardIcon
								sx={{
									color: "white",
								}}
							/>
						</IconButton>
					</div>
					<TextField
						size="small"
						label="To (CARMA)"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<img
										src="https://r.poocoin.app/smartchain/assets/0x27e89d357957cE332Ff442DB69F4b476401BbBc5/logo.png"
										width="20"
										height="20"
									/>
								</InputAdornment>
							),
						}}
					/>
					<Button variant="contained">Swap</Button>
				</Stack>
			</Stack>
		</StyledPaper>
	);
};

export default TradePanel;
