import { createChart, ColorType, AreaData } from "lightweight-charts";
import { ChartComponentProps } from "../../utils/types";
import { useRef, useEffect } from "react";

export const ChartComponent = (props: ChartComponentProps) => {
	const {
		data,
		colors: {
			backgroundColor = "transparent",
			lineColor = "#2962FF",
			textColor = "black",
			areaTopColor = "#2962FF",
			areaBottomColor = "rgba(41, 98, 255, 0.28)",
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

	return <div ref={chartContainerRef} />;
};

export default ChartComponent;
