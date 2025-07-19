import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";

import { APP_BAR_HEIGHT } from "../../constants.js";
import { GainerCard } from "./elements";
import { useTokensDataContext } from "../../contexts/TokensDataContext";
import { StyledBoxForPages } from "../../components";
import { SidePanel } from "../bscsniffer/elements";

const Gainers = () => {
	const { isLoading, error, topGainersData } = useTokensDataContext();

	if (error) return <>&apos;An error has occurred: &apos; + {(error instanceof Error ? error.message : "Unknown error")}</>;

	if (isLoading) return (
		<StyledBoxForPages 
			id="top-gainers" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Grid container alignItems="stretch" spacing={1} sx={{ pt: 1, pl: 1, pr: 1, height: "100%" }}>
							{[...Array(10)].map((_, index) => (
								<Grid item xs={12} md={6} key={index} sx={{ width: "100%", height: "50%" }}>
									<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
								</Grid>
							))}
						</Grid>
					</Grid>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
				</Grid>
			</Container>
		</StyledBoxForPages>
	);

	return (
		<StyledBoxForPages 
			id="top-gainers" 
			data-testid="top-gainers-page" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					{/* Left side panel - hidden on small screens */}
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<SidePanel isLeft={true} />
					</Grid>

					{/* Main content */}
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Grid
							id="top-gainers-grid-container"
							data-testid="top-gainers-grid"
							container
							alignItems="stretch"
							spacing={1}
							sx={{
								pt: 1,
								pl: 1,
								pr: 1,
								height: "100%",
							}}
						>
							{Array.isArray(topGainersData) && topGainersData.map((item: any, index: number) => (
								<Grid
									item
									xs={12}
									md={12 / 10}
									key={index + 1}
									sx={{
										width: "100%",
										height: "50%",
									}}
								>
									<GainerCard
										{...item}
										index={index}
									/>
								</Grid>
							))}
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

export default Gainers;
