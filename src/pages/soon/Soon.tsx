import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";

import { APP_BAR_HEIGHT } from "../../constants.js";

const Soon = () => {
	return (
		<div id="soon">
			<Box
				sx={{
					top: APP_BAR_HEIGHT,
					bottom: 0,
					left: 0,
					right: 0,
					p: 1,
					position: "absolute",
					overflowX: "hidden",
					overflowY: "scroll",
				}}
			>
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
			</Box>
		</div>
	);
};

export default Soon;
