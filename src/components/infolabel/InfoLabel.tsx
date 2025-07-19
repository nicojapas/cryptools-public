import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import { InfoLabelProps } from "../../utils/types";

const StyledTypography = styled(Typography)(({ theme }) => ({
	fontWeight: 600,
	color: theme.palette.text.primary,
	textAlign: "center",
	padding: theme.spacing(1, 2),
	borderRadius: "8px",
	background: theme.palette.mode === 'light'
		? "linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)"
		: "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)",
	border: theme.palette.mode === 'light'
		? "1px solid rgba(102, 126, 234, 0.2)"
		: "1px solid rgba(102, 126, 234, 0.3)",
	transition: "all 0.3s ease",
	"&:hover": {
		background: theme.palette.mode === 'light'
			? "linear-gradient(135deg, rgba(102, 126, 234, 0.2) 0%, rgba(118, 75, 162, 0.2) 100%)"
			: "linear-gradient(135deg, rgba(102, 126, 234, 0.3) 0%, rgba(118, 75, 162, 0.3) 100%)",
		transform: "translateY(-1px)",
		boxShadow: "0 4px 12px rgba(102, 126, 234, 0.2)",
	},
}));

export const InfoLabel = ({ name, value }: InfoLabelProps) => {
	return (
		<StyledTypography variant="body2">
			{name}: {value}
		</StyledTypography>
	);
};

export default InfoLabel;
