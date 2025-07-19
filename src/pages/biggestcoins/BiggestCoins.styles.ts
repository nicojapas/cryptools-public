import { APP_BAR_HEIGHT } from "../../constants";

export const biggestCoinsPageStyles = {
  container: {
    top: APP_BAR_HEIGHT,
    overflowX: "hidden",
    height: `calc(100vh - ${APP_BAR_HEIGHT})`,
  },

  innerContainer: {
    p: 2,
    height: '100%',
  },

  gridContainer: {
    height: '100%',
  },

  sidePanel: {
    display: { xs: 'none', md: 'block' },
    height: '100%',
  },

  mainContent: {
    height: '100%',
    overflowY: "auto",
  },

  coinsGrid: {
    p: 1,
  },

  coinGridItem: {
    width: "100%",
  },
};