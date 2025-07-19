import { useState, useMemo } from "react";

export const useColorMode = () => {
	const [themeMode, setThemeMode] = useState<"light" | "dark">("light");

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

	return {
		themeMode,
		colorMode,
	};
}; 