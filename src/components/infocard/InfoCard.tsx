import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { InfoCardProps } from "../../utils/types";

export const InfoCard = (props: InfoCardProps) => {
	const { title, value, tokenStatus, md, xs } = props;

	if (typeof value !== "string") return;
	else
		return (
			<Grid item md={md} xs={xs}>
				{!!title && !!value && (
					<Card
						sx={{
							backgroundColor: "background.default",
							flexGrow: 1,
						}}
					>
						<Typography
							variant="button"
							component="div"
							sx={{
								backgroundColor: !tokenStatus
									? "error.main"
									: "primary.light",
								p: 1,
							}}
						>
							{title}
						</Typography>
						<Typography
							variant="body2"
							color="text.secondary"
							sx={{
								color: tokenStatus ? "text.main" : "error.main",
								p: 1,
							}}
						>
							{value}
						</Typography>
					</Card>
				)}
			</Grid>
		);
};

export default InfoCard;
