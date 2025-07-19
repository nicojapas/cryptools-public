import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages } from "../../components";
import { SidePanel } from "../bscsniffer/elements";

const Charts = () => {
	const location = useLocation();
	const symbol = location.state?.symbol;
	const [AdvancedRealTimeChart, setAdvancedRealTimeChart] = useState<any>(null);

	useEffect(() => {
		import("react-ts-tradingview-widgets")
			.then((module) => {
				setAdvancedRealTimeChart(() => module.AdvancedRealTimeChart);
			})
			.catch((error) => {
				console.error("Failed to load TradingView widget:", error);
			});
	}, []);

	if (!AdvancedRealTimeChart) {
		return (
			<StyledBoxForPages 
				id="charts" 
				data-testid="charts-page" 
				sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
			>
				<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
					<Grid container spacing={2} sx={{ height: '100%' }}>
						{/* Left side panel - hidden on small screens */}
						<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
							<SidePanel isLeft={true} />
						</Grid>

						{/* Main content */}
						<Grid item xs={12} md={8} sx={{ height: '100%' }}>
							<Box
								sx={{
									height: "100%",
									p: 1,
									display: "flex",
									alignItems: "center",
									justifyContent: "center",
								}}
							>
								Loading TradingView chart...
							</Box>
						</Grid>

						{/* Right side panel - hidden on small screens */}
						<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
							<SidePanel isLeft={false} />
						</Grid>
					</Grid>
				</Container>
			</StyledBoxForPages>
		);
	}

	return (
		<StyledBoxForPages 
			id="charts" 
			data-testid="charts-page" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Box
							sx={{
								height: "100%",
								p: 1,
							}}
						>
							<AdvancedRealTimeChart
								symbol={
									symbol === undefined ? "BTCUSD" : symbol + "USD"
								}
								locale="en"
								// theme={props.theme.palette.mode === 'dark' ? 'dark' : 'light'}
								autosize
							/>
						</Box>
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

export default Charts;
