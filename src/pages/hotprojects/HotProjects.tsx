import { APP_BAR_HEIGHT } from "../../constants.js";
import { StyledBoxForPages } from "../../components";
import { TrendingCoinItem } from "../../utils/types";
import { useTrendingCoinsData } from "../../hooks";
import { TrendingCoinCard } from "./elements";
import Grid from "@mui/material/Grid";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";

const HotProjects = () => {
  const { isLoading, error, data } = useTrendingCoinsData();

  if (error) {
    console.error('HotProjects error:', error);
    return (
      <StyledBoxForPages id="hot-projects" sx={{ top: APP_BAR_HEIGHT }}>
        <Typography variant="h6" color="error">
          An error has occurred: {error.message}
        </Typography>
      </StyledBoxForPages>
    );
  }

  if (isLoading) return <Skeleton variant="rounded" height={60} />;

  if (!data || data.length === 0) {
    return (
      <StyledBoxForPages id="hot-projects" sx={{ top: APP_BAR_HEIGHT }}>
        <Typography variant="h6">
          No trending coins available at the moment.
        </Typography>
      </StyledBoxForPages>
    );
  }

  return (
    <StyledBoxForPages id="hot-projects" sx={{ top: APP_BAR_HEIGHT }}>
      <Grid
        id="hotprojects-grid-container"
        container
        alignItems="stretch"
        spacing={1}
        sx={{ pt: 1, pl: 1, pr: 1, height: "100%" }}
      >
        {data.map((coin: TrendingCoinItem, index: number) => (
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

export default HotProjects;
