import { HashRouter, Route, Routes } from "react-router-dom";
import { useState, useMemo, Suspense, lazy } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

// Lazy load page components for code splitting
const Home = lazy(() => import("./pages/home/Home"));
const BiggestCoins = lazy(() => import("./pages/biggestcoins/BiggestCoins"));
const News = lazy(() => import("./pages/news/News"));
const Charts = lazy(() => import("./pages/charts/Charts"));
const Trending = lazy(() => import("./pages/trending/Trending"));
const TopGainers = lazy(() => import("./pages/topgainers/TopGainers"));
const WorstLosers = lazy(() => import("./pages/worstlosers/WorstLosers"));
const RugChecker = lazy(() => import("./pages/rugchecker/RugChecker"));
const Sniper = lazy(() => import("./pages/sniper/Sniper"));
const BscSniffer = lazy(() => import("./pages/bscsniffer/BscSniffer"));
import {
	CryptoolsAppBar,
	ThemeByMode,
	ThemeModeButton,
} from "./components";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { TokensDataProvider } from "./contexts/TokensDataContext";
import { NewsDataProvider } from "./contexts/NewsDataContext";
import { ColorModeContext } from "./contexts/ColorModeContext";
import { useColorMode } from "./hooks";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      refetchOnWindowFocus: false,
      refetchOnMount: false,
      refetchOnReconnect: false,
      retry: 1,
    },
  },
});

// Loading fallback component for lazy-loaded pages
const PageLoadingFallback = () => (
  <Box
    display="flex"
    justifyContent="center"
    alignItems="center"
    height="100vh"
    width="100%"
  >
    <CircularProgress size={60} />
  </Box>
);

const App = () => {
	const [settingsButton, setSettingsButton] = useState<React.ReactElement | undefined>(undefined);
	const { themeMode, colorMode } = useColorMode();
	
	const theme = useMemo(() => createTheme(ThemeByMode(themeMode)), [themeMode]);
	
	const handleSetSettingsButton = (button?: React.ReactElement) => {
		setSettingsButton(button);
	};

	return (
		<QueryClientProvider client={queryClient}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={theme}>
					<CssBaseline />
					<HashRouter data-testid="app-router">
						<CryptoolsAppBar
							themeModeButton={<ThemeModeButton themeMode={themeMode} onToggle={colorMode.toggleColorMode} />}
							settingsButton={settingsButton || <div />}
						/>
						<div data-testid="app-main-container" style={{ position: 'relative', height: 'calc(100vh - 96px)' }}>
							<TokensDataProvider>
								<NewsDataProvider>
									<Suspense fallback={<PageLoadingFallback />}>
										<Routes data-testid="app-routes">
											<Route path="/" element={<Home />} />
											<Route path="/home" element={<Home />} />
											<Route path="/news" element={<News />} />
											<Route path="/biggest-coins" element={<BiggestCoins setSettingsButton={handleSetSettingsButton} />} />
											<Route path="/charts" element={<Charts />} />
											<Route path="/trending" element={<Trending />} />
											<Route path="/top-gainers" element={<TopGainers />} />
											<Route path="/worst-losers" element={<WorstLosers />} />
											<Route path="/rug-checker" element={<RugChecker />} />
											<Route path="/sniper" element={<Sniper />} />
											<Route path="/bsc-sniffer" element={<BscSniffer />} />
										</Routes>
									</Suspense>
								</NewsDataProvider>
							</TokensDataProvider>
						</div>
					</HashRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</QueryClientProvider>
	);
};

export default App;
