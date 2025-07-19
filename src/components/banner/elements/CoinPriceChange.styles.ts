import { styled } from "@mui/material/styles";
import Typography, { TypographyProps } from "@mui/material/Typography";

export const StyledPriceChangeTypography = styled(Typography)<
  TypographyProps & { 
    priceChangePercentage: number | null 
  }
>(({ priceChangePercentage }) => {
  const isPositive = priceChangePercentage !== null && priceChangePercentage >= 0;
  const isNegative = priceChangePercentage !== null && priceChangePercentage < 0;

  return {
    alignSelf: "center",
    fontSize: "12px",
    fontWeight: 400,
    color: isPositive ? "#00B894" : isNegative ? "#FF5252" : "text.secondary",
    padding: "2px 6px",
    borderRadius: "4px",
    fontFamily: "'VT323', monospace",
    letterSpacing: "0.02em",
    background: isPositive 
      ? "linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(0, 184, 148, 0.1) 100%)" 
      : isNegative 
      ? "linear-gradient(135deg, rgba(255, 82, 82, 0.1) 0%, rgba(244, 67, 54, 0.1) 100%)" 
      : "transparent",
    border: isPositive 
      ? "1px solid rgba(0, 212, 170, 0.3)" 
      : isNegative 
      ? "1px solid rgba(255, 82, 82, 0.3)" 
      : "none",
    transition: "all 0.3s ease",
    position: "relative",
    "&:hover": {
      background: isPositive 
        ? "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(0, 184, 148, 0.2) 100%)" 
        : isNegative 
        ? "linear-gradient(135deg, rgba(255, 82, 82, 0.2) 0%, rgba(244, 67, 54, 0.2) 100%)" 
        : "transparent",
      transform: "scale(1.05)",
      boxShadow: isPositive 
        ? "0 2px 8px rgba(0, 212, 170, 0.2)" 
        : isNegative 
        ? "0 2px 8px rgba(255, 82, 82, 0.2)" 
        : "none",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "4px",
      background: isPositive 
        ? "linear-gradient(45deg, rgba(0, 212, 170, 0.1), rgba(0, 184, 148, 0.1))" 
        : isNegative 
        ? "linear-gradient(45deg, rgba(255, 82, 82, 0.1), rgba(244, 67, 54, 0.1))" 
        : "transparent",
      opacity: 0,
      transition: "opacity 0.3s ease",
      zIndex: -1,
    },
    "&:hover::before": {
      opacity: 1,
    },
  };
});