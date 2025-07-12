import { Skeleton } from "@mui/material";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages, CoinCard, SettingsDialog } from "../../components";
import { useTokensDataContext } from "../../contexts/TokensDataContext";
import { BiggestCoinsProps, SettingsState } from "../../utils/types";

const BiggestCoins = ({ setSettingsButton }: BiggestCoinsProps) => {
	const [settingsState, setSettingsState] = useState<SettingsState>({
		stable: true,
		wrapped: true,
	});

	const { isLoading, error, biggestCoinsData } = useTokensDataContext();

	if (error) return <div>An error has occurred: {error.message}</div>;
	if (isLoading || !biggestCoinsData) return <Skeleton variant="rounded" height={60} />;

	const filteredData = biggestCoinsData.filter((coin: any) => 
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
					{filteredData.map((coin: any, index: number) => (
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
