import { APP_BAR_HEIGHT } from "../../constants";

export const sniperPageStyles = {
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

  errorAlert: {
    mb: 2,
  },

  walletGrid: {
    display: "grid",
  },

  settingsGrid: {
    display: "grid",
  },

  targetPanelTypography: {
    pb: 2,
  },

  targetStack: {
    alignItems: "stretch",
    justifyContent: "space-between",
  },

  targetAddressStack: {
    alignItems: "center",
    borderRadius: 1,
  },

  targetTextField: {
    backgroundColor: "background.default",
  },

  targetPasteButton: {
    borderRadius: 1,
  },

  targetDataGrid: {
    alignItems: "center",
    pt: 2,
  },

  loadingBox: {
    display: "flex",
    justifyContent: "center",
  },

  externalLinkGrid: {
    width: "fit-content",
    pt: 2,
  },

  metamaskGrid: {
    display: "flex",
  },

  metamaskTypography: {
    p: 1,
  },

  externalSiteGrid: {
    // No additional styles needed
  },

  externalSiteActionArea: {
    backgroundColor: "background.default",
    flexGrow: 1,
    p: 1,
  },

  externalSiteIcon: {
    width: 24,
    height: 24,
  },
};