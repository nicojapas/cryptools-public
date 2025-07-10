import Typography from "@mui/material/Typography";
import { CoinPriceChangeProps } from "../../../utils/types";

export const CoinPriceChange = ({ priceChangePercentage }: CoinPriceChangeProps) => {
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