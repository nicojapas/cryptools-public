import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { APP_BAR_HEIGHT, getApiUrl } from "../../constants.js";
import { Coin } from "../../utils/types";

interface CustomCardProps extends Coin {
	index: number;
}

const Gainers = () => {
	const { isLoading, error, data } = useQuery<Coin[], Error>({
		queryKey: ["cryptoolsGainersData"],
		queryFn: async () => {
			const API_URL = await getApiUrl();
			return fetch(new URL("gainers", API_URL).toString()).then((res) =>
				res.json()
			);
		},
	});

	if (error) return <>&apos;An error has occurred: &apos; + {(error instanceof Error ? error.message : "Unknown error")}</>;

	if (isLoading) return <Skeleton variant="rounded" height={60} />;

	return (
		<div id="hotprojects">
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
					id="hotprojects-grid-container"
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
					{Array.isArray(data) && data.map((item: Coin, index: number) => (
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
							<CustomCard
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

const CustomCard = (props: CustomCardProps) => {
	const navigate = useNavigate();

	function handleClick() {
		navigate("/charts", {
			state: { symbol: props.symbol },
		});
	}

	return (
		<Card
			variant="outlined"
			square={true}
			sx={{
				width: "100%",
				height: "100%",
			}}
		>
			<CardContent
				sx={{
					p: 0,
					height: "100%",
					[`&:last-child`]: { p: 0 },
				}}
			>
				{props.id === null ? (
					<Skeleton />
				) : (
					<CardActionArea
						sx={{
							height: "100%",
							backgroundColor: "rgba(0,255,0,0.3)",
							[`:hover`]: {
								transform: "scale(1.2)",
								backgroundColor: "rgba(0,255,0,0.6)",
							},
							transition: "transform 0.5s, background-color 0.2s",
						}}
						onClick={handleClick}
					>
						<Stack
							direction="column"
							sx={{
								height: "100%",
								justifyContent: "space-evenly",
							}}
						>
							<Typography variant="h2" color="success.dark">
								{props.index + 1}
							</Typography>
							<CardMedia
								component="img"
								sx={{
									objectFit: "contain",
									width: "60px",
									display: "unset",
									alignSelf: "center",
								}}
								image={props.image}
								alt={props.name}
							/>
							<Typography
								variant="h4"
								component="div"
								color="success.main"
								sx={{
									zIndex: 1,
								}}
							>
								{props.name}
							</Typography>
							<Typography
								variant="h5"
								color="success.dark"
								sx={{
									zIndex: 1,
								}}
							>
								[{props.symbol}]
							</Typography>
							<Typography
								variant="h5"
								color="success.main"
								sx={{
									zIndex: 1,
								}}
							>
								{props.price_change_percentage_24h !== undefined ? props.price_change_percentage_24h.toFixed(2) + "%" : "-"}
							</Typography>
						</Stack>
					</CardActionArea>
				)}
			</CardContent>
		</Card>
	);
};

export default Gainers;
