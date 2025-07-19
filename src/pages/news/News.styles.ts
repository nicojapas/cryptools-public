import { APP_BAR_HEIGHT } from "../../constants";

export const newsPageStyles = {
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

  contentPaper: {
    height: '100%',
    overflow: 'auto',
    "&:hover": {
      transform: "none",
    },
  },

  gridItem: {
    display: "grid",
  },

  timeStack: {
    p: 1,
  },

  timeTypography: {
    pr: 2,
    fontSize: "0.75rem",
    color: "text.secondary",
  },

  titleTypography: {
    fontSize: "0.875rem",
    fontWeight: 500,
    lineHeight: 1.4,
  },

  votesStack: {
    ml: 5,
  },

  voteComponent: {
    ml: 0.5,
    mr: 0.5,
    fontSize: "0.7rem",
  },

  voteIcon: {
    mr: 0.5,
    fontSize: '0.7rem',
  },
};