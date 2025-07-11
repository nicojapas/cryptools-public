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

import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages, StyledPaper } from "../../components";
import { VoteMap, VotesComponentProps, NewsData } from "../../utils/types";
import { useNewsData } from "../../hooks";
import { SidePanel } from "../bscsniffer/elements";

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
		<Typography variant="caption" sx={{ color: color, ml: 0.5, mr: 0.5 }}>
			<Icon sx={{ mr: 0.5, fontSize: 'inherit' }} />
			{n}
		</Typography>
	);
};

const News = () => {
	const { isLoading, error, data } = useNewsData();

	if (error) {
		console.error('News component error:', error);
		return (
			<StyledBoxForPages
				id="news"
				sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
			>
				<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
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

	if (isLoading) return <Skeleton variant="rounded" height={60} />;

	// Handle empty data
	if (!data || data.length === 0) {
		return (
			<StyledBoxForPages
				id="news"
				sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
			>
				<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
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
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel */}
					<SidePanel isLeft={true} />

					{/* Main news content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<StyledPaper sx={{ height: '100%', overflow: 'auto' }}>
							{Array.from(data || []).map((el: NewsData, index: number) => (
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
													variant="body1"
													sx={{ pr: 2 }}
												>
													{el.timeSincePublished}
												</Typography>
												<Typography variant="body1">
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

					{/* Right side panel */}
					<SidePanel isLeft={false} />
				</Grid>
			</Container>
		</StyledBoxForPages>
	);
};

export default News;
