import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

export const StyledAppBar = styled(AppBar)(({ theme }) => ({
	backgroundImage: "none",
	backdropFilter: "blur(20px)",
	backgroundColor: theme.palette.mode === 'light' 
		? "rgba(30, 41, 59, 0.9)" 
		: "rgba(10, 14, 26, 0.95)",
	borderBottom: theme.palette.mode === 'light' 
		? "1px solid rgba(0, 212, 170, 0.3)" 
		: "1px solid rgba(0, 212, 170, 0.2)",
	boxShadow: theme.palette.mode === 'light'
		? "0 4px 20px rgba(0, 0, 0, 0.3)"
		: "0 4px 20px rgba(0, 0, 0, 0.5)",
	position: "relative",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		background: "linear-gradient(90deg, rgba(0, 212, 170, 0.1) 0%, rgba(255, 193, 7, 0.1) 50%, rgba(0, 212, 170, 0.1) 100%)",
		pointerEvents: "none",
	},
}));

export const StyledButton = styled(Button)(({ theme }) => ({
	background: theme.palette.mode === 'light'
		? "linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)"
		: "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)",
	borderRadius: "8px",
	padding: "8px 16px",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	border: theme.palette.mode === 'light'
		? "2px solid rgba(0, 212, 170, 0.3)"
		: "2px solid rgba(0, 212, 170, 0.4)",
	fontFamily: "'VT323', monospace",
	fontWeight: 400,
	letterSpacing: "0.02em",
	"&:hover": {
		background: theme.palette.mode === 'light'
			? "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)"
			: "linear-gradient(135deg, rgba(0, 212, 170, 0.3) 0%, rgba(255, 193, 7, 0.3) 100%)",
		transform: "translateY(-2px)",
		boxShadow: "0 6px 16px rgba(0, 212, 170, 0.4)",
		border: theme.palette.mode === 'light'
			? "2px solid rgba(0, 212, 170, 0.5)"
			: "2px solid rgba(0, 212, 170, 0.6)",
	},
}));

export const GradientText = styled(Typography)(() => ({
	background: "linear-gradient(135deg, #00B894 0%, #FFC107 50%, #00D4AA 100%)",
	WebkitBackgroundClip: "text",
	WebkitTextFillColor: "transparent",
	backgroundClip: "text",
	fontWeight: 400,
	letterSpacing: ".1rem",
	fontSize: "1.2rem",
	textDecoration: "none",
	position: "relative",
	fontFamily: "'VT323', monospace",
	textTransform: "uppercase",
	"&::after": {
		content: '""',
		position: "absolute",
		bottom: -2,
		left: 0,
		width: "100%",
		height: "2px",
		background: "linear-gradient(90deg, #00B894, #FFC107, #00D4AA)",
		borderRadius: "1px",
		transform: "scaleX(0)",
		transition: "transform 0.3s ease",
	},
	"&:hover::after": {
		transform: "scaleX(1)",
	},
}));