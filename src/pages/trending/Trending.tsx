import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages } from "../../components/index.js";
import { TrendingCoinItem } from "../../utils/types.js";
import { TrendingCoinCard } from "./elements/index.js";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import { useTokensDataContext } from "../../contexts/TokensDataContext.js";

const Trending = () => {
  const { isLoading, error, trendingCoinsData } = useTokensDataContext();
	if (error) return <div>An error has occurred: {error.message}</div>;
	if (isLoading || !trendingCoinsData) return <Skeleton variant="rounded" height={60} />;

  return (
    <StyledBoxForPages id="trending" sx={{ top: APP_BAR_HEIGHT }}>
      <Grid
        id="trending-coins-grid-container"
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
    </StyledBoxForPages>
  );
};

export default Trending;
