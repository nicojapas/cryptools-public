import { BrowserRouter, Route, Routes } from "react-router-dom";
import { createContext, useState, useMemo, useEffect } from "react";
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
	Nfts,
	HotProjects,
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
	ContactAndCryptoAddresses,
} from "./components";
import {
	QueryClient,
	QueryClientProvider,
	useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient();
const ColorModeContext = createContext({ toggleColorMode: () => {} });


const App = () => {
	const [themeMode, setThemeMode] = useState("light");
	const [settingsButton, setSettingsButton] = useState();
	const pagesTable = {
		"/": <Home />,
		"/home": <Home />,
		"/news": <News />,
		"/biggest-coins": (
			<BiggestCoins setSettingsButton={setSettingsButton} />
		),
		"/nfts": <Soon />,
		"/charts": <Charts />,
		"/hot-projects": <HotProjects />,
		"/top-gainers": <TopGainers />,
		"/worst-losers": <WorstLosers />,
		"/rug-checker": <RugChecker />,
		"/sniper": <Sniper />,
		"/bsc-sniffer": <BscSniffer />,
	};
	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				setThemeMode((prevMode) =>
					prevMode === "light" ? "dark" : "light"
				);
			},
		}),
		[]
	);
	const ThemeModeButton = () => {
    return (
        <IconButton
            size="large"
            onClick={() => colorMode.toggleColorMode()}
            color="inherit"
            sx={{ justifyContent: "right" }}
        >
            {themeMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
    );
};



	return (
		<QueryClientProvider client={queryClient}>
			<ColorModeContext.Provider value={colorMode}>
				<ThemeProvider theme={createTheme(ThemeByMode(themeMode))}>
					<CssBaseline />
					<BrowserRouter>
						<CryptoolsAppBar
							themeModeButton={<ThemeModeButton />}
							settingsButton={settingsButton}
						/>
						<ContactAndCryptoAddresses />
							<Routes>
								{Object.entries(pagesTable).map(
									([path, element], index) => (
										<Route
											key={index}
											path={path}
											element={element}
										/>
									)
								)}
							</Routes>
					</BrowserRouter>
				</ThemeProvider>
			</ColorModeContext.Provider>
		</QueryClientProvider>
	);
};

export default App;
