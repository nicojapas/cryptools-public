import { CoinPriceChangeProps } from "../../../utils/types";
import { StyledPriceChangeTypography } from "./CoinPriceChange.styles";

export const CoinPriceChange = ({ priceChangePercentage }: CoinPriceChangeProps) => {
	return (
		<StyledPriceChangeTypography
			component="div"
			noWrap
			priceChangePercentage={priceChangePercentage}
		>
			{priceChangePercentage === null
				? ""
				: priceChangePercentage > 0
				? "↗ "
				: priceChangePercentage < 0
				? "↘ "
				: ""}
			{priceChangePercentage === null ? "" : `${Math.abs(priceChangePercentage).toFixed(2)}%`}
		</StyledPriceChangeTypography>
	);
}; 