import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import { Theme } from "@mui/material/styles";
import { MarketSentiment } from "../../utils/types";

// Helper function for background color
export const getBackgroundColor = (marketSentiment: MarketSentiment, theme: Theme) => {
	if (marketSentiment === "bullish") {
		return theme.palette.mode === "light"
			? "linear-gradient(135deg, #4caf50 0%, #81c784 100%)"
			: "linear-gradient(135deg, #2e7d32 0%, #388e3c 100%)";
	} else if (marketSentiment === "bearish") {
		return theme.palette.mode === "light"
			? "linear-gradient(135deg, #f44336 0%, #ef5350 100%)"
			: "linear-gradient(135deg, #c62828 0%, #d32f2f 100%)";
	} else {
		return theme.palette.mode === "light"
			? "linear-gradient(135deg, #9e9e9e 0%, #bdbdbd 100%)"
			: "linear-gradient(135deg, #424242 0%, #616161 100%)";
	}
};

export const MarketOverviewContainer = styled(Box)<{ marketSentiment: MarketSentiment }>(({ theme, marketSentiment }) => ({
	width: "100%",
	padding: theme.spacing(1.5),
	background: getBackgroundColor(marketSentiment, theme),
	color: "white",
	borderRadius: "12px",
	position: "relative",
	overflow: "hidden",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "rgba(255, 255, 255, 0.1)",
		clipPath: "polygon(0 0, 100% 0, 100% 70%, 0 100%)",
		pointerEvents: "none",
	},
}));

export const SentimentDisplayBox = styled(Box)({
	background: "rgba(255, 255, 255, 0.2)",
	borderRadius: 8,
	padding: 8,
	backdropFilter: "blur(10px)",
	border: "1px solid rgba(255, 255, 255, 0.3)",
	display: "inline-flex",
	alignItems: "self-end",
	justifyContent: "center",
});

export const SentimentTitleTypography = styled(Typography)({
	fontWeight: "bold",
	fontFamily: "VT323, monospace",
	fontSize: "1rem",
});

export const SentimentValueTypography = styled(Typography)({
	fontWeight: "bold",
	fontFamily: "VT323, monospace",
	fontSize: "1.5rem",
	textTransform: "uppercase",
	textAlign: "center",
	textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
});

export const BitcoinChangeContainer = styled(Stack)({
	background: "rgba(0, 0, 0, 0.2)",
	borderRadius: 8,
	padding: 8,
	backdropFilter: "blur(10px)",
});

export const BitcoinLabelTypography = styled(Typography)({
	fontWeight: "bold",
	fontFamily: "VT323, monospace",
	fontSize: "0.9rem",
});

export const BitcoinValueTypography = styled(Typography)<{ marketCapChangePercentage24H: number }>(({ theme, marketCapChangePercentage24H }) => ({
	fontWeight: "bold",
	fontFamily: "VT323, monospace",
	fontSize: "1rem",
	color:
		marketCapChangePercentage24H > 0
			? theme.palette.success.main
			: marketCapChangePercentage24H < 0
				? theme.palette.error.main
				: theme.palette.text.secondary,
}));

export const SentimentDescriptionTypography = styled(Typography)({
	opacity: 0.9,
	fontFamily: "VT323, monospace",
	fontSize: "0.8rem",
	textAlign: "center",
});

export const SentimentIconBox = styled(Box)({
	fontSize: "2rem",
	filter: "drop-shadow(2px 2px 4px rgba(0,0,0,0.3))",
});

export const BitcoinImage = styled("img")({
	width: 24,
	height: 24,
});