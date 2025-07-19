import { APP_BAR_HEIGHT } from "../../constants";

export const bscSnifferPageStyles = {
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

  tableContainer: {
    height: '100%',
    overflow: 'auto',
  },

  tableHeaderCell: {
    width: "20%",
  },

  tableHeaderCellName: {
    width: "40%",
  },

  tableHeaderCellSymbol: {
    width: "40%",
  },

  tableRow: {
    height: "4.25rem",
    position: "relative",
  },

  tableRowHovered: {
    backgroundColor: "background.default",
  },

  tableCellSpanned: {
    textAlignLast: "center",
    background: "rgba(255,255,255,0.7)",
    zIndex: 1,
    position: "relative",
  },

  overlayBackground: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 2000,
    background: "transparent",
    pointerEvents: "none",
  },
};