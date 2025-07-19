import { StyledPaper } from "..";
import { useState } from "react";
import Button from "@mui/material/Button";
import InputAdornment from "@mui/material/InputAdornment";
import Link from "@mui/material/Link";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import { SniperSettingsPanelProps } from "../../utils/types";

export const SniperSettingsPanel = (props: SniperSettingsPanelProps) => {
	const {
		selectedDexVer,
		handleSelectedDexVer,
		selectedDexAddress,
		balance,
		buyAmount,
		setBuyAmount,
	} = props;
	const [autoSelectSlippage, setAutoSelectSlippage] = useState(true);

	return (
		<StyledPaper id="settings-section" data-testid="sniper-settings-panel">
			<Stack spacing={2}>
				<Typography>Settings</Typography>
				<Typography>
					Cryptools is not an exchange. This swap feature performs
					swaps on the Pancakeswap DEX.
				</Typography>
				<Stack
					direction="row"
					spacing={2}
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
					<Link
						href={selectedDexAddress}
						target="_blank"
						rel="noreferrer"
					>
						Pancake{" "}
						{selectedDexVer === "auto" ? "v2" : selectedDexVer}
					</Link>
				</Stack>
				<Stack direction="row" justifyContent="space-between">
					<TextField
						disabled={autoSelectSlippage ? true : false}
						fullWidth
						size="small"
						label="Slippage (%)"
						defaultValue={0.5}
						sx={{ backgroundColor: "background.default" }}
					/>
					<ToggleButton
						size="small"
						sx={{ ml: 1, minWidth: "50px" }}
						value="auto-select"
						selected={autoSelectSlippage}
						onChange={() => {
							setAutoSelectSlippage(!autoSelectSlippage);
						}}
						aria-label="Toggle automatic slippage selection"
					>
						Auto
					</ToggleButton>
				</Stack>
				<Stack direction="row" justifyContent="space-between">
					<TextField
						fullWidth
						size="small"
						label="Amount (BNB)"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<img
										src="https://r.poocoin.app/smartchain/assets/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c/logo.png"
										width="20"
										height="20"
										alt="BNB token logo"
									/>
								</InputAdornment>
							),
						}}
						sx={{ backgroundColor: "background.default" }}
						onChange={(e) => setBuyAmount(Number(e.target.value))}
						value={buyAmount}
					/>
					<Button
						size="small"
						variant="outlined"
						sx={{
							ml: 1,
							color: "text.primary",
							minWidth: "50px",
							"&:hover": { backgroundColor: "primary.light" },
						}}
						onClick={() => setBuyAmount(Number(balance))}
						aria-label="Set amount to maximum available balance"
					>
						Max
					</Button>
				</Stack>
			</Stack>
		</StyledPaper>
	);
};

export default SniperSettingsPanel;
