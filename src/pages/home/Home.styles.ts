import { Theme } from "@mui/material/styles";
import { APP_BAR_HEIGHT } from "../../constants";

export const homePageStyles = {
  container: {
    overflowX: "hidden",
    background: "transparent",
    height: `calc(100vh - ${APP_BAR_HEIGHT}px)`,
    position: "absolute",
    top: 8,
    left: 0,
    right: 0,
    pt: 0,
  },

  innerContainer: {
    px: 1,
    pb: 1,
    pt: 0,
    height: "100%",
  },

  gridContainer: {
    height: "100%",
  },

  sidePanel: {
    display: { xs: 'none', md: 'block' },
    height: '100%',
  },

  mainContent: {
    height: '100%',
  },

  navigationSection: {
    flexShrink: 0,
  },

  navigationPaper: {
    height: "100%",
    alignContent: "space-evenly",
    borderRadius: "12px",
    background: (theme: Theme) => theme.palette.mode === 'light'
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)"
      : "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    border: (theme: Theme) => theme.palette.mode === 'light'
      ? "1px solid rgba(0, 212, 170, 0.3)"
      : "1px solid rgba(0, 212, 170, 0.1)",
    boxShadow: (theme: Theme) => theme.palette.mode === 'light'
      ? "0 8px 24px rgba(0, 0, 0, 0.1)"
      : "0 8px 24px rgba(0, 0, 0, 0.3)",
    position: "relative",
    p: 1,
    "&:hover": {
      transform: "none",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "12px",
      background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover::before": {
      opacity: 1,
    },
  },

  bannerSection: {
    flexShrink: 0,
  },

  bannerPaper: {
    height: "100%",
    alignContent: "center",
    borderRadius: "12px",
    overflow: "clip",
    background: (theme: Theme) => theme.palette.mode === 'light'
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(248, 250, 252, 0.9) 100%)"
      : "linear-gradient(135deg, rgba(26, 31, 46, 0.9) 0%, rgba(10, 14, 26, 0.9) 100%)",
    backdropFilter: "blur(20px)",
    border: (theme: Theme) => theme.palette.mode === 'light'
      ? "1px solid rgba(0, 212, 170, 0.3)"
      : "1px solid rgba(0, 212, 170, 0.1)",
    p: 1,
    boxShadow: (theme: Theme) => theme.palette.mode === 'light'
      ? "0 6px 20px rgba(0, 0, 0, 0.1)"
      : "0 6px 20px rgba(0, 0, 0, 0.3)",
    position: "relative",
    "&:hover": {
      transform: "none",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "12px",
      background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover::before": {
      opacity: 1,
    },
  },

  dashboardSection: {
    flex: 1,
    minHeight: 0,
    display: "flex",
  },

  newsDashboardPaper: {
    width: "100%",
    borderRadius: "12px",
    background: (theme: Theme) => theme.palette.mode === 'light'
      ? "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(248, 250, 252, 0.95) 100%)"
      : "linear-gradient(135deg, rgba(26, 31, 46, 0.95) 0%, rgba(10, 14, 26, 0.95) 100%)",
    backdropFilter: "blur(20px)",
    border: (theme: Theme) => theme.palette.mode === 'light'
      ? "1px solid rgba(0, 212, 170, 0.3)"
      : "1px solid rgba(0, 212, 170, 0.1)",
    boxShadow: (theme: Theme) => theme.palette.mode === 'light'
      ? "0 6px 20px rgba(0, 0, 0, 0.1)"
      : "0 6px 20px rgba(0, 0, 0, 0.3)",
    position: "relative",
    "&:hover": {
      transform: "none",
    },
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderRadius: "12px",
      background: "linear-gradient(45deg, rgba(0, 212, 170, 0.05), rgba(255, 193, 7, 0.05), rgba(0, 212, 170, 0.05))",
      opacity: 0,
      transition: "opacity 0.3s ease",
    },
    "&:hover::before": {
      opacity: 1,
    },
  },

  marketDashboardSection: {
    flex: 1,
    minHeight: 0,
    display: "flex",
  },
};