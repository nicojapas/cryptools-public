import React from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import HandymanIcon from "@mui/icons-material/Handyman";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { APP_BAR_HEIGHT } from "../../constants.js";
import ContactAndAddresses from "../contactandcryptoaddresses/ContactAndCryptoAddresses";
import { CryptoolsAppBarProps } from "../../utils/types";

const ResponsiveAppBar: React.FC<CryptoolsAppBarProps> = ({ themeModeButton, settingsButton }) => {
	const navigate = useNavigate();

	const CryptoolsTitle = () => {
		return (
			<Typography
				variant="h6"
				noWrap
				sx={{
					mr: 2,
					display: "flex",
					fontWeight: 700,
					letterSpacing: ".3rem",
					textDecoration: "none",
				}}
			>
				CRYPTOOLS
			</Typography>
		);
	};

	return (
		<AppBar position="fixed" sx={{ height: APP_BAR_HEIGHT, minHeight: 64 }}>
			<Container maxWidth={false} sx={{ height: "100%" }}>
				<Toolbar
					sx={{ justifyContent: "space-between", height: "100%" }}
				>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							height: "100%",
						}}
					>
						<Button
							color="inherit"
							size="large"
							onClick={() => navigate("/home")}
						>
							<HandymanIcon sx={{ m: 1 }} />
							<CryptoolsTitle />
						</Button>
					</Box>
					<Stack direction="row">
						<ContactAndAddresses />
						{settingsButton}
						{themeModeButton}
					</Stack>
				</Toolbar>
			</Container>
		</AppBar>
	);
};

export default ResponsiveAppBar;
