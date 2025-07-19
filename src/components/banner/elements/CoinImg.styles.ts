import { styled } from "@mui/material/styles";
import CardMedia, { CardMediaProps } from "@mui/material/CardMedia";

export const StyledCardMedia = styled(CardMedia)<CardMediaProps>(({ theme }) => ({
  objectFit: "contain",
  width: "24px",
  height: "24px",
  borderRadius: "6px",
  border: theme.palette.mode === 'light'
    ? "2px solid rgba(0, 212, 170, 0.3)"
    : "2px solid rgba(0, 212, 170, 0.4)",
  background: theme.palette.mode === 'light'
    ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(0, 212, 170, 0.1) 100%)"
    : "linear-gradient(135deg, rgba(26, 31, 46, 0.9) 0%, rgba(0, 212, 170, 0.2) 100%)",
  padding: "1px",
  transition: "all 0.3s ease",
  position: "relative",
  "&:hover": {
    transform: "scale(1.1)",
    border: theme.palette.mode === 'light'
      ? "2px solid rgba(0, 212, 170, 0.6)"
      : "2px solid rgba(0, 212, 170, 0.7)",
    boxShadow: "0 4px 12px rgba(0, 212, 170, 0.3)",
  },
  "&::before": {
    content: '""',
    position: "absolute",
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: "8px",
    background: "linear-gradient(45deg, #00B894, #FFC107, #00D4AA)",
    opacity: 0,
    transition: "opacity 0.3s ease",
    zIndex: -1,
  },
  "&:hover::before": {
    opacity: 0.3,
  },
}));