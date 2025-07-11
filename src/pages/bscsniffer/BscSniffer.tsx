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
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden" }}
		>
			<Container maxWidth="md" sx={{ p: 2 }}>
				<TableContainer component={Paper}>
					<Table>
						<TableHead>
							<TableRow sx={{}}>
								<StyledTableCell
									align="left"
									sx={{ width: "20%" }}
								>
									Creation
								</StyledTableCell>
								<StyledTableCell
									align="left"
									sx={{ width: "40%" }}
								>
									Name
								</StyledTableCell>
								<StyledTableCell
									align="left"
									sx={{ width: "40%" }}
								>
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
			</Container>
		</StyledBoxForPages>
	);
};

const TokenTableRow = (props: TokenTableRowProps) => {
	const { token, id, hovered, setHovered } = props;
	const address = token.contract_address;
	const creator = token.creator;
	const navigate = useNavigate();

	return (
		<TableRow
			sx={{
				height: "4.25rem",
				backgroundColor:
					hovered === id ? "background.default" : "unset",
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
				<>
					<TableCell
						colSpan={3}
						align="left"
						sx={{ textAlignLast: "center" }}
					>
						<Grid
							container
							justifyContent="space-between"
							spacing={1}
						>
							<Grid
								item
								xs={6}
								md={"auto"}
								sx={{ width: "100%" }}
							>
								<Tooltip
									title="Rug Check!"
									arrow
									placement="bottom"
								>
									<Button
										startIcon={
											<GppGoodOutlinedIcon
												sx={{
													height: "16px",
													width: "16px",
												}}
											/>
										}
										variant="outlined"
										onClick={() =>
											navigate("/rug-checker", {
												state: {
													redirectedTargetAddress:
														address,
												},
											})
										}
										color="secondary"
										sx={{ pt: 0, pb: 0, width: "100%" }}
									>
										Rug Check!
									</Button>
								</Tooltip>
							</Grid>
							<Grid
								item
								xs={6}
								md={"auto"}
								sx={{ width: "100%" }}
							>
								<Tooltip
									title={`Copy ${address}`}
									arrow
									placement="bottom"
								>
									<Button
										startIcon={
											<ContentCopyIcon
												sx={{
													height: "16px",
													width: "16px",
												}}
											/>
										}
										variant="outlined"
										onClick={() =>
											navigator.clipboard.writeText(
												address
											)
										}
										sx={{ pt: 0, pb: 0, width: "100%" }}
										color="secondary"
									>
										Contract Address
									</Button>
								</Tooltip>
							</Grid>
							<Grid
								item
								xs={6}
								md={"auto"}
								sx={{ width: "100%" }}
							>
								<Tooltip
									title="Check token address in Bscscan"
									arrow
									placement="bottom"
								>
									<Button
										startIcon={
											<img
												src={BSCSCAN_ICON}
												alt="Bscscan icon."
												style={{
													height: "16px",
													width: "16px",
												}}
											/>
										}
										variant="outlined"
										onClick={() =>
											window.open(
												new URL(
													address,
													BSCSCAN_TOKEN_URL
												).href
											)
										}
										sx={{ pt: 0, pb: 0, width: "100%" }}
										color="secondary"
									>
										To Bscscan
									</Button>
								</Tooltip>
							</Grid>
							<Grid
								item
								xs={6}
								md={"auto"}
								sx={{ width: "100%" }}
							>
								<Tooltip
									title="Check token in Poocoin"
									arrow
									placement="bottom"
								>
									<Button
										startIcon={
											<img
												src={POOCOIN_ICON}
												alt="Poocoin icon."
												style={{
													height: "16px",
													width: "16px",
												}}
											/>
										}
										variant="outlined"
										onClick={() =>
											window.open(
												new URL(address, POOCOIN_URL)
													.href
											)
										}
										sx={{ pt: 0, pb: 0, width: "100%" }}
										color="secondary"
									>
										To Poocoin
									</Button>
								</Tooltip>
							</Grid>
							<Grid
								item
								xs={6}
								md={"auto"}
								sx={{ width: "100%" }}
							>
								<Tooltip
									title={`Copy ${creator}`}
									arrow
									placement="bottom"
								>
									<Button
										startIcon={
											<ContentCopyIcon
												sx={{
													height: "16px",
													width: "16px",
												}}
											/>
										}
										variant="outlined"
										onClick={() =>
											navigator.clipboard.writeText(
												creator
											)
										}
										sx={{ pt: 0, pb: 0, width: "100%" }}
										color="secondary"
									>
										Creator Address
									</Button>
								</Tooltip>
							</Grid>
							<Grid
								item
								xs={6}
								md={"auto"}
								sx={{ width: "100%" }}
							>
								<Tooltip
									title="Check creator address in Bscscan"
									arrow
									placement="bottom"
								>
									<Button
										startIcon={
											<img
												src={BSCSCAN_ICON}
												alt="Bscscan icon."
												style={{
													height: "16px",
													width: "16px",
												}}
											/>
										}
										variant="outlined"
										onClick={() =>
											window.open(
												new URL(
													creator,
													BSCSCAN_ADDRESS_URL
												).href
											)
										}
										sx={{ pt: 0, pb: 0, width: "100%" }}
										color="secondary"
									>
										To Bscscan
									</Button>
								</Tooltip>
							</Grid>
						</Grid>
					</TableCell>
				</>
			)}
		</TableRow>
	);
};

export default BscSniffer;
