import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";

import { useBannerData } from "../../hooks";
import { Coin } from "../../utils/types";
import { CoinImg, CoinName, CoinPrice, CoinPriceChange } from "./elements";

import "./banner.css";

const Banner = () => {
	const navigate = useNavigate();

	function handleClick(symbol: string) {
		navigate("/charts", {
			state: { symbol: symbol },
		});
	}

	const { error, data } = useBannerData();

	if (error) return "An error has occurred: " + (error instanceof Error ? error.message : "Unknown error");

	const cardWidth = 300;
	const cardMargin = 8;
	const coinsCount = Array.isArray(data) ? data.length : 0;
	const setWidth = coinsCount * (cardWidth + cardMargin);

	return (
		<div style={{ overflow: "hidden", width: `${setWidth}px`, padding: '2px' }}>
			<div
				className="banner1"
				style={{
					display: "flex",
					width: `${setWidth * 2}px`,
					// Set the animation distance dynamically
					 
					...( { ["--banner-translate"]: `-${setWidth}px` } as any ),
				}}
			>
				{[0, 1].map((dup) =>
					Array.isArray(data)
						? data.map((coin: Coin, index: number) => (
							<Card
								key={dup + '-' + index}
								sx={{
									flex: "0 0 auto",
									width: `${cardWidth}px`,
									overflow: "unset",
									backgroundColor: "background.default",
									mr: `${cardMargin}px`,
								}}
							>
								<CardContent sx={{ [`&:last-child`]: { p: 0 } }}>
									<CardActionArea
										sx={{ height: "100%" }}
										onClick={() => handleClick(coin.symbol)}
									>
										<Stack
											direction="row"
											sx={{
												height: "100%",
												justifyContent: "center",
											}}
										>
											<CoinImg image={coin.image} name={coin.name} />
											<CoinName name={coin.name} />
											<CoinPrice price={coin.price} />
											<CoinPriceChange priceChangePercentage={coin.priceChangePercentage24H || null} />
										</Stack>
									</CardActionArea>
								</CardContent>
							</Card>
						))
					: null
				)}
			</div>
		</div>
	);
};

export default Banner;
