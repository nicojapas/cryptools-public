import { Skeleton } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages, CoinCard, SettingsDialog } from "../../components";
import { useTokensData } from "../../hooks";
import { BiggestCoinsProps, SettingsState } from "../../utils/types";

const BiggestCoins = ({ setSettingsButton }: BiggestCoinsProps) => {
	const [settingsState, setSettingsState] = useState<SettingsState>({
		stable: true,
		wrapped: true,
	});

	const { isLoading, error, data } = useTokensData();

	if (error) return <div>An error has occurred: {error.message}</div>;
	if (isLoading || !data) return <Skeleton variant="rounded" height={60} />;

	const filteredData = data.filter(coin => 
		(!coin.stable || settingsState.stable) && (!coin.wrapped || settingsState.wrapped)
	);

	return (
		<Box id="biggestcoins" sx={{ height: "100%" }}>
			<StyledBoxForPages id="biggestcoins-container" sx={{ top: APP_BAR_HEIGHT }}>
				<SettingsDialog
					settingsState={settingsState}
					setSettingsState={setSettingsState}
					setSettingsButton={setSettingsButton}
				/>
				<Grid container alignItems="stretch" spacing={1} sx={{ p: 1 }}>
					{filteredData.map((coin, index) => (
						<Grid item xs={12} md={2.4} key={index} sx={{ width: "100%" }}>
							<CoinCard coin={coin} />
						</Grid>
					))}
				</Grid>
			</StyledBoxForPages>
		</Box>
	);
};



export default BiggestCoins;
