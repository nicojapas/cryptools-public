import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { keyframes } from "@emotion/react";

const moveBanner = keyframes`
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(var(--banner-translate, -900px));
  }
`;

export const StyledCard = styled(Card)(({ theme }) => ({
	background: theme.palette.mode === 'light'
		? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)"
		: "linear-gradient(135deg, rgba(26, 31, 46, 0.9) 0%, rgba(10, 14, 26, 0.9) 100%)",
	backdropFilter: "blur(10px)",
	border: theme.palette.mode === 'light'
		? "1px solid rgba(0, 212, 170, 0.2)"
		: "1px solid rgba(0, 212, 170, 0.1)",
	borderRadius: "16px",
	boxShadow: theme.palette.mode === 'light'
		? "0 4px 20px rgba(0, 0, 0, 0.08)"
		: "0 4px 20px rgba(0, 0, 0, 0.2)",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	position: "relative",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: "16px",
		background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
		opacity: 0,
		transition: "opacity 0.3s ease",
	},
	"&:hover": {
		transform: "translateY(-4px)",
		boxShadow: theme.palette.mode === 'light'
			? "0 12px 40px rgba(0, 0, 0, 0.15)"
			: "0 12px 40px rgba(0, 0, 0, 0.4)",
		border: theme.palette.mode === 'light'
			? "1px solid rgba(0, 212, 170, 0.4)"
			: "1px solid rgba(0, 212, 170, 0.3)",
		"&::before": {
			opacity: 1,
		},
	},
}));

export const StyledCardActionArea = styled(CardActionArea)(({ theme }) => ({
	borderRadius: "16px",
	"&:hover": {
		background: theme.palette.mode === 'light'
			? "rgba(0, 212, 170, 0.05)"
			: "rgba(0, 212, 170, 0.1)",
	},
}));

export const BannerContainer = styled("div")({
	overflow: "hidden",
	padding: '2px',
	margin: '0 auto',
	position: "relative",
});

export const BannerScrollContainer = styled("div")<{ coinsCount: number; setWidth: number }>(({ coinsCount, setWidth }) => ({
	display: "flex",
	width: `${setWidth * 2}px`,
	"--banner-translate": `-${setWidth}px`,
	animationName: moveBanner,
	animationDuration: `${coinsCount * 4}s`,
	animationIterationCount: "infinite",
	animationDirection: "normal",
	animationTimingFunction: "linear",
	willChange: "transform",
}));