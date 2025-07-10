import Typography from "@mui/material/Typography";
import { CoinNameProps } from "../../../utils/types";

export const CoinName = ({ name }: CoinNameProps) => {
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