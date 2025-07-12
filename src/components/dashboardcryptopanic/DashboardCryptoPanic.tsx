
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CardActionArea from "@mui/material/CardActionArea";
import CommentIcon from "@mui/icons-material/Comment";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import Divider from "@mui/material/Divider";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";

import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";


import { DashboardCryptoPanicData } from "../../utils/types";

export const DashboardCryptoPanic = () => {
	// const { isLoading, error, data } = useQuery({
	// 	queryKey: ["cryptoolsHomeNewsData"],
	// 	queryFn: async () => {
	// 		const API_URL = await getApiUrl();
	// 		fetch(new URL("home_news", API_URL).toString()).then((res) =>
	// 			res.json()
	// 		);
	// 	},
	// });

	// if (error) return "An error has occurred: " + error.message;

	// if (isLoading) return <Skeleton variant="rounded" height={60} />;
	const data: DashboardCryptoPanicData[] = [];
	const handleClick = (url: string) => {
		window.open(url);
	};

	return Array.from(data).map((_, index) => (
		<CardActionArea
			key={index}
			onClick={() => handleClick(data[index].url)}
		>
			{index > 0 ? <Divider /> : null}
			<Stack>
				<Stack direction="row" sx={{ p: 1 }}>
					<Typography variant="body1" sx={{ pr: 2 }}>
						{data[index].timeSincePublished}
					</Typography>
					<Typography variant="body1">{data[index].title}</Typography>
				</Stack>
				<Stack direction="row" sx={{ ml: 5 }}>
					{!!data[index].votes["positive"] && (
						<Typography
							variant="caption"
							sx={{ color: "success.main", ml: 0.5, mr: 0.5 }}
						>
							<ArrowUpwardIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{data[index].votes["positive"]}
						</Typography>
					)}
					{!!data[index].votes["negative"] && (
						<Typography
							variant="caption"
							sx={{ color: "error.main", ml: 0.5, mr: 0.5 }}
						>
							<ArrowDownwardIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{data[index].votes["negative"]}
						</Typography>
					)}
					{!!data[index].votes["important"] && (
						<Typography
							variant="caption"
							sx={{ color: "warning.main", ml: 0.5, mr: 0.5 }}
						>
							<WarningIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{data[index].votes["important"]}
						</Typography>
					)}
					{!!data[index].votes["comments"] && (
						<Typography
							variant="caption"
							sx={{ color: "info.main", ml: 0.5, mr: 0.5 }}
						>
							<CommentIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{data[index].votes["comments"]}
						</Typography>
					)}
					{!!data[index].votes["liked"] && (
						<Typography
							variant="caption"
							sx={{ color: "secondary.main", ml: 0.5, mr: 0.5 }}
						>
							<ThumbUpIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{data[index].votes["liked"]}
						</Typography>
					)}
					{!!data[index].votes["disliked"] && (
						<Typography
							variant="caption"
							sx={{ color: "secondary.main", ml: 0.5, mr: 0.5 }}
						>
							<ThumbDownIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{data[index].votes["disliked"]}
						</Typography>
					)}
					{!!data[index].votes["saved"] && (
						<Typography
							variant="caption"
							sx={{ color: "warning.light", ml: 0.5, mr: 0.5 }}
						>
							<StarIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{data[index].votes["saved"]}
						</Typography>
					)}
					{!!data[index].votes["lol"] && (
						<Typography
							variant="caption"
							sx={{ color: "primary.light", ml: 0.5, mr: 0.5 }}
						>
							<SentimentVerySatisfiedIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{data[index].votes["lol"]}
						</Typography>
					)}
					{!!data[index].votes["toxic"] && (
						<Typography
							variant="caption"
							sx={{ color: "primary.dark", ml: 0.5, mr: 0.5 }}
						>
							<CoronavirusIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{data[index].votes["toxic"]}
						</Typography>
					)}
				</Stack>
			</Stack>
		</CardActionArea>
	));
};

export default DashboardCryptoPanic;
