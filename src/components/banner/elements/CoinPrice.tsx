import Typography from "@mui/material/Typography";
import { CoinPriceProps } from "../../../utils/types";

export const CoinPrice = ({ price }: CoinPriceProps) => {
	return (
		<Typography
			component="div"
			noWrap
			sx={{
				alignSelf: "center",
				fontSize: "13px",
				fontWeight: 400,
				color: (theme) => theme.palette.primary.main,
				marginRight: (theme) => theme.spacing(1),
				transition: "color 0.3s ease",
				fontFamily: "'VT323', monospace",
				letterSpacing: "0.02em",
				"&:hover": {
					color: (theme) => theme.palette.primary.dark,
				},
			}}
		>
			${typeof price === 'string' ? parseFloat(price).toLocaleString() : price.toLocaleString()}
		</Typography>
	);
}; 