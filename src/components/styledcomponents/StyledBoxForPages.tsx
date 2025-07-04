import Box from "@mui/material/Box";
import { styled } from "@mui/system";

export const StyledBoxForPages = styled(Box)({
	top: 0,
	bottom: 0,
	right: 0,
	left: 0,
	position: "absolute",
	transition: "left 0.2s",
	overflowY: "auto",
});

export default StyledBoxForPages;
