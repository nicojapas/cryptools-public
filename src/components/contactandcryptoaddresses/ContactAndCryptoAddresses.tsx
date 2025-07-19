import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useState } from "react";
import { 
  StyledIconButton, 
  StyledToggleButtonGroup, 
  StyledToggleButton, 
  StatusBox 
} from "./ContactAndCryptoAddresses.styles";
const ContactAndAddresses = () => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState<string | undefined>(undefined);

	const cryptoAddresses = [
		{
			symbol: "BTC",
			address: "bc1qwnqecq53g6drmstdt800yddjf9zhd44kdyrhau",
		},
		{
			symbol: "ETH",
			address: "0xB1de18a26b3A83E89aE915FE56B888A651b1A7b3",
		},
		{
			symbol: "BNB",
			address: "0xB1de18a26b3A83E89aE915FE56B888A651b1A7b3",
		},
		{ symbol: "DOGE", address: "DGxbPnGmGJtbQeqpnQTbC2whkizhu4UvUg" },
	];
	const EMAIL_ADDRESS = "nicolasjapas@gmail.com";

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelected(undefined);
	};

	const handleButtonClick = (_e: React.MouseEvent, value: string, text: string) => {
		navigator.clipboard.writeText(text);
		setSelected(value);
	};

	const CryptoAddresses = () => {
		return (
			<StyledToggleButtonGroup
				orientation="vertical"
				exclusive
				value={selected}
			>
				{cryptoAddresses.map((crypto) => (
					<StyledToggleButton
						onClick={(e, value) =>
							handleButtonClick(e, value, crypto.address)
						}
						value={crypto.symbol}
						key={crypto.symbol}
						aria-label={`Copy ${crypto.symbol} address to clipboard`}
					>
						<ContentCopyIcon sx={{ mr: 1 }} />
						<Typography noWrap>
							{crypto.symbol}: {crypto.address}
						</Typography>
					</StyledToggleButton>
				))}
				<StyledToggleButton
					onClick={(e) =>
						handleButtonClick(e, "eMail", EMAIL_ADDRESS)
					}
					value="eMail"
					aria-label="Copy email address to clipboard"
				>
					<ContentCopyIcon sx={{ mr: 1 }} />
					eMail: {EMAIL_ADDRESS}
				</StyledToggleButton>
			</StyledToggleButtonGroup>
		);
	};

	const EmailAddress = () => {
		return (
			<StatusBox>
				<Typography variant="body1" noWrap sx={{ textAlign: "center" }}>
					{selected ? `${selected} address copied to clipboard` : ""}
				</Typography>
			</StatusBox>
		);
	};

	return (
		<>
			<StyledIconButton
				onClick={handleClickOpen}
				size="large"
				aria-label="Open contact and donation information"
			>
				<VolunteerActivismIcon />
			</StyledIconButton>
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="alert-dialog-title"
				aria-describedby="alert-dialog-description"
			>
				<DialogTitle
					id="alert-dialog-title"
					sx={{ alignSelf: "center" }}
				>
					{"Thank you for your support!"}
				</DialogTitle>
				<Divider variant="middle" />
				<DialogContent>
					<CryptoAddresses />
					<Divider variant="middle" />
					<EmailAddress />
				</DialogContent>
			</Dialog>
		</>
	);
};

export default ContactAndAddresses;
