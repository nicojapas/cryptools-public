import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import Container from "@mui/material/Container";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import Grid from "@mui/material/Grid";
import HearingOutlinedIcon from "@mui/icons-material/HearingOutlined";
import IconButton from "@mui/material/IconButton";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import Typography from "@mui/material/Typography";
import React, { useEffect } from "react";
import {
	Banner,
	StyledPaper,
	StyledBoxForPages,
	DashboardCryptoPanic,
	DashboardMarketOverview,
} from "../../components";
import { useNavigate } from "react-router-dom";
import { APP_BAR_HEIGHT } from "../../constants.js";
import { HomeProps, HomeAction, BadgesMap, PagesIconButtonProps } from "../../utils/types";

const Home = (props: HomeProps) => {
	const { setSettingsButton } = props;
	const actions: HomeAction[] = [
		{ icon: CurrencyBitcoinOutlinedIcon, page: "biggest-coins" },
		{ icon: ShowChartOutlinedIcon, page: "charts" },
		{ icon: FeedOutlinedIcon, page: "news" },
		{ icon: BrushOutlinedIcon, page: "nfts" },
		{ icon: LocalFireDepartmentOutlinedIcon, page: "hot-projects" },
		{ icon: GppGoodOutlinedIcon, page: "rug-checker" },
		{ icon: GpsFixedOutlinedIcon, page: "sniper" },
		{ icon: RocketLaunchOutlinedIcon, page: "top-gainers" },
		{ icon: LunchDiningOutlinedIcon, page: "worst-losers" },
		{ icon: HearingOutlinedIcon, page: "bsc-sniffer" },
	];
	const badges: BadgesMap = {
		"rug-checker": { text: "NEW!", color: "info" },
		"bsc-sniffer": { text: "NEW!", color: "info" },
		sniper: { text: "SOON", color: "warning" },
		nfts: { text: "SOON", color: "warning" },
	};
	const navigate = useNavigate();
	const handleSelection = (e: React.MouseEvent<HTMLElement>, page: string) => {
		if (e.type === "click") {
			navigate("/" + page);
		}
	};

	useEffect(() => {
		if (setSettingsButton) {
			setSettingsButton();
		}
	}, [setSettingsButton]);

	return (
		<StyledBoxForPages
			id="home"
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden" }}
		>
			<Container maxWidth="md" sx={{ p: 2 }}>
				<Grid container spacing={2} alignItems="stretch">
					<Grid item xs={12}>
						<StyledPaper>
							<Grid container>
								{actions.map((action) => (
									<PagesIconButton
										action={action}
										key={action.page}
										badge={
											Object.keys(badges).includes(
												action.page
											) ? badges[action.page as keyof BadgesMap] : undefined
										}
										onClick={(e) =>
											handleSelection(e, action.page)
										}
									/>
								))}
							</Grid>
						</StyledPaper>
					</Grid>
					<Grid item xs={12}>
						<StyledPaper
							sx={{ clipPath: "inset(-1px -2px -2px -1px)" }}
						>
							<Banner />
						</StyledPaper>
					</Grid>
					<Grid item md={6} xs={12} sx={{ display: "grid" }}>
						<StyledPaper>
							<DashboardCryptoPanic />
						</StyledPaper>
					</Grid>
					<Grid item md={6} xs={12} sx={{ display: "grid" }}>
						<StyledPaper
							sx={{
								display: "flex",
								flexDirection: "column",
								justifyContent: "space-between",
							}}
						>
							<DashboardMarketOverview />
						</StyledPaper>
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);
};

const PagesIconButton = (props: PagesIconButtonProps) => {
	const { action, onClick, badge } = props;

	return (
		<Grid item xs={4} sx={{ alignSelf: "center" }}>
			<Box sx={{ m: 2 }}>
				<IconButton
					disableRipple
					color="primary"
					onClick={onClick}
					sx={{
						m: 1,
						p: 1,
						backgroundColor: "background.default",
						boxShadow:
							"0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)",
						transition: "transform 0.5s",
						borderRadius: 1,
						"&:hover": {
							transform: "scale(1.2);",
						},
					}}
				>
					{
						React.createElement(action.icon, {
							sx: { color: "primary.dark", fontSize: 40 }
						} as any)
					}
					{badge ? (
						<Badge
							badgeContent={badge.text}
							color={badge.color as "info" | "warning" | "error" | "success" | "primary" | "secondary"}
							sx={{ alignSelf: "start" }}
						/>
					) : null}
				</IconButton>
				<Typography>
					{action.page
						.split("-")
						.map((e: string) => e.charAt(0).toUpperCase() + e.slice(1))
						.join(" ")}
				</Typography>
			</Box>
		</Grid>
	);
};

export default Home;
