import { AdvancedRealTimeChart } from "react-ts-tradingview-widgets";
import Box from "@mui/material/Box";
import { useLocation } from "react-router-dom";

import { APP_BAR_HEIGHT } from "../../constants.js";

const Charts = () => {
	const location = useLocation();
	const symbol = location.state?.symbol;

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
