import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { APP_BAR_HEIGHT, getApiUrl } from "../../constants.js";
import { StyledBoxForPages } from "../../components";
import { TrendingCoinData, TrendingCoinItem, TrendingCoinCardProps } from "../../utils/types";

// Import the fire gif as a string path
const fire = "/src/assets/fire3.gif";

const TrendingCoins = () => {
	const { isLoading, error, data } = useQuery<TrendingCoinItem[]>({
		queryKey: ["cryptoolsTrendingData"],
		queryFn: async () => {
			const API_URL = await getApiUrl();
			return fetch(new URL("trending", API_URL).toString()).then((res) =>
				res.json().then((data: TrendingCoinData) => data.coins.map((obj: { item: TrendingCoinItem }) => obj.item))
			);
		},
	});

	if (error) return <>&apos;An error has occurred: &apos; + error.message</>;

	if (isLoading) return <Skeleton variant="rounded" height={60} />;

	return (
		<StyledBoxForPages id="hot-projects" sx={{ top: APP_BAR_HEIGHT }}>
			<Grid
				id="hotprojects-grid-container"
				container
				alignItems="stretch"
				spacing={1}
				sx={{ pt: 1, pl: 1, pr: 1, height: "100%" }}
			>
				{Array.from(data || []).map((coin: TrendingCoinItem, index: number) => {
					return (
						<Grid
							item
							xs={12}
							md={12 / 7}
							key={index}
							sx={{
								width: "100%",
								height: "100%",
							}}
						>
							<CustomCard {...coin} />
						</Grid>
					);
				})}
			</Grid>
		</StyledBoxForPages>
	);
};

const CustomCard = (props: TrendingCoinCardProps) => {
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
				backgroundColor: `rgba(255,0,0,${1 - props.score / 10})`,
			}}
		>
			<CardContent
				sx={{ p: 0, height: "100%", [`&:last-child`]: { p: 0 } }}
			>
				{props.id === null ? (
					<Skeleton />
				) : (
					<CardActionArea
						sx={{ height: "100%" }}
						onClick={handleClick}
					>
						<Stack
							direction="column"
							spacing={1}
							sx={{ p: 1, height: "100%" }}
						>
							<CardMedia
								component="img"
								sx={{
									objectFit: "contain",
									width: `calc(100% - ${props.score * 10}%)`,
									display: "unset",
									alignSelf: "center",
									position: "absolute",
									bottom: 0,
								}}
								image={fire}
								alt={String(props.score + 1)}
							/>
							<Typography variant="h2" sx={{ p: 2, zIndex: 1 }}>
								{props.score + 1}
							</Typography>
							<CardMedia
								component="img"
								sx={{
									objectFit: "contain",
									width: "100px",
									display: "unset",
									alignSelf: "center",
									zIndex: 1,
								}}
								image={props.large}
								alt={props.name}
							/>
							<Typography
								variant="h4"
								component="div"
								color="primary"
								sx={{ p: 2, zIndex: 1 }}
							>
								{props.name}
							</Typography>
							<Typography
								variant="h5"
								color="primary"
								sx={{ p: 2, zIndex: 1 }}
							>
								[{props.symbol}]
							</Typography>
						</Stack>
					</CardActionArea>
				)}
			</CardContent>
		</Card>
	);
};

export default TrendingCoins;
