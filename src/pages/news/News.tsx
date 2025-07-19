import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import CardActionArea from "@mui/material/CardActionArea";
import CommentIcon from "@mui/icons-material/Comment";
import Container from "@mui/material/Container";
import CoronavirusIcon from "@mui/icons-material/Coronavirus";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import SentimentVerySatisfiedIcon from "@mui/icons-material/SentimentVerySatisfied";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import StarIcon from "@mui/icons-material/Star";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Typography from "@mui/material/Typography";
import WarningIcon from "@mui/icons-material/Warning";

import { StyledBoxForPages, StyledPaper } from "../../components";
import { VoteMap, VotesComponentProps, NewsData } from "../../utils/types";
import { useNewsDataContext } from "../../contexts/NewsDataContext";
import { SidePanel } from "../bscsniffer/elements";
import { newsPageStyles } from "./News.styles";

const VOTES_MAP: VoteMap = {
	toxic: { color: "primary.dark", icon: CoronavirusIcon },
	positive: { color: "success.main", icon: ArrowUpwardIcon },
	negative: { color: "error.main", icon: ArrowDownwardIcon },
	important: { color: "warning.main", icon: WarningIcon },
	comments: { color: "info.main", icon: CommentIcon },
	liked: { color: "secondary.main", icon: ThumbUpIcon },
	disliked: { color: "secondary.main", icon: ThumbDownIcon },
	saved: { color: "warning.light", icon: StarIcon },
	lol: { color: "primary.light", icon: SentimentVerySatisfiedIcon },
};

const VotesComponent = (props: VotesComponentProps) => {
	const { color, n, icon: Icon } = props;

	return (
		<Typography variant="caption" sx={{ 
			color: color, 
			ml: 0.5, 
			mr: 0.5,
			fontSize: "0.7rem"
		}}>
			<Icon sx={{ mr: 0.5, fontSize: '0.7rem' }} />
			{n}
		</Typography>
	);
};

const News = () => {
	const { isLoading, error, newsData } = useNewsDataContext();

	if (error) {
		console.error('News component error:', error);
		return (
			<StyledBoxForPages
				id="news"
				sx={newsPageStyles.container}
			>
				<Container maxWidth="lg" sx={newsPageStyles.innerContainer}>
					<Typography variant="h6" color="error">
						An error has occurred: {error.message}
					</Typography>
					<Typography variant="body2" sx={{ mt: 1 }}>
						Please check the console for more details.
					</Typography>
				</Container>
			</StyledBoxForPages>
		);
	}

	if (isLoading) return (
		<StyledBoxForPages
			id="news"
			sx={newsPageStyles.container}
		>
			<Container maxWidth="lg" sx={newsPageStyles.innerContainer}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);

	// Handle empty data
	if (!newsData || newsData.length === 0) {
		return (
			<StyledBoxForPages
				id="news"
				sx={newsPageStyles.container}
			>
				<Container maxWidth="lg" sx={newsPageStyles.innerContainer}>
					<Typography variant="h6">
						No news articles available at the moment.
					</Typography>
				</Container>
			</StyledBoxForPages>
		);
	}

	return (
		<StyledBoxForPages
			id="news"
			data-testid="news-page"
			sx={newsPageStyles.container}
		>
			<Container data-testid="news-container" maxWidth="lg" sx={newsPageStyles.innerContainer}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main news content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<StyledPaper 
							data-testid="news-content" 
							sx={{ 
								height: '100%', 
								overflow: 'auto',
								"&:hover": {
									transform: "none", // Prevent movement on hover
								},
							}}
						>
							{(newsData as NewsData[]).map((el: NewsData, index: number) => (
								<Grid
									item
									xs={12}
									sx={{ display: "grid" }}
									key={index}
								>
									<CardActionArea
										key={index}
										onClick={() => el.url && window.open(el.url)}
										disabled={!el.url}
									>
										{index > 0 ? <Divider /> : null}
										<Stack>
											<Stack direction="row" sx={{ p: 1 }}>
												<Typography
													variant="body2"
													sx={{ 
														pr: 2,
														fontSize: "0.75rem",
														color: "text.secondary"
													}}
												>
													{el.timeSincePublished}
												</Typography>
												<Typography 
													variant="body2"
													sx={{ 
														fontSize: "0.875rem",
														fontWeight: 500,
														lineHeight: 1.4
													}}
												>
													{el.title}
												</Typography>
											</Stack>
											<Stack direction="row" sx={{ ml: 5 }}>
												{Object.entries(VOTES_MAP).map(
													([key, value]) =>
														!!el.votes[key as keyof typeof el.votes] && (
															<VotesComponent
																key={key}
																color={value.color}
																n={el.votes[key as keyof typeof el.votes] || 0}
																icon={value.icon}
															/>
														)
												)}
											</Stack>
										</Stack>
									</CardActionArea>
								</Grid>
							))}
						</StyledPaper>
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

export default News;
