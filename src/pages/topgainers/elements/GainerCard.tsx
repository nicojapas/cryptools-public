import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { Coin } from "../../../utils/types";

interface GainerCardProps extends Coin {
	index: number;
}

const GainerCard = (props: GainerCardProps) => {
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
					<Stack
						direction="column"
						sx={{
							height: "100%",
							justifyContent: "space-evenly",
						}}
					>
						<Skeleton variant="text" width={60} height={48} sx={{ alignSelf: "center" }} />
						<Skeleton variant="circular" width={60} height={60} sx={{ alignSelf: "center" }} />
						<Skeleton variant="text" width="80%" height={32} sx={{ alignSelf: "center" }} />
						<Skeleton variant="text" width="60%" height={24} sx={{ alignSelf: "center" }} />
						<Skeleton variant="text" width="70%" height={24} sx={{ alignSelf: "center" }} />
					</Stack>
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
						aria-label={`View ${props.name} (${props.symbol}) chart - Rank #${props.index + 1} gainer with ${props.price_change_percentage_24h !== undefined ? props.price_change_percentage_24h.toFixed(2) + "%" : "no"} change`}
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

export default GainerCard; 