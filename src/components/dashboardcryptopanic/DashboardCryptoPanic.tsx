
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CardActionArea from "@mui/material/CardActionArea";
import CommentIcon from "@mui/icons-material/Comment";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Skeleton from "@mui/material/Skeleton";
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
	isLoading?: boolean;
}

export const DashboardCryptoPanic = ({ newsData, isLoading }: DashboardCryptoPanicProps) => {
	const navigate = useNavigate();
	
	const handleClick = () => {
		navigate("/news");
	};

	// Show loading state
	if (isLoading) {
		return (
			<Stack sx={{ p: 1 }}>
				<Skeleton variant="text" width="90%" height={24} sx={{ mb: 1 }} />
				<Stack direction="row" sx={{ ml: 5 }}>
					<Skeleton variant="text" width={60} height={16} sx={{ mr: 1 }} />
					<Skeleton variant="text" width={50} height={16} sx={{ mr: 1 }} />
					<Skeleton variant="text" width={40} height={16} />
				</Stack>
			</Stack>
		);
	}

	// If no news data, return empty
	if (!newsData || newsData.length === 0) {
		return null;
	}

	// Get only the latest news item (first in the array)
	const latestNews = newsData[0];

	return (
		<CardActionArea
			data-testid="dashboard-crypto-panic"
			onClick={handleClick}
		>
			<Stack>
				<Stack direction="row" sx={{ p: 1 }}>
					<Typography 
						variant="body2" 
						sx={{ 
							fontSize: "1rem",
							fontWeight: 400,
							lineHeight: 1.3,
							fontFamily: "'VT323', monospace",
							letterSpacing: "0.02em"
						}}
					>
						{latestNews.title}
					</Typography>
				</Stack>
				<Stack direction="row" sx={{ ml: 5 }}>
					{!!latestNews.votes["positive"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "success.main", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<ArrowUpwardIcon
								fontSize="inherit"
								sx={{ mr: 0.5, fontSize: "0.7rem" }}
							/>
							{latestNews.votes["positive"]}
						</Typography>
					)}
					{!!latestNews.votes["negative"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "error.main", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<ArrowDownwardIcon
								fontSize="inherit"
								sx={{ mr: 0.5, fontSize: "0.7rem" }}
							/>
							{latestNews.votes["negative"]}
						</Typography>
					)}
					{!!latestNews.votes["important"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "warning.main", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<WarningIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: "0.7rem" }} />
							{latestNews.votes["important"]}
						</Typography>
					)}
					{!!latestNews.votes["comments"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "info.main", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<CommentIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: "0.7rem" }} />
							{latestNews.votes["comments"]}
						</Typography>
					)}
					{!!latestNews.votes["liked"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "secondary.main", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<ThumbUpIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: "0.7rem" }} />
							{latestNews.votes["liked"]}
						</Typography>
					)}
					{!!latestNews.votes["disliked"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "secondary.main", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<ThumbDownIcon
								fontSize="inherit"
								sx={{ mr: 0.5, fontSize: "0.7rem" }}
							/>
							{latestNews.votes["disliked"]}
						</Typography>
					)}
					{!!latestNews.votes["saved"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "warning.light", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<StarIcon fontSize="inherit" sx={{ mr: 0.5, fontSize: "0.7rem" }} />
							{latestNews.votes["saved"]}
						</Typography>
					)}
					{!!latestNews.votes["lol"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "primary.light", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<SentimentVerySatisfiedIcon
								fontSize="inherit"
								sx={{ mr: 0.5, fontSize: "0.7rem" }}
							/>
							{latestNews.votes["lol"]}
						</Typography>
					)}
					{!!latestNews.votes["toxic"] && (
						<Typography
							variant="caption"
							sx={{ 
								color: "primary.dark", 
								ml: 0.5, 
								mr: 0.5,
								fontSize: "0.8rem",
								fontFamily: "'VT323', monospace",
								letterSpacing: "0.02em"
							}}
						>
							<CoronavirusIcon
								fontSize="inherit"
								sx={{ mr: 0.5, fontSize: "0.7rem" }}
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
