import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import React from "react";

import { HomeAction, BadgesMap, PagesIconButtonProps } from "../../../utils/types";

const PagesIconButton = (props: PagesIconButtonProps) => {
	const { action, onClick, badge } = props;

	return (
		<Grid item xs={4} sx={{ alignSelf: "center" }}>
			<Box sx={{ m: 2 }}>
				<IconButton
					disableRipple
					color="primary"
					onClick={onClick}
					sx={{
						m: 1,
						p: 1,
						backgroundColor: "background.default",
						boxShadow:
							"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
						transition: "transform 0.5s",
						borderRadius: 1,
						"&:hover": {
							transform: "scale(1.2);",
						},
					}}
				>
					{
						React.createElement(action.icon, {
							sx: { color: "primary.dark", fontSize: 40 }
						} as any)
					}
					{badge ? (
						<Badge
							badgeContent={badge.text}
							color={badge.color as "info" | "warning" | "error" | "success" | "primary" | "secondary"}
							sx={{ alignSelf: "start" }}
						/>
					) : null}
				</IconButton>
				<Typography>
					{action.page
						.split("-")
						.map((e: string) => e.charAt(0).toUpperCase() + e.slice(1))
						.join(" ")}
				</Typography>
			</Box>
		</Grid>
	);
};

export default PagesIconButton; 