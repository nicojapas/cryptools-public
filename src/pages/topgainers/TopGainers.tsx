import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";

import { APP_BAR_HEIGHT } from "../../constants.js";
import { GainerCard } from "./elements";
import { useTokensDataContext } from "../../contexts/TokensDataContext";

const Gainers = () => {
	const { isLoading, error, topGainersData } = useTokensDataContext();

	if (error) return <>&apos;An error has occurred: &apos; + {(error instanceof Error ? error.message : "Unknown error")}</>;

	if (isLoading) return <Skeleton variant="rounded" height={60} />;

	return (
		<div id="top-gainers">
			<Box
				sx={{
					top: APP_BAR_HEIGHT,
					bottom: 0,
					left: 0,
					right: 0,
					position: "absolute",
					overflowX: "hidden",
					overflowY: "auto",
				}}
			>
				<Grid
					id="top-gainers-grid-container"
					container
					alignItems="stretch"
					spacing={1}
					sx={{
						pt: 1,
						pl: 1,
						pr: 1,
						height: "100%",
					}}
				>
					{Array.isArray(topGainersData) && topGainersData.map((item: any, index: number) => (
						<Grid
							item
							xs={12}
							md={12 / 10}
							key={index + 1}
							sx={{
								width: "100%",
								height: "50%",
							}}
						>
							<GainerCard
								{...item}
								index={index}
							/>
						</Grid>
					))}
				</Grid>
			</Box>
		</div>
	);
};

export default Gainers;
