import { Skeleton } from "@mui/material";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages, CoinCard, SettingsDialog } from "../../components";
import { useTokensDataContext } from "../../contexts/TokensDataContext";
import { BiggestCoinsProps, SettingsState } from "../../utils/types";
import { SidePanel } from "../bscsniffer/elements";

const BiggestCoins = ({ setSettingsButton }: BiggestCoinsProps) => {
	const [settingsState, setSettingsState] = useState<SettingsState>({
		stable: true,
		wrapped: true,
	});

	const { isLoading, error, biggestCoinsData } = useTokensDataContext();

	if (error) return <div>An error has occurred: {error.message}</div>;
	if (isLoading || !biggestCoinsData) return (
		<StyledBoxForPages 
			id="biggest-coins" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Grid container spacing={2} sx={{ height: '100%' }}>
							{[...Array(8)].map((_, index) => (
								<Grid item xs={12} sm={6} md={4} lg={3} key={index} sx={{ height: "50%" }}>
									<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
								</Grid>
							))}
						</Grid>
					</Grid>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);

	const filteredData = biggestCoinsData.filter((coin: any) => 
		(!coin.stable || settingsState.stable) && (!coin.wrapped || settingsState.wrapped)
	);

	return (
		<StyledBoxForPages 
			id="biggestcoins" 
			data-testid="biggest-coins-page" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main content */}
					<Grid item xs={12} md={8} sx={{ height: '100%', overflowY: "auto" }}>
						<SettingsDialog
							settingsState={settingsState}
							setSettingsState={setSettingsState}
							setSettingsButton={setSettingsButton}
						/>
						<Grid data-testid="biggest-coins-grid" container alignItems="stretch" spacing={1} sx={{ p: 1 }}>
							{filteredData.map((coin: any, index: number) => (
								<Grid item xs={12} md={4} key={index} sx={{ width: "100%" }}>
									<CoinCard coin={coin} />
								</Grid>
							))}
						</Grid>
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

export default BiggestCoins;
