import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import Typography from "@mui/material/Typography";

export const StyledCard = styled(Card)(({ theme }) => ({
	background: theme.palette.mode === 'light'
		? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)"
		: "linear-gradient(135deg, rgba(26, 31, 46, 0.9) 0%, rgba(10, 14, 26, 0.9) 100%)",
	backdropFilter: "blur(10px)",
	border: theme.palette.mode === 'light'
		? "1px solid rgba(255, 255, 255, 0.2)"
		: "1px solid rgba(255, 255, 255, 0.1)",
	borderRadius: "16px",
	boxShadow: theme.palette.mode === 'light'
		? "0 4px 20px rgba(0, 0, 0, 0.08)"
		: "0 4px 20px rgba(0, 0, 0, 0.2)",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	"&:hover": {
		transform: "translateY(-4px)",
		boxShadow: theme.palette.mode === 'light'
			? "0 12px 40px rgba(0, 0, 0, 0.15)"
			: "0 12px 40px rgba(0, 0, 0, 0.4)",
		border: theme.palette.mode === 'light'
			? "1px solid rgba(102, 126, 234, 0.3)"
			: "1px solid rgba(102, 126, 234, 0.4)",
	},
}));

export const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
	borderRadius: "16px",
	"&:hover": {
		background: theme.palette.mode === 'light'
			? "rgba(102, 126, 234, 0.05)"
			: "rgba(102, 126, 234, 0.1)",
	},
}));

export const StyledTypography = styled(Typography)(({ theme }) => ({
	fontWeight: 500,
	color: theme.palette.text.primary,
}));

export const PriceTypography = styled(Typography)(({ theme }) => ({
	fontWeight: 600,
	color: theme.palette.primary.main,
	fontSize: "1.1rem",
}));

export const MarketCapTypography = styled(Typography)(({ theme }) => ({
	fontWeight: 500,
	color: theme.palette.text.secondary,
	fontSize: "0.9rem",
}));