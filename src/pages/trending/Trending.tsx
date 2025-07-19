import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages } from "../../components/index.js";
import { TrendingCoinItem } from "../../utils/types.js";
import { TrendingCoinCard } from "./elements/index.js";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Container from "@mui/material/Container";
import { useTokensDataContext } from "../../contexts/TokensDataContext.js";
import { SidePanel } from "../bscsniffer/elements";

const Trending = () => {
  const { isLoading, error, trendingCoinsData } = useTokensDataContext();
	if (error) return <div>An error has occurred: {error.message}</div>;
	if (isLoading || !trendingCoinsData) return (
		<StyledBoxForPages 
			id="trending" 
			sx={{ top: APP_BAR_HEIGHT, overflowX: "hidden", height: `calc(100vh - ${APP_BAR_HEIGHT})` }}
		>
			<Container maxWidth="lg" sx={{ p: 2, height: '100%' }}>
				<Grid container spacing={2} sx={{ height: '100%' }}>
					<Grid item xs={12} md={2} sx={{ display: { xs: 'none', md: 'block' }, height: '100%' }}>
						<Skeleton variant="rounded" height="100%" sx={{ borderRadius: 2 }} />
					</Grid>
					<Grid item xs={12} md={8} sx={{ height: '100%' }}>
						<Grid container alignItems="stretch" spacing={1} sx={{ pt: 1, pl: 1, pr: 1, height: "100%" }}>
							{[...Array(7)].map((_, index) => (
								<Grid item xs={12} md={12 / 7} key={index} sx={{ width: "100%", height: "100%" }}>
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
      id="trending" 
      data-testid="trending-page" 
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
              id="trending-coins-grid-container"
              data-testid="trending-grid"
              container
              alignItems="stretch"
              spacing={1}
              sx={{ pt: 1, pl: 1, pr: 1, height: "100%" }}
            >
              {trendingCoinsData.map((coin: TrendingCoinItem, index: number) => (
                <Grid
                  item
                  xs={12}
                  md={12 / 7}
                  key={index}
                  sx={{ width: "100%", height: "100%" }}
                >
                  <TrendingCoinCard {...coin} />
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

export default Trending;
