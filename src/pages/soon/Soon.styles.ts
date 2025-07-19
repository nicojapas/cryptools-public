import { APP_BAR_HEIGHT } from "../../constants";

export const soonPageStyles = {
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
  },

  paper: {
    height: "100%",
    backgroundColor: "background.paper",
    transition: "background-color 0.5s",
  },

  contentBox: {
    p: 2,
  },
};