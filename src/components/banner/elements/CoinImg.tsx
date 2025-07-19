import { CoinImgProps } from "../../../utils/types";
import { StyledCardMedia } from "./CoinImg.styles";

export const CoinImg = ({ image, name }: CoinImgProps) => {
	return (
		<StyledCardMedia
			component="img"
			image={image}
			title={name}
		/>
	);
}; 