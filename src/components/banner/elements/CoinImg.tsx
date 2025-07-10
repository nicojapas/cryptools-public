import CardMedia from "@mui/material/CardMedia";
import { CoinImgProps } from "../../../utils/types";

export const CoinImg = ({ image, name }: CoinImgProps) => {
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