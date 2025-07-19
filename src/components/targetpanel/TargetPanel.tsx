import { StyledPaper, InfoCard } from "..";
import CircularProgress from "@mui/material/CircularProgress";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import {
	POOCOIN_ICON,
	POOCOIN_URL,
	BSCSCAN_ICON,
	BSCSCAN_TOKEN_URL,
} from "../../constants.js";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import { useEffect } from "react";
import { TargetPanelProps, ButtonToExternalSiteProps } from "../../utils/types";

export const TargetPanel = (props: TargetPanelProps) => {
	const {
		currentAccount,
		targetAddressInput,
		targetAddress,
		targetData,
		setTargetAddress,
		handlePasteButtonClick,
		handleChange,
	} = props;
	useEffect(() => {
		if (targetAddressInput != null) setTargetAddress(targetAddressInput);
	}, []);
	return (
		<StyledPaper id="target-section">
			<Typography sx={{ pb: 2 }}>Target</Typography>
			<Stack
				spacing={2}
				sx={{ alignItems: "stretch", justifyContent: "space-between" }}
			>
				<Stack
					direction="row"
					sx={{ alignItems: "center", borderRadius: 1 }}
				>
					<TextField
						id="sniper-target-address"
						size="small"
						label={
							currentAccount
								? "Token Contract Address"
								: "Connect to MetaMask."
						}
						variant="outlined"
						fullWidth
						value={targetAddressInput}
						disabled={currentAccount ? false : true}
						onChange={handleChange}
						sx={{
							backgroundColor: "background.default",
							input: {
								color: targetAddress
									? "text.main"
									: "error.main",
							},
						}}
					/>
					<IconButton
						color="primary"
						sx={{ borderRadius: 1 }}
						onClick={handlePasteButtonClick}
						disabled={currentAccount ? false : true}
					>
						<ContentPasteIcon />
					</IconButton>
				</Stack>
				{targetAddress ? (
					<Stack
						direction="row"
						spacing={2}
						sx={{
							alignItems: "center",
							justifyContent: "center",
							borderRadius: 1,
						}}
					>
						{targetData ? (
							<>
								{targetAddress && Object.keys(targetData).length !== 0 ? (
									<CircularProgress />
								) : null}
								{Object.entries(targetData).map(
									([key, value], index) => (
										<InfoCard
											tokenStatus={true}
											key={index}
											title={key}
											value={String(value)}
										/>
									)
								)}
								<Grid item sm={12} sx={{ p: "0 !important" }} />
								<PoocoinItem {...{ targetAddress }} />
								<BscScanItem {...{ targetAddress }} />
							</>
						) : null}
					</Stack>
				) : null}
			</Stack>
		</StyledPaper>
	);
};

const ButtonToExternalSite = (props: ButtonToExternalSiteProps) => {
	const { targetAddress, baseUrl, icon } = props;
	const url = new URL(targetAddress, baseUrl).href;
	return (
		<Grid item>
			<Card>
				<CardActionArea
					sx={{
						backgroundColor: "background.default",
						flexGrow: 1,
						p: 1,
					}}
					onClick={() => window.open(url)}
				>
					<img
						src={icon}
						style={{
							width: 24,
							height: 24,
						}}
					/>
				</CardActionArea>
			</Card>
		</Grid>
	);
};

const PoocoinItem = (props: { targetAddress: string }) => {
	const { targetAddress } = props;
	return (
		<ButtonToExternalSite
			{...{ targetAddress }}
			baseUrl={POOCOIN_URL}
			icon={POOCOIN_ICON}
		/>
	);
};
const BscScanItem = (props: { targetAddress: string }) => {
	const { targetAddress } = props;
	return (
		<ButtonToExternalSite
			{...{ targetAddress }}
			baseUrl={BSCSCAN_TOKEN_URL}
			icon={BSCSCAN_ICON}
		/>
	);
};

export default TargetPanel;
