
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
import { useNavigate } from "react-router-dom";

import { NewsData } from "../../utils/types";

interface DashboardCryptoPanicProps {
	newsData?: NewsData[];
}

export const DashboardCryptoPanic = ({ newsData }: DashboardCryptoPanicProps) => {
	const navigate = useNavigate();
	
	const handleClick = () => {
		navigate("/news");
	};

	// If no news data, return empty
	if (!newsData || newsData.length === 0) {
		return null;
	}

	// Get only the latest news item (first in the array)
	const latestNews = newsData[0];

	return (
		<CardActionArea
			onClick={handleClick}
		>
			<Stack>
				<Stack direction="row" sx={{ p: 1 }}>
					<Typography variant="body1">{latestNews.title}</Typography>
				</Stack>
				<Stack direction="row" sx={{ ml: 5 }}>
					{!!latestNews.votes["positive"] && (
						<Typography
							variant="caption"
							sx={{ color: "success.main", ml: 0.5, mr: 0.5 }}
						>
							<ArrowUpwardIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{latestNews.votes["positive"]}
						</Typography>
					)}
					{!!latestNews.votes["negative"] && (
						<Typography
							variant="caption"
							sx={{ color: "error.main", ml: 0.5, mr: 0.5 }}
						>
							<ArrowDownwardIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{latestNews.votes["negative"]}
						</Typography>
					)}
					{!!latestNews.votes["important"] && (
						<Typography
							variant="caption"
							sx={{ color: "warning.main", ml: 0.5, mr: 0.5 }}
						>
							<WarningIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{latestNews.votes["important"]}
						</Typography>
					)}
					{!!latestNews.votes["comments"] && (
						<Typography
							variant="caption"
							sx={{ color: "info.main", ml: 0.5, mr: 0.5 }}
						>
							<CommentIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{latestNews.votes["comments"]}
						</Typography>
					)}
					{!!latestNews.votes["liked"] && (
						<Typography
							variant="caption"
							sx={{ color: "secondary.main", ml: 0.5, mr: 0.5 }}
						>
							<ThumbUpIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{latestNews.votes["liked"]}
						</Typography>
					)}
					{!!latestNews.votes["disliked"] && (
						<Typography
							variant="caption"
							sx={{ color: "secondary.main", ml: 0.5, mr: 0.5 }}
						>
							<ThumbDownIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{latestNews.votes["disliked"]}
						</Typography>
					)}
					{!!latestNews.votes["saved"] && (
						<Typography
							variant="caption"
							sx={{ color: "warning.light", ml: 0.5, mr: 0.5 }}
						>
							<StarIcon fontSize="inherit" sx={{ mr: 0.5 }} />
							{latestNews.votes["saved"]}
						</Typography>
					)}
					{!!latestNews.votes["lol"] && (
						<Typography
							variant="caption"
							sx={{ color: "primary.light", ml: 0.5, mr: 0.5 }}
						>
							<SentimentVerySatisfiedIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{latestNews.votes["lol"]}
						</Typography>
					)}
					{!!latestNews.votes["toxic"] && (
						<Typography
							variant="caption"
							sx={{ color: "primary.dark", ml: 0.5, mr: 0.5 }}
						>
							<CoronavirusIcon
								fontSize="inherit"
								sx={{ mr: 0.5 }}
							/>
							{latestNews.votes["toxic"]}
						</Typography>
					)}
				</Stack>
			</Stack>
		</CardActionArea>
	);
};

export default DashboardCryptoPanic;
