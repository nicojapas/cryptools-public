import { styled } from "@mui/material/styles";
import IconButton, { IconButtonProps } from "@mui/material/IconButton";
import Box, { BoxProps } from "@mui/material/Box";
import ToggleButton, { ToggleButtonProps } from "@mui/material/ToggleButton";
import ToggleButtonGroup, { ToggleButtonGroupProps } from "@mui/material/ToggleButtonGroup";

export const StyledIconButton = styled(IconButton)<IconButtonProps>(({ theme }) => ({
  justifyContent: "right",
  background: theme.palette.mode === 'light'
    ? "linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)"
    : "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)",
  border: theme.palette.mode === 'light'
    ? "1px solid rgba(0, 212, 170, 0.2)"
    : "1px solid rgba(0, 212, 170, 0.3)",
  borderRadius: "12px",
  padding: "8px",
  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  "&:hover": {
    background: theme.palette.mode === 'light'
      ? "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)"
      : "linear-gradient(135deg, rgba(0, 212, 170, 0.3) 0%, rgba(255, 193, 7, 0.3) 100%)",
    transform: "translateY(-1px)",
    boxShadow: "0 4px 12px rgba(0, 212, 170, 0.3)",
    border: theme.palette.mode === 'light'
      ? "1px solid rgba(0, 212, 170, 0.4)"
      : "1px solid rgba(0, 212, 170, 0.5)",
  },
  "& .MuiSvgIcon-root": {
    color: "#00B894",
    transition: "all 0.3s ease",
  },
  "&:hover .MuiSvgIcon-root": {
    color: "#00D4AA",
    transform: "scale(1.1)",
  },
}));

export const StyledToggleButtonGroup = styled(ToggleButtonGroup)<ToggleButtonGroupProps>({
  width: "100%",
});

export const StyledToggleButton = styled(ToggleButton)<ToggleButtonProps>({
  border: 0,
  color: "secondary.dark",
  textTransform: "unset",
  justifyContent: "flex-start",
});

export const StatusBox = styled(Box)<BoxProps>({
  minHeight: 24,
  marginTop: 2,
});