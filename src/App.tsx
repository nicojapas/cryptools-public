import { HashRouter, Route, Routes } from "react-router-dom";
import { createContext, useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import IconButton from "@mui/material/IconButton";
import LightModeIcon from "@mui/icons-material/LightMode";

import {
	Home,
	BiggestCoins,
	News,
	Charts,
	Trending,
	TopGainers,
	WorstLosers,
	RugChecker,
	Sniper,
	BscSniffer,
	Soon,
} from "./pages";
import {
	CryptoolsAppBar,
	ThemeByMode,
} from "./components";
import {
	QueryClient,
	QueryClientProvider,
} from "@tanstack/react-query";
import { TokensDataProvider } from "./contexts/TokensDataContext";

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
const ColorModeContext = createContext({ toggleColorMode: () => {} });


const App = () => {
	const [themeMode, setThemeMode] = useState<"light" | "dark">("light");
	const [settingsButton, setSettingsButton] = useState<React.ReactElement | undefined>(undefined);
	
	const handleSetSettingsButton = (button?: React.ReactElement) => {
		setSettingsButton(button);
	};

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setThemeMode((prevMode: "light" | "dark") =>
					prevMode === "light" ? "dark" : "light"
				);
			},
		}),
		[]
	);
	const ThemeModeButton = useMemo(() => (
    <IconButton
        size="large"
        onClick={() => colorMode.toggleColorMode()}
        color="inherit"
        sx={{ justifyContent: "right" }}
    >
        {themeMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
    </IconButton>
), [colorMode, themeMode]);


	return (
		<QueryClientProvider client={queryClient}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={createTheme(ThemeByMode(themeMode))}>
					<CssBaseline />
					<HashRouter>
						<CryptoolsAppBar
							themeModeButton={ThemeModeButton}
							settingsButton={settingsButton || <div />}
						/>
						<div style={{ position: 'relative', height: '100vh', paddingTop: '64px' }}>
							<TokensDataProvider>
								<Routes>
									<Route path="/" element={<Home />} />
									<Route path="/home" element={<Home />} />
									<Route path="/news" element={<News />} />
									<Route path="/biggest-coins" element={<BiggestCoins setSettingsButton={handleSetSettingsButton} />} />
									<Route path="/nfts" element={<Soon />} />
									<Route path="/charts" element={<Charts />} />
									<Route path="/trending" element={<Trending />} />
									<Route path="/top-gainers" element={<TopGainers />} />
									<Route path="/worst-losers" element={<WorstLosers />} />
									<Route path="/rug-checker" element={<RugChecker />} />
									<Route path="/sniper" element={<Sniper />} />
									<Route path="/bsc-sniffer" element={<BscSniffer />} />
								</Routes>
							</TokensDataProvider>
						</div>
					</HashRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</QueryClientProvider>
	);
};

export default App;
