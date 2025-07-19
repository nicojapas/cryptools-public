import { useNavigate } from "react-router-dom";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import { Skeleton } from "@mui/material";

import { Coin } from "../../utils/types";
import { CoinImg, CoinName, CoinPrice, CoinPriceChange } from "./elements";
import { useTokensDataContext } from "../../contexts/TokensDataContext";
import { StyledCard, StyledCardActionArea, BannerContainer, BannerScrollContainer } from "./Banner.styles";

const Banner = () => {
	const navigate = useNavigate();

	function handleClick(symbol: string) {
		navigate("/charts", {
			state: { symbol: symbol },
		});
	}

	function handleKeyPress(event: React.KeyboardEvent, symbol: string) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			handleClick(symbol);
		}
	}

	const { isLoading, error, bannerData } = useTokensDataContext();
	if (error) return <div>An error has occurred: {error.message}</div>;
	if (isLoading || !bannerData) return <Skeleton variant="rounded" height={56} sx={{ borderRadius: "16px" }} />;

	const cardWidth = 240;
	const cardMargin = 8;
	const coinsCount = Array.isArray(bannerData) ? bannerData.length : 0;
	const setWidth = coinsCount * (cardWidth + cardMargin);

	return (
		<BannerContainer data-testid="banner" style={{ width: `${setWidth}px` }}>
			<BannerScrollContainer
				data-testid="banner-scroll"
				coinsCount={coinsCount}
				setWidth={setWidth}
			>
				{[0, 1].map((dup) =>
					Array.isArray(bannerData)
						? bannerData.map((coin: Coin, index: number) => (
							<StyledCard
								key={dup + '-' + index}
								data-testid={`banner-coin-${coin.symbol}`}
								sx={{
									flex: "0 0 auto",
									width: `${cardWidth}px`,
									overflow: "unset",
									mr: `${cardMargin}px`,
								}}
							>
								<CardContent sx={{ [`&:last-child`]: { p: 0 } }}>
									<StyledCardActionArea
										sx={{ height: "100%" }}
										onClick={() => handleClick(coin.symbol)}
										onKeyDown={(e) => handleKeyPress(e, String(coin.symbol))}
										aria-label={`View chart for ${coin.name}. Current price: $${Number(coin.price).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
										tabIndex={0}
									>
										<Stack
											direction="row"
											sx={{
												height: "100%",
												justifyContent: "center",
												alignItems: "center",
												p: 1.5,
												position: "relative",
												zIndex: 1,
											}}
										>
											<CoinImg image={coin.image} name={coin.name} />
											<CoinName name={coin.name} />
											<CoinPrice price={coin.price} />
											<CoinPriceChange priceChangePercentage={coin.priceChangePercentage24H || null} />
										</Stack>
									</StyledCardActionArea>
								</CardContent>
							</StyledCard>
						))
					: null
				)}
			</BannerScrollContainer>
		</BannerContainer>
	);
};

export default Banner;
