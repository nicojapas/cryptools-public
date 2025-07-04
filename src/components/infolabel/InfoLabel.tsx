import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { InfoLabelProps } from "../../utils/types";

export const InfoLabel = (props: InfoLabelProps) => {
	const { name, value, fullWidth } = props;

	return (
		<>
			{value && (
				<Paper sx={{ width: fullWidth ? "100%" : null }}>
					<Stack
						direction="row"
						sx={{
							alignItems: "center",
							backgroundColor: "background.default",
							borderRadius: 1,
						}}
					>
						<Typography
							variant="button"
							sx={{
								backgroundColor: "primary.light",
								p: 1,
								borderRadius: "4px 0px 0px 4px",
							}}
						>
							{name}
						</Typography>
						<Typography
							sx={{
								p: 1,
								borderRadius: "0px 4px 4px 0px",
							}}
						>
							{value}
						</Typography>
					</Stack>
				</Paper>
			)}
		</>
	);
};

export default InfoLabel;
