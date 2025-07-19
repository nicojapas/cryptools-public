import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";

interface ActionButtonProps {
	title: string;
	onClick: () => void;
	startIcon: React.ReactNode;
	children: React.ReactNode;
}

const ActionButton = ({ title, onClick, startIcon, children }: ActionButtonProps) => (
	<Tooltip title={title} arrow placement="bottom">
		<Button
			startIcon={startIcon}
			variant="outlined"
			onClick={onClick}
			color="secondary"
			sx={{ pt: 0, pb: 0, minWidth: 0, px: 1, fontSize: '0.85rem' }}
		>
			{children}
		</Button>
	</Tooltip>
);

export default ActionButton; 