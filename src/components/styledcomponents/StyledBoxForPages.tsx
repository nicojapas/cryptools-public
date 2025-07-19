import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledBoxForPages = styled(Box)(({ theme }) => ({
	width: "100%",
	height: "100%",
	overflow: "hidden", // Changed from "auto" to "hidden" to prevent scrolling
	background: "transparent",
	"&::-webkit-scrollbar": {
		width: "8px",
		height: "8px",
	},
	"&::-webkit-scrollbar-track": {
		background: theme.palette.mode === 'light' ? "#f1f1f1" : "#2a2a2a",
		borderRadius: "4px",
	},
	"&::-webkit-scrollbar-thumb": {
		background: theme.palette.mode === 'light' ? "#00B894" : "#00D4AA",
		borderRadius: "4px",
		transition: "background 0.3s ease",
		"&:hover": {
			background: theme.palette.mode === 'light' ? "#00A085" : "#00B894",
		},
	},
	// Smooth animations for page transitions
	animation: "fadeIn 0.6s ease-out",
	"@keyframes fadeIn": {
		from: {
			opacity: 0,
			transform: "translateY(20px)",
		},
		to: {
			opacity: 1,
			transform: "translateY(0)",
		},
	},
}));

export default StyledBoxForPages;
