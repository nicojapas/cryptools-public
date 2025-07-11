import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Tooltip from "@mui/material/Tooltip";

interface ActionButtonProps {
	title: string;
	onClick: () => void;
	startIcon: React.ReactNode;
	children: React.ReactNode;
}

const ActionButton = ({ title, onClick, startIcon, children }: ActionButtonProps) => (
	<Grid item xs={6} md="auto" sx={{ width: "100%" }}>
		<Tooltip title={title} arrow placement="bottom">
			<Button
				startIcon={startIcon}
				variant="outlined"
				onClick={onClick}
				color="secondary"
				sx={{ pt: 0, pb: 0, width: "100%" }}
			>
				{children}
			</Button>
		</Tooltip>
	</Grid>
);

export default ActionButton; 