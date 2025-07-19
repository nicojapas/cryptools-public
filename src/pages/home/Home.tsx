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
import { Theme } from "@mui/material/styles";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
	Banner,
	StyledPaper,
	StyledBoxForPages,
	DashboardCryptoPanic,
	DashboardMarketOverview,
} from "../../components";
import { PagesIconButton } from "./elements";
import { HomeProps, HomeAction, BadgesMap } from "../../utils/types";
import { useNewsDataContext } from "../../contexts/NewsDataContext";
import { SidePanel } from "../bscsniffer/elements";
import { homePageStyles } from "./Home.styles";

const Home = (props: HomeProps) => {
	const { setSettingsButton } = props;
	const navigate = useNavigate();
	const { newsData, isLoading: newsLoading } = useNewsDataContext();

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
			data-testid="home-page"
			sx={homePageStyles.container}
		>
			<Container data-testid="home-container" maxWidth="lg" sx={homePageStyles.innerContainer}>
				<Grid container spacing={1} sx={{ height: "100%" }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Grid container spacing={1} sx={{ height: "100%" }}>
							{/* Main Navigation Grid */}
							<Grid item xs={12} sx={{ flexShrink: 0 }}>
								<StyledPaper
									data-testid="home-navigation-section"
									sx={{
										height: "100%",
										alignContent: "space-evenly",
										borderRadius: "12px",
										background: (theme: Theme) => theme.palette.mode === 'light'
											? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)"
											: "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)",
										backdropFilter: "blur(20px)",
										border: (theme: Theme) => theme.palette.mode === 'light'
											? "1px solid rgba(0, 212, 170, 0.3)"
											: "1px solid rgba(0, 212, 170, 0.1)",
										boxShadow: (theme: Theme) => theme.palette.mode === 'light'
											? "0 8px 24px rgba(0, 0, 0, 0.1)"
											: "0 8px 24px rgba(0, 0, 0, 0.3)",
										position: "relative",
										p: 1,
										"&:hover": {
											transform: "none",
										},
										"&::before": {
											content: '""',
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											borderRadius: "12px",
											background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
											opacity: 0,
											transition: "opacity 0.3s ease",
										},
										"&:hover::before": {
											opacity: 1,
										},
									}}
								>
									<Grid container spacing={0.5}>
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

							{/* Banner Section */}
							<Grid item xs={12} sx={{ flexShrink: 0 }}>
								<StyledPaper
									data-testid="home-banner-section"
									sx={{
										height: "100%",
										alignContent: "center",
										borderRadius: "12px",
										overflow: "clip",
										background: (theme: Theme) => theme.palette.mode === 'light'
											? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)"
											: "linear-gradient(135deg, rgba(26, 31, 46, 0.9) 0%, rgba(10, 14, 26, 0.9) 100%)",
										backdropFilter: "blur(20px)",
										border: (theme: Theme) => theme.palette.mode === 'light'
											? "1px solid rgba(0, 212, 170, 0.3)"
											: "1px solid rgba(0, 212, 170, 0.1)",
										p: 1,
										boxShadow: (theme: Theme) => theme.palette.mode === 'light'
											? "0 6px 20px rgba(0, 0, 0, 0.1)"
											: "0 6px 20px rgba(0, 0, 0, 0.3)",
										position: "relative",
										"&:hover": {
											transform: "none",
										},
										"&::before": {
											content: '""',
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											borderRadius: "12px",
											background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
											opacity: 0,
											transition: "opacity 0.3s ease",
										},
										"&:hover::before": {
											opacity: 1,
										},
									}}
								>
									<Banner />
								</StyledPaper>
							</Grid>

							{/* Dashboard Section - Takes remaining space */}
							<Grid item md={6} xs={12} sx={{ flex: 1, minHeight: 0, display: "flex" }}>
								<StyledPaper
									data-testid="home-news-dashboard"
									sx={{
										width: "100%",
										borderRadius: "12px",
										background: (theme: Theme) => theme.palette.mode === 'light'
											? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)"
											: "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)",
										backdropFilter: "blur(20px)",
										border: (theme: Theme) => theme.palette.mode === 'light'
											? "1px solid rgba(0, 212, 170, 0.3)"
											: "1px solid rgba(0, 212, 170, 0.1)",
										boxShadow: (theme: Theme) => theme.palette.mode === 'light'
											? "0 6px 20px rgba(0, 0, 0, 0.1)"
											: "0 6px 20px rgba(0, 0, 0, 0.3)",
										position: "relative",
										"&:hover": {
											transform: "none",
										},
										"&::before": {
											content: '""',
											position: "absolute",
											top: 0,
											left: 0,
											right: 0,
											bottom: 0,
											borderRadius: "12px",
											background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
											opacity: 0,
											transition: "opacity 0.3s ease",
										},
										"&:hover::before": {
											opacity: 1,
										},
									}}
								>
									<DashboardCryptoPanic newsData={newsData} isLoading={newsLoading} />
								</StyledPaper>
							</Grid>
							
							{/* Market Dashboard Section */}
							<Grid item xs={12} md={6} sx={{ flex: 1, minHeight: 0, display: "flex" }}>
								<DashboardMarketOverview />
							</Grid>
						</Grid>
					</Grid>

					{/* Right side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={false} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);
};

export default Home;
