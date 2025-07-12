import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

import { APP_BAR_HEIGHT } from "../../constants.js";

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
			<div id="charts">
				<Box
					id="charts-container"
					sx={{
						top: APP_BAR_HEIGHT,
						bottom: 0,
						left: 0,
						right: 0,
						position: "absolute",
						overflowX: "hidden",
						overflowY: "hidden",
					}}
				>
					<Box
						sx={{
							height: "-webkit-fill-available",
							p: 1,
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						Loading TradingView chart...
					</Box>
				</Box>
			</div>
		);
	}

	return (
		<div id="charts">
			<Box
				id="charts-container"
				sx={{
					top: APP_BAR_HEIGHT,
					bottom: 0,
					left: 0,
					right: 0,
					position: "absolute",
					overflowX: "hidden",
					overflowY: "hidden",
				}}
			>
				<Box
					sx={{
						height: "-webkit-fill-available",
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
			</Box>
		</div>
	);
};

export default Charts;
