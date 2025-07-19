import { APP_BAR_HEIGHT } from "../../constants";

export const rugCheckerPageStyles = {
  container: {
    top: APP_BAR_HEIGHT,
    overflowX: "hidden",
    height: `calc(100vh - ${APP_BAR_HEIGHT})`,
    maxHeight: `calc(100vh - ${APP_BAR_HEIGHT})`,
    overflowY: 'auto',
  },

  innerContainer: {
    p: 2,
    height: '100%',
    maxHeight: '100%',
    overflowY: 'auto',
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

  titleTypography: {
    pb: 2,
  },

  targetAddressStack: {
    alignItems: "center",
    borderRadius: 1,
    mb: 2,
  },

  addressTextField: {
    backgroundColor: "background.default",
  },

  pasteIconButton: {
    borderRadius: 1,
  },

  progressGrid: {
    // No additional styles needed
  },

  infoCardGrid: {
    // No additional styles needed
  },

  buttonStack: {
    mt: 2,
    mb: 1,
    display: 'flex',
    justifyContent: 'center',
  },

  buttonStackInner: {
    direction: "row",
    spacing: 3,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyGrid: {
    p: "0 !important",
  },

  sniperButtonGrid: {
    display: 'flex',
    justifyContent: 'center',
    mt: 3,
  },

  sniperButton: {
    width: 'auto',
    px: 4,
  },

  metamaskPaper: {
    // Uses default StyledPaper styles
  },

  metamaskTypography: {
    p: 1,
  },

  externalSiteCard: {
    minWidth: 48,
    minHeight: 48,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    p: 0.25,
  },

  externalSiteActionArea: {
    backgroundColor: "background.default",
    flexGrow: 1,
    p: 0.5,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },

  externalSiteIcon: {
    width: 20,
    height: 20,
    marginBottom: 2,
  },

  externalSiteLabel: {
    fontWeight: 500,
    textAlign: 'center',
    fontSize: 11,
  },
};