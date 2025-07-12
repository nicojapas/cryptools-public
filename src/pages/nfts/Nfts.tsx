import { useQuery } from "@tanstack/react-query";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

import { APP_BAR_HEIGHT, getApiUrl } from "../../constants.js";
import { StyledBoxForPages } from "../../components";
import { CustomCardProps, NFTData } from "../../utils/types";

const Nfts = () => {
	const cardHeight = "250px";
	const { isLoading, error, data } = useQuery<NFTData[]>({
		queryKey: ["cryptoolsNftsData"],
		queryFn: async () => {
			const API_URL = await getApiUrl();
			return fetch(new URL("nfts", API_URL).toString())
				.then((res) => res.json())
				.catch((e) => console.log(e.message));
		},
	});

	if (error) return <>&apos;An error has occurred: &apos; + error.message</>;

	if (isLoading) return <Skeleton variant="rounded" height={60} />;

	return (
		<StyledBoxForPages id="nfts" sx={{ top: APP_BAR_HEIGHT }}>
			<Grid container spacing={1}>
				{data
					? Array.from(data).map((item: NFTData, index: number) => (
							<Grid
								item
								xs={3}
								key={index}
								sx={{ height: cardHeight }}
							>
								<CustomCard
									totalPrice={item.totalPrice}
									imgPreviewUrl={item.imgPreviewUrl}
									name={item.name}
									tokenId={item.tokenId}
									description={item.description}
									price={item.price}
									currency={item.currency}
									imgBigUrl={item.imgBigUrl}
									paymentTokenSymbol={item.paymentTokenSymbol}
									paymentTokenDecimals={
										item.paymentTokenDecimals
									}
									paymentTokenImg={item.paymentTokenImg}
									paymentTokenEthPrice={
										item.paymentTokenEthPrice
									}
									paymentTokenUsdPrice={
										item.paymentTokenUsdPrice
									}
									cardHeight={cardHeight}
								/>
							</Grid>
					  ))
					: [...Array(12)].map((_, index) => (
							<Grid
								item
								xs={3}
								key={index}
								sx={{ height: cardHeight }}
							>
								<Skeleton
									variant="rounded"
									sx={{ height: "100%" }}
								/>
							</Grid>
					  ))}
			</Grid>
		</StyledBoxForPages>
	);
};

const CustomCard = (props: CustomCardProps) => {
	const {
		totalPrice,
		imgPreviewUrl,
		name,
		description,
		price,
		currency,
		imgBigUrl,
		paymentTokenSymbol,
		paymentTokenDecimals,
		paymentTokenUsdPrice,
	} = props;

	function handleClick() {
		if (imgBigUrl) {
			window.open(imgBigUrl);
		}
	}

	return (
		<Card sx={{ height: "100%" }}>
			<CardActionArea onClick={() => handleClick()}>
				<Typography
					variant="subtitle1"
					noWrap
					component="div"
					sx={{ p: 1 }}
				>
					{name}
				</Typography>
				<CardMedia component="img" image={imgPreviewUrl} alt={name} />
				<Typography variant="subtitle1" noWrap component="div">
					{description === "''"
						? "- description missing -"
						: description
						? description
						: " "}
				</Typography>
				<Typography variant="h4" noWrap component="div">
					{name ? "SOLD" : ""}
				</Typography>
				<Typography>
					{price}
					{currency}
				</Typography>
				<Typography variant="h5" noWrap component="div">
					{paymentTokenDecimals
						? "Price: " +
						  totalPrice / 10 ** paymentTokenDecimals +
						  " " +
						  paymentTokenSymbol
						: ""}
				</Typography>
				<Typography variant="subtitle1" noWrap component="div">
					{paymentTokenDecimals
						? `(${
								(totalPrice / 10 ** paymentTokenDecimals) *
								paymentTokenUsdPrice
						  } USD)`
						: ""}
				</Typography>
			</CardActionArea>
		</Card>
	);
};

export default Nfts;
