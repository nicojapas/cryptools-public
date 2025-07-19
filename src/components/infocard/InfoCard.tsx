import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { InfoCardProps } from "../../utils/types";

const StyledCard = styled(Card)(({ theme }) => ({
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

const StyledTypography = styled(Typography)(({ theme }) => ({
	fontWeight: 600,
	color: theme.palette.text.primary,
	textAlign: "center",
	transition: "color 0.3s ease",
}));

export const InfoCard = ({ title, value, sx, ...cardProps }: InfoCardProps) => {
	return (
		<StyledCard sx={sx} {...cardProps}>
			<CardContent sx={{ p: 3, textAlign: "center" }}>
				<StyledTypography variant="h6" gutterBottom>
					{title}
				</StyledTypography>
				<Typography 
					variant="h4" 
					sx={{ 
						fontWeight: 700,
						color: (theme) => theme.palette.primary.main,
						background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
						WebkitBackgroundClip: "text",
						WebkitTextFillColor: "transparent",
						backgroundClip: "text",
					}}
				>
					{value}
				</Typography>
			</CardContent>
		</StyledCard>
	);
};

export default InfoCard;
