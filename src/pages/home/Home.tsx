import BrushOutlinedIcon from "@mui/icons-material/BrushOutlined";
import Container from "@mui/material/Container";
import CurrencyBitcoinOutlinedIcon from "@mui/icons-material/CurrencyBitcoinOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import GpsFixedOutlinedIcon from "@mui/icons-material/GpsFixedOutlined";
import Grid from "@mui/material/Grid";
import HearingOutlinedIcon from "@mui/icons-material/HearingOutlined";
import LocalFireDepartmentOutlinedIcon from "@mui/icons-material/LocalFireDepartmentOutlined";
import LunchDiningOutlinedIcon from "@mui/icons-material/LunchDiningOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	Banner,
	StyledPaper,
	StyledBoxForPages,
	DashboardCryptoPanic,
	DashboardMarketOverview,
} from "../../components";
import { APP_BAR_HEIGHT } from "../../constants.js";
import { PagesIconButton } from "./elements";
import { HomeProps, HomeAction, BadgesMap } from "../../utils/types";
import { useNewsDataContext } from "../../contexts/NewsDataContext";

const Home = (props: HomeProps) => {
	const { setSettingsButton } = props;
	const navigate = useNavigate();
	const { newsData } = useNewsDataContext();

	const actions: HomeAction[] = [
		{ icon: CurrencyBitcoinOutlinedIcon, page: "biggest-coins" },
		{ icon: ShowChartOutlinedIcon, page: "charts" },
		{ icon: FeedOutlinedIcon, page: "news" },
		{ icon: LocalFireDepartmentOutlinedIcon, page: "trending" },
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
	};

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
							<DashboardCryptoPanic newsData={newsData} />
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

export default Home;
