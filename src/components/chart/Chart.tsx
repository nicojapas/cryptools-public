import { createChart, ColorType, AreaData } from "lightweight-charts";
import { ChartComponentProps } from "../../utils/types";
import { useRef, useEffect } from "react";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/material";

const StyledBox = styled(Box)(({ theme }) => ({
	position: "relative",
	height: "100%",
	width: "100%",
	padding: theme.spacing(1),
	borderRadius: "12px",
	background: theme.palette.mode === 'light'
		? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(248, 250, 252, 0.1) 100%)"
		: "linear-gradient(135deg, rgba(26, 31, 46, 0.1) 0%, rgba(10, 14, 26, 0.1) 100%)",
	border: theme.palette.mode === 'light'
		? "1px solid rgba(102, 126, 234, 0.1)"
		: "1px solid rgba(102, 126, 234, 0.2)",
}));

export const ChartComponent = (props: ChartComponentProps) => {
	const {
		data,
		colors: {
			backgroundColor = "transparent",
			lineColor = "#667eea",
			textColor = "black",
			areaTopColor = "#667eea",
			areaBottomColor = "rgba(102, 126, 234, 0.2)",
		} = {},
	} = props;

	const chartContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (data === undefined || !Array.isArray(data) || data.length === 0) return;

		const handleResize = () => {
			chart.applyOptions({
				width: chartContainerRef.current!.clientWidth,
			});
		};

		const chart = createChart(chartContainerRef.current!, {
			layout: {
				background: { type: ColorType.Solid, color: backgroundColor },
				textColor,
			},
			height: 150,
			autoSize: true,
			handleScale: {
				axisPressedMouseMove: {
					time: false,
					price: false,
				},
				mouseWheel: false,
			},
			handleScroll: {
				mouseWheel: false,
			},
			timeScale: {
				visible: false,
			},
			grid: {
				vertLines: { visible: false },
				horzLines: { visible: false },
			},
			rightPriceScale: {
				visible: false,
			},
		});
		chart.timeScale().fitContent();

		// Transform data to the format expected by lightweight-charts
		const chartData: AreaData[] = data.map((value, index) => ({
			time: index as any, // Using index as time for sparkline data
			value: typeof value === 'number' ? value : parseFloat(String(value)) || 0,
		}));

		const newSeries = chart.addAreaSeries({
			lineColor,
			topColor: areaTopColor,
			bottomColor: areaBottomColor,
			lastValueVisible: true,
			priceLineVisible: false,
		});
		newSeries.setData(chartData);

		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			chart.remove();
		};
	}, [
		data,
		backgroundColor,
		lineColor,
		textColor,
		areaTopColor,
		areaBottomColor,
	]);

	return (
		<StyledBox>
			<div 
				ref={chartContainerRef} 
				role="img" 
				aria-label="Price chart showing historical data trend"
				tabIndex={0}
			/>
		</StyledBox>
	);
};

export default ChartComponent;
