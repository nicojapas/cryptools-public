import React from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useTheme } from "@mui/material/styles";

import { useTokensDataContext } from "../../contexts/TokensDataContext";
import { MarketSentiment } from "../../utils/types";
import {
	MarketOverviewContainer,
	SentimentDisplayBox,
	SentimentTitleTypography,
	SentimentValueTypography,
	BitcoinChangeContainer,
	BitcoinLabelTypography,
	BitcoinValueTypography,
	SentimentDescriptionTypography,
	SentimentIconBox,
	BitcoinImage
} from "./DashboardMarketOverview.styles";

export const DashboardMarketOverview = () => {
	const { marketSentiment, biggestCoinsData, isLoading, error } =
		useTokensDataContext();
	const theme = useTheme();

	if (isLoading) {
		return (
			<MarketOverviewContainer
				data-testid="dashboard-market-overview"
				marketSentiment="neutral"
			>
				<Stack spacing={1}>
					{/* Sentiment Display Skeleton */}
					<SentimentDisplayBox>
						<Skeleton variant="text" width={140} height={28} />
						<Skeleton variant="circular" width={56} height={56} sx={{ my: 1 }} />
						<Skeleton variant="text" width={80} height={40} />
					</SentimentDisplayBox>

					{/* Bitcoin Change Skeleton */}
					<BitcoinChangeContainer
						direction="row"
						alignItems="center"
						justifyContent="space-between"
					>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Skeleton variant="circular" width={24} height={24} />
							<Skeleton variant="text" width={160} height={24} />
						</Stack>
						<Stack direction="row" alignItems="center" spacing={1}>
							<Skeleton variant="circular" width={20} height={20} />
							<Skeleton variant="text" width={60} height={24} />
						</Stack>
					</BitcoinChangeContainer>

					{/* Description Skeleton */}
					<Skeleton variant="text" width="100%" height={20} />
				</Stack>
			</MarketOverviewContainer>
		);
	}
	
	if (error || !marketSentiment || !biggestCoinsData) {
			
		return (
			<Box data-testid="dashboard-market-overview" sx={{ p: 2 }}>
				<Typography variant="body2" color="error">
					Unable to load market sentiment
				</Typography>
			</Box>
		);
	}

	const marketCapChangePercentage24H = Number(
		biggestCoinsData.filter(
			(coin) => coin.name.toLowerCase() === "bitcoin",
		)[0].marketCapChangePercentage24H,
	);

	return (
		<MarketOverviewContainer
			data-testid="dashboard-market-overview"
			marketSentiment={marketSentiment}
		>
			<Stack spacing={1}>
				{/* Sentiment Display */}
				<SentimentDisplayBox>
					<SentimentTitleTypography variant="h6">
						Market Sentiment
					</SentimentTitleTypography>
					<SentimentIcon sentiment={marketSentiment} />
					<SentimentValueTypography variant="h4">
						{marketSentiment}
					</SentimentValueTypography>
				</SentimentDisplayBox>

				{/* Bitcoin 24h Change */}
				<BitcoinChangeContainer
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					<Stack direction="row" alignItems="center" spacing={1}>
						<BitcoinImage
							src="https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579"
							alt="Bitcoin"
						/>
						<BitcoinLabelTypography variant="body1">
							Bitcoin 24h MC change
						</BitcoinLabelTypography>
					</Stack>
					<Stack direction="row" alignItems="center" spacing={1}>
						{marketCapChangePercentage24H > 0 ? (
							<TrendingUpIcon
								sx={{
									color: theme.palette.success.main,
									fontSize: "1.2rem",
								}}
							/>
						) : marketCapChangePercentage24H < 0 ? (
							<TrendingDownIcon
								sx={{
									color: theme.palette.error.main,
									fontSize: "1.2rem",
								}}
							/>
						) : (
							<TrendingFlatIcon
								sx={{
									color: theme.palette.text.secondary,
									fontSize: "1.2rem",
								}}
							/>
						)}
						<BitcoinValueTypography
							variant="h6"
							marketCapChangePercentage24H={marketCapChangePercentage24H}
						>
							{marketCapChangePercentage24H > 0 ? "+" : ""}
							{marketCapChangePercentage24H.toFixed(2)}%
						</BitcoinValueTypography>
					</Stack>
				</BitcoinChangeContainer>

				{/* Sentiment Description */}
				<SentimentDescriptionTypography variant="body2">
					{marketSentiment === "bullish"
						? "Market showing strong upward momentum"
						: marketSentiment === "bearish"
							? "Market experiencing downward pressure"
							: "Market showing mixed signals"}
				</SentimentDescriptionTypography>
			</Stack>
		</MarketOverviewContainer>
	);
};

const SentimentIcon: React.FC<{ sentiment: MarketSentiment }> = ({
	sentiment,
}) => {
	const IconComponent = (() => {
		switch (sentiment) {
			case "bullish":
				return TrendingUpIcon;
			case "bearish":
				return TrendingDownIcon;
			case "neutral":
				return TrendingFlatIcon;
			default:
				return TrendingFlatIcon;
		}
	})();

	return (
		<SentimentIconBox>
			<IconComponent />
		</SentimentIconBox>
	);
};

export default DashboardMarketOverview;
