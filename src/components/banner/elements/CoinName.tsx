import Typography from "@mui/material/Typography";
import { CoinNameProps } from "../../../utils/types";

export const CoinName = ({ name }: CoinNameProps) => {
	return (
		<Typography
			component="div"
			variant="subtitle2"
			noWrap
			sx={{
				fontWeight: 400,
				fontSize: "14px",
				color: (theme) => theme.palette.text.primary,
				textAlign: "center",
				marginRight: (theme) => theme.spacing(0.5),
				transition: "color 0.3s ease",
				fontFamily: "'VT323', monospace",
				letterSpacing: "0.02em",
				textTransform: "uppercase",
				"&:hover": {
					color: (theme) => theme.palette.primary.main,
				},
			}}
		>
			{name}
		</Typography>
	);
}; 