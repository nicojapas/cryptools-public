import Box from "@mui/material/Box";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import Typography from "@mui/material/Typography";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import { useState } from "react";
const ContactAndAddresses = () => {
	const [open, setOpen] = useState(false);
	const [selected, setSelected] = useState();

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
	const EMAIL_ADDRESS = "info@cryptools.org";

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
		setSelected(null);
	};

	const handleButtonClick = (e, value, text) => {
		navigator.clipboard.writeText(text);
		setSelected(value);
	};

	const CryptoAddresses = (props) => {
		return (
			<ToggleButtonGroup
				orientation="vertical"
				exclusive
				value={selected}
				sx={{ width: "100%" }}
			>
				{cryptoAddresses.map((crypto) => (
					<ToggleButton
						onClick={(e, value) =>
							handleButtonClick(e, value, crypto.address)
						}
						value={crypto.symbol}
						key={crypto.symbol}
						sx={{
							border: 0,
							color: "secondary.dark",
							textTransform: "unset",
							justifyContent: "flex-start",
						}}
					>
						<ContentCopyIcon sx={{ mr: 1 }} />
						<Typography noWrap>
							{crypto.symbol}: {crypto.address}
						</Typography>
					</ToggleButton>
				))}
				<ToggleButton
					onClick={(e) =>
						handleButtonClick(e, "eMail", EMAIL_ADDRESS)
					}
					value="eMail"
					sx={{
						border: 0,
						color: "secondary.dark",
						textTransform: "unset",
						justifyContent: "flex-start",
					}}
				>
					<ContentCopyIcon sx={{ mr: 1 }} />
					eMail: {EMAIL_ADDRESS}
				</ToggleButton>
			</ToggleButtonGroup>
		);
	};

	const EmailAddress = (props) => {
		return (
			<Box sx={{ minHeight: 24, mt: 2 }}>
				<Typography variant="body1" noWrap sx={{ textAlign: "center" }}>
					{selected ? `${selected} address copied to clipboard` : ""}
				</Typography>
			</Box>
		);
	};

	return (
		<>
			<IconButton
				onClick={handleClickOpen}
				size="large"
				color="inherit"
				sx={{ justifyContent: "right" }}
			>
				<VolunteerActivismIcon />
			</IconButton>
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
