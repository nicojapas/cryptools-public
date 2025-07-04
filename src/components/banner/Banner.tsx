import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import { API_URL } from "../../constants";
import { Coin } from "../../utils/types";

import "./banner.css";

interface BannerProps {
	className?: string;
}

interface CoinImgProps {
	image: string;
	name: string;
}

interface CoinNameProps {
	name: string;
}

interface CoinPriceProps {
	price: string | number;
}

interface CoinPriceChangeProps {
	priceChangePercentage: number | null;
}

const Banner = ({ className }: BannerProps) => {
	const navigate = useNavigate();

	function handleClick(symbol: string) {
		navigate("/charts", {
			state: { symbol: symbol },
		});
	}

	const CoinImg = ({ image, name }: CoinImgProps) => {
		return (
			<CardMedia
				component="img"
				sx={{
					objectFit: "contain",
					width: "20px",
					display: "unset",
					m: 1,
				}}
				image={image}
				alt={name}
			/>
		);
	};

	const CoinName = ({ name }: CoinNameProps) => {
		return (
			<Typography
				component="div"
				variant="subtitle1"
				noWrap
				sx={{ alignSelf: "center", fontSize: 16, mr: 1 }}
			>
				{name}
			</Typography>
		);
	};

	const CoinPrice = ({ price }: CoinPriceProps) => {
		return (
			<Typography
				component="div"
				noWrap
				sx={{
					alignSelf: "center",
					fontSize: 12,
					fontWeight: 200,
					mr: 2,
				}}
			>
				{price}
			</Typography>
		);
	};

	const CoinPriceChange = ({ priceChangePercentage }: CoinPriceChangeProps) => {
		return (
			<Typography
				component="div"
				noWrap
				sx={{
					alignSelf: "center",
					fontSize: 12,
					fontWeight: 200,
					color: priceChangePercentage !== null && priceChangePercentage >= 0 ? "green" : "red",
				}}
			>
				{priceChangePercentage === null
					? ""
					: priceChangePercentage > 0
					? "\u2303"
					: priceChangePercentage < 0
					? "\u2304"
					: ""}
				{priceChangePercentage === null ? "" : priceChangePercentage + "%"}
			</Typography>
		);
	};

	const { error, data } = useQuery<Coin[], Error>({
		queryKey: ["data"],
		queryFn: async () => {
			const response = await fetch(`${API_URL}/banner`);
			if (!response.ok) {
				throw new Error(`Error: ${response.status}`);
			}
			const json = await response.json();
			return json.data as Coin[];
		},
	});

	if (error) return "An error has occurred: " + (error instanceof Error ? error.message : "Unknown error");

	return (
		<Stack className={className} spacing={1} direction="row">
			{[0, 1].map(() =>
				Array.isArray(data)
					? data.map((coin: Coin, index: number) => (
							<Card
								key={index}
								sx={{
									flex: "0 0 auto",
									width: "300px",
									overflow: "unset",
									backgroundColor: "background.default",
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
					: undefined
			)}
		</Stack>
	);
};

export default Banner;
