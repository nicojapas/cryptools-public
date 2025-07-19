import { useMemo } from "react";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { StyledIconButton } from "./ThemeModeButton.styles";

interface ThemeModeButtonProps {
	themeMode: "light" | "dark";
	onToggle: () => void;
}

const ThemeModeButton = ({ themeMode, onToggle }: ThemeModeButtonProps) => {
	const button = useMemo(() => (
		<StyledIconButton
			size="large"
			onClick={onToggle}
			aria-label={`Switch to ${themeMode === 'dark' ? 'light' : 'dark'} mode`}
		>
			{themeMode === "dark" ? <DarkModeIcon /> : <LightModeIcon />}
		</StyledIconButton>
	), [themeMode, onToggle]);

	return button;
};

export default ThemeModeButton; 