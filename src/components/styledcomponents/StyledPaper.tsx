import Paper from "@mui/material/Paper";
import { styled } from "@mui/system";

export const StyledPaper = styled(Paper)(({ theme }) => ({
	backgroundColor: "background.paper",
	padding: theme.spacing(3),
	borderRadius: "16px",
	backgroundImage: "none",
	backdropFilter: "blur(10px)",
	border: `1px solid ${theme.palette.mode === 'light' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'}`,
	boxShadow: theme.palette.mode === 'light'
		? "0 8px 32px rgba(0, 0, 0, 0.1)"
		: "0 8px 32px rgba(0, 0, 0, 0.3)",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	"&:hover": {
		transform: "translateY(-2px)",
		boxShadow: theme.palette.mode === 'light'
			? "0 12px 40px rgba(0, 0, 0, 0.15)"
			: "0 12px 40px rgba(0, 0, 0, 0.4)",
	},
}));

export default StyledPaper;
