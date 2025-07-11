import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Skeleton from "@mui/material/Skeleton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Tooltip from "@mui/material/Tooltip";

import {
	APP_BAR_HEIGHT,
	BSCSCAN_ICON,
	BSCSCAN_ADDRESS_URL,
	BSCSCAN_TOKEN_URL,
	POOCOIN_ICON,
	POOCOIN_URL,
} from "../../constants.js";
import { StyledBoxForPages } from "../../components";
import { useBscTokensData } from "../../hooks";
import { BscTokenData, TokenTableRowProps } from "../../utils/types";
import { SidePanel, ActionButton } from "./elements";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
	[`&.${tableCellClasses.head}`]: {
		backgroundColor: theme.palette.primary.light,
		color: theme.palette.common.white,
	},
	[`&.${tableCellClasses.body}`]: {
		fontSize: 14,
	},
}));

const BscSniffer = () => {
	const [hovered, setHovered] = useState<number | undefined>();
	const { isLoading, error, data } = useBscTokensData();

	if (error) return <>&apos;An error has occurred: &apos; + error.message</>;
	if (isLoading) return <Skeleton variant="rounded" height={60} />;

	// Sort tokens by timestamp (most recent first)
	const sortedData = (data || []).slice().sort((a, b) => Number(b.timestamp) - Number(a.timestamp));

	return (
		<StyledBoxForPages
			id="news"
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel */}
					<SidePanel isLeft={true} />

					{/* Main table */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<TableContainer component={Paper} sx={{ height: '100%' }}>
							<Table stickyHeader>
								<TableHead>
									<TableRow>
										<StyledTableCell align="left" sx={{ width: "20%" }}>
											Creation
										</StyledTableCell>
										<StyledTableCell align="left" sx={{ width: "40%" }}>
											Name
										</StyledTableCell>
										<StyledTableCell align="left" sx={{ width: "40%" }}>
											Symbol
										</StyledTableCell>
									</TableRow>
								</TableHead>
								<TableBody>
									{sortedData.map((token: BscTokenData, index: number) => (
										<TokenTableRow
											key={index}
											id={index}
											hovered={hovered}
											setHovered={setHovered}
											token={token}
										/>
									))}
								</TableBody>
							</Table>
						</TableContainer>
					</Grid>

					{/* Right side panel */}
					<SidePanel isLeft={false} />
				</Grid>
			</Container>
		</StyledBoxForPages>
	);
};

const TokenTableRow = (props: TokenTableRowProps) => {
	const { token, id, hovered, setHovered } = props;
	const { contract_address: address, creator } = token;
	const navigate = useNavigate();

	const handleRugCheck = () => navigate("/rug-checker", {
		state: { redirectedTargetAddress: address }
	});

	const handleCopyAddress = () => navigator.clipboard.writeText(address);
	const handleCopyCreator = () => navigator.clipboard.writeText(creator);
	const handleBscscanToken = () => window.open(new URL(address, BSCSCAN_TOKEN_URL).href);
	const handleBscscanCreator = () => window.open(new URL(creator, BSCSCAN_ADDRESS_URL).href);
	const handlePoocoin = () => window.open(new URL(address, POOCOIN_URL).href);

	return (
		<TableRow
			sx={{
				height: "4.25rem",
				backgroundColor: hovered === id ? "background.default" : "unset",
			}}
			onMouseEnter={() => setHovered(id)}
			onMouseLeave={() => setHovered(undefined)}
		>
			{hovered !== id ? (
				<>
					<TableCell align="left" component="th" scope="row">
						{token.timestamp}
					</TableCell>
					<TableCell align="left">{token.name}</TableCell>
					<TableCell align="left">{token.symbol}</TableCell>
				</>
			) : (
				<TableCell colSpan={3} align="left" sx={{ textAlignLast: "center" }}>
					<Grid container justifyContent="space-between" spacing={1}>
						<ActionButton
							title="Rug Check!"
							onClick={handleRugCheck}
							startIcon={<GppGoodOutlinedIcon sx={{ height: "16px", width: "16px" }} />}
						>
							Rug Check!
						</ActionButton>
						
						<ActionButton
							title={`Copy ${address}`}
							onClick={handleCopyAddress}
							startIcon={<ContentCopyIcon sx={{ height: "16px", width: "16px" }} />}
						>
							Contract Address
						</ActionButton>
						
						<ActionButton
							title="Check token address in Bscscan"
							onClick={handleBscscanToken}
							startIcon={<img src={BSCSCAN_ICON} alt="Bscscan icon" style={{ height: "16px", width: "16px" }} />}
						>
							To Bscscan
						</ActionButton>
						
						<ActionButton
							title="Check token in Poocoin"
							onClick={handlePoocoin}
							startIcon={<img src={POOCOIN_ICON} alt="Poocoin icon" style={{ height: "16px", width: "16px" }} />}
						>
							To Poocoin
						</ActionButton>
						
						<ActionButton
							title={`Copy ${creator}`}
							onClick={handleCopyCreator}
							startIcon={<ContentCopyIcon sx={{ height: "16px", width: "16px" }} />}
						>
							Creator Address
						</ActionButton>
						
						<ActionButton
							title="Check creator address in Bscscan"
							onClick={handleBscscanCreator}
							startIcon={<img src={BSCSCAN_ICON} alt="Bscscan icon" style={{ height: "16px", width: "16px" }} />}
						>
							To Bscscan
						</ActionButton>
					</Grid>
				</TableCell>
			)}
		</TableRow>
	);
};

export default BscSniffer;
