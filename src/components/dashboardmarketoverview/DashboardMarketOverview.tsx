import React from "react";
import { useQuery } from "@tanstack/react-query";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import { API_URL } from "../../constants";
import { useNavigate } from "react-router-dom";
import { DashboardMarketOverviewData, DashboardCoinCardProps } from "../../utils/types";

export const DashboardMarketOverview = () => {
	// const { isLoading, error, data } = useQuery({
	// 	queryKey: ["cryptoolsHomeTokensData"],
	// 	queryFn: () =>
	// 		fetch(new URL("home_tokens", API_URL).toString()).then((res) =>
	// 			res.json()
	// 		),
	// });

	// if (error) return "An error has occurred: " + error.message;

	// if (isLoading) return <Skeleton variant="rounded" height={60} />;
	const data: DashboardMarketOverviewData[] = [];
	return (
		<>
			{Array.from(data).map((token, index) => (
				<CoinCard data={token} key={index} />
			))}
		</>
	);
};

const CoinCard: React.FC<DashboardCoinCardProps> = ({ data }) => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate("/charts", {
			state: { symbol: data.symbol },
		});
	};

	return (
		<Stack direction="row">
			<CardActionArea
				sx={{ display: "flex" }}
				onClick={() => handleClick()}
			>
				<Box sx={{ alignSelf: "self-end", p: 1 }}>
					<img
						src={data.image}
						alt={data.name}
						width="40"
						height="40"
					/>
				</Box>
				<Stack sx={{ p: 1 }}>
					<Typography
						variant="subtitle1"
						align="left"
						sx={{ textTransform: "uppercase" }}
					>
						{data.symbol}
					</Typography>
					<Typography variant="subtitle2" align="left" noWrap>
						{data.name}
					</Typography>
				</Stack>
				<Stack sx={{ width: "100%", p: 1 }}>
					<Typography
						variant="subtitle1"
						sx={{ alignSelf: "flex-end", mr: 1 }}
					>
						$ {data.currentPrice}
					</Typography>
					<Stack direction="row" sx={{ alignSelf: "flex-end" }}>
						<Typography
							variant="subtitle2"
							sx={{
								color:
									data.priceChange24H > 0
										? "green"
										: data.priceChange24H < 0
										? "red"
										: "text.primary",
								ml: 1,
								mr: 1,
							}}
						>
							{data.priceChange24H > 0
								? "\u2303"
								: data.priceChange24H < 0
								? "\u2304"
								: ""}
							{data.priceChange24H}
						</Typography>
						<Typography
							variant="subtitle2"
							sx={{
								color:
									data.priceChangePercentage24H > 0
										? "green"
										: data.priceChangePercentage24H < 0
										? "red"
										: "text.primary",
								ml: 1,
								mr: 1,
							}}
						>
							{data.priceChangePercentage24H > 0
								? "\u2303"
								: data.priceChangePercentage24H < 0
								? "\u2304"
								: ""}
							{data.priceChangePercentage24H}%
						</Typography>
					</Stack>
				</Stack>
			</CardActionArea>
		</Stack>
	);
};

export default DashboardMarketOverview;
