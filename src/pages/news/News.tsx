import { useQuery } from "@tanstack/react-query";
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

import { APP_BAR_HEIGHT, API_URL } from "../../constants.js";
import { StyledBoxForPages, StyledPaper } from "../../components";
import { VoteMap, VotesComponentProps, NewsData } from "../../utils/types";

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
			<Icon fontSize="inherit" sx={{ mr: 0.5 }} />
			{n}
		</Typography>
	);
};

const News = () => {
	// const { isLoading, error, data } = useQuery<NewsData[]>({
	// 	queryKey: ["cryptoolsNewsData"],
	// 	queryFn: () =>
	// 		fetch(new URL("news", API_URL).toString())
	// 			.then((res) => res.json())
	// 			.then((data) => data.results),
	// });
    const data: NewsData[] = [];
	// if (error) return <>&apos;An error has occurred: &apos; + error.message</>;

	// if (isLoading) return <Skeleton variant="rounded" height={60} />;

	return (
		<StyledBoxForPages
			id="news"
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden" }}
		>
			<Container maxWidth="md" sx={{ p: 2 }}>
				<Grid container alignItems="stretch">
					<StyledPaper>
						{Array.from(data).map((el: NewsData, index: number) => (
							<Grid
								item
								xs={12}
								sx={{ display: "grid" }}
								key={index}
							>
								<CardActionArea
									key={index}
									onClick={() => window.open(el.url)}
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
			</Container>
		</StyledBoxForPages>
	);
};

export default News;
