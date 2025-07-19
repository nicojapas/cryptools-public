import React from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import HandymanIcon from "@mui/icons-material/Handyman";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";

import { APP_BAR_HEIGHT } from "../../constants.js";
import ContactAndAddresses from "../contactandcryptoaddresses/ContactAndCryptoAddresses";
import { CryptoolsAppBarProps } from "../../utils/types";
import { StyledAppBar, StyledButton, GradientText } from "./CryptoolsAppBar.styles";


const ResponsiveAppBar: React.FC<CryptoolsAppBarProps> = ({ themeModeButton, settingsButton }) => {
	const navigate = useNavigate();

	const CryptoolsTitle = () => {
		return (
			<GradientText variant="h6" noWrap>
				CRYPTOOLS
			</GradientText>
		);
	};

	return (
		<StyledAppBar data-testid="app-bar" position="fixed" sx={{ height: APP_BAR_HEIGHT, minHeight: 64 }}>
			<Container maxWidth={false} sx={{ height: "100%" }}>
				<Toolbar
					data-testid="app-bar-toolbar"
					sx={{ 
						justifyContent: "space-between", 
						height: "100%",
						position: "relative",
						zIndex: 1,
					}}
				>
					<Box
						data-testid="app-bar-logo-section"
						sx={{
							display: "flex",
							alignItems: "center",
							height: "100%",
						}}
					>
						<StyledButton
							data-testid="app-bar-home-button"
							color="inherit"
							size="large"
							onClick={() => navigate("/")}
							aria-label="Navigate to home page"
							startIcon={<HandymanIcon sx={{ fontSize: 28, color: "#00B894" }} />}
						>
							<CryptoolsTitle />
						</StyledButton>
					</Box>
					<Stack data-testid="app-bar-actions" direction="row" spacing={1} alignItems="center" sx={{ height: "100%" }}>
						<ContactAndAddresses />
						{settingsButton}
						{themeModeButton}
					</Stack>
				</Toolbar>
			</Container>
		</StyledAppBar>
	);
};

export default ResponsiveAppBar;
