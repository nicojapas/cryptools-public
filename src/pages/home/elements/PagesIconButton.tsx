import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import React from "react";

import { PagesIconButtonProps } from "../../../utils/types";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
	background: theme.palette.mode === 'light'
		? "linear-gradient(135deg, rgba(0, 212, 170, 0.1) 0%, rgba(255, 193, 7, 0.1) 100%)"
		: "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)",
	border: theme.palette.mode === 'light'
		? "1px solid rgba(0, 212, 170, 0.2)"
		: "1px solid rgba(0, 212, 170, 0.3)",
	borderRadius: "12px",
	padding: theme.spacing(1.5),
	width: "60px",
	height: "60px",
	transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
	position: "relative",
	"&::before": {
		content: '""',
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		borderRadius: "12px",
		background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
		opacity: 0,
		transition: "opacity 0.3s ease",
	},
	"&:hover": {
		background: theme.palette.mode === 'light'
			? "linear-gradient(135deg, rgba(0, 212, 170, 0.2) 0%, rgba(255, 193, 7, 0.2) 100%)"
			: "linear-gradient(135deg, rgba(0, 212, 170, 0.3) 0%, rgba(255, 193, 7, 0.3) 100%)",
		transform: "translateY(-2px) scale(1.03)",
		boxShadow: "0 8px 24px rgba(0, 212, 170, 0.3)",
		border: theme.palette.mode === 'light'
			? "1px solid rgba(0, 212, 170, 0.4)"
			: "1px solid rgba(0, 212, 170, 0.5)",
		"&::before": {
			opacity: 1,
		},
	},
	"& .MuiSvgIcon-root": {
		color: theme.palette.primary.main,
		fontSize: "24px",
		transition: "all 0.3s ease",
		position: "relative",
		zIndex: 1,
	},
	"&:hover .MuiSvgIcon-root": {
		color: theme.palette.primary.dark,
		transform: "scale(1.1)",
	},
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
	fontWeight: 400,
	color: theme.palette.text.primary,
	marginTop: theme.spacing(0.5),
	fontSize: "1rem",
	textAlign: "center",
	transition: "color 0.3s ease",
	position: "relative",
	zIndex: 1,
	fontFamily: "'VT323', monospace",
	letterSpacing: "0.02em",
	textTransform: "uppercase",
}));

const StyledBadge = styled(Badge)(() => ({
	"& .MuiBadge-badge": {
		fontSize: "0.8rem",
		fontWeight: 400,
		borderRadius: "6px",
		padding: "4px 8px",
		background: "linear-gradient(135deg, #00B894, #FFC107)",
		color: "#000",
		boxShadow: "0 2px 8px rgba(0, 212, 170, 0.3)",
		fontFamily: "'VT323', monospace",
		letterSpacing: "0.02em",
	},
}));

const PagesIconButton = (props: PagesIconButtonProps) => {
	const { action, onClick, badge } = props;

	return (
		<Grid item xs={4} sx={{ alignSelf: "center" }}>
			<Box sx={{ 
				m: 2, 
				display: "flex", 
				flexDirection: "column", 
				alignItems: "center",
				transition: "transform 0.3s ease",
				"&:hover": {
					transform: "scale(1.02)",
				}
			}}>
				<StyledIconButton
					disableRipple
					color="primary"
					onClick={onClick}
					aria-label={`Navigate to ${action.page.split("-").map((e: string) => e.charAt(0).toUpperCase() + e.slice(1)).join(" ")} page`}
				>
					{React.createElement(action.icon, {
						sx: { fontSize: 32 }
					} as any)}
					{badge ? (
						<StyledBadge
							badgeContent={badge.text}
							color={badge.color as "info" | "warning" | "error" | "success" | "primary" | "secondary"}
							sx={{ 
								position: "absolute",
								top: -8,
								right: -8,
							}}
						/>
					) : null}
				</StyledIconButton>
				<StyledTypography>
					{action.page
						.split("-")
						.map((e: string) => e.charAt(0).toUpperCase() + e.slice(1))
						.join(" ")}
				</StyledTypography>
			</Box>
		</Grid>
	);
};

export default PagesIconButton; 