import Typography from "@mui/material/Typography";
import { CoinPriceProps } from "../../../utils/types";

export const CoinPrice = ({ price }: CoinPriceProps) => {
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