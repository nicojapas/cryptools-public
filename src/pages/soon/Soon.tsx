import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages } from "../../components";
import { SidePanel } from "../bscsniffer/elements";

const Soon = () => {
	return (
		<StyledBoxForPages 
			id="soon" 
			data-testid="soon-page" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Paper
							variant="outlined"
							square={true}
							sx={{
								height: "100%",
								backgroundColor: "background.paper",
								transition: "background-color 0.5s",
							}}
						>
							<Box sx={{ p: 2 }}>
								<Typography variant="h3">wen? soon...</Typography>
							</Box>
						</Paper>
					</Grid>

					{/* Right side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={false} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);
};

export default Soon;
