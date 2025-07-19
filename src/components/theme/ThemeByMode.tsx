import { ThemeOptions } from "@mui/material";

const themeByMode = (mode: "light" | "dark"): ThemeOptions => ({
	palette: {
		mode,
		primary: {
			light: mode === "light" ? "#00D4AA" : "#00F5A0", // Crypto green
			main: mode === "light" ? "#00B894" : "#00D4AA", // Blockchain green
			dark: mode === "light" ? "#00A085" : "#00B894", // Dark crypto green
			contrastText: mode === "light" ? "#fff" : "#000",
		},
		secondary: {
			light: mode === "light" ? "#FFD700" : "#FFE55C", // Crypto gold
			main: mode === "light" ? "#FFC107" : "#FFD700", // Bitcoin gold
			dark: mode === "light" ? "#FF8F00" : "#FFC107", // Dark gold
			contrastText: mode === "light" ? "#000" : "#000",
		},
		success: {
			light: "#00D4AA", // Crypto green
			main: "#00B894", // Blockchain green
			dark: "#00A085", // Dark crypto green
		},
		error: {
			light: "#FF6B6B", // Crypto red
			main: "#FF5252", // Error red
			dark: "#D32F2F", // Dark red
		},
		warning: {
			light: "#FFD700", // Crypto gold
			main: "#FFC107", // Bitcoin gold
			dark: "#FF8F00", // Dark gold
		},
		info: {
			light: "#4FC3F7", // Tech blue
			main: "#2196F3", // Blockchain blue
			dark: "#1976D2", // Dark blue
		},
		background: {
			default: mode === "light" ? "#F8FAFC" : "#0A0E1A",
			paper: mode === "light" ? "#FFFFFF" : "#1A1F2E",
		},
		...(mode === "dark" && {
			divider: "rgba(255,255,255,0.12)",
		}),
		text: {
			...(mode === "light"
				? {
						primary: "#1E293B",
						secondary: "#64748B",
				  }
				: {
						primary: "#F1F5F9",
						secondary: "#94A3B8",
				  }),
		},
	},
	typography: {
		fontFamily: ["VT323", "monospace"].join(","),
		h1: {
			fontWeight: 400,
			letterSpacing: "0.02em",
			fontSize: "2.5rem",
		},
		h2: {
			fontWeight: 400,
			letterSpacing: "0.01em",
			fontSize: "2rem",
		},
		h3: {
			fontWeight: 400,
			letterSpacing: "0.01em",
			fontSize: "1.75rem",
		},
		h4: {
			fontWeight: 400,
			fontSize: "1.5rem",
		},
		h5: {
			fontWeight: 400,
			fontSize: "1.25rem",
		},
		h6: {
			fontWeight: 400,
			fontSize: "1rem",
		},
		subtitle1: {
			fontWeight: 400,
			fontSize: "1.1rem",
		},
		subtitle2: {
			fontWeight: 400,
			fontSize: "1rem",
		},
		body1: {
			lineHeight: 1.4,
			fontSize: "1.1rem",
		},
		body2: {
			lineHeight: 1.3,
			fontSize: "1rem",
		},
		button: {
			fontWeight: 400,
			textTransform: "none",
			fontSize: "1rem",
		},
		caption: {
			fontSize: "0.9rem",
		},
		overline: {
			fontSize: "0.8rem",
		},
	},
	shape: {
		borderRadius: 12,
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					textAlign: "center",
					overflow: "hidden",
					minHeight: "100vh",
					background: mode === "light" 
						? "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #00B894 100%)"
						: "linear-gradient(135deg, #0c0c0c 0%, #1a1a2e 30%, #00B894 70%, #16213e 100%)",
					backgroundAttachment: "fixed",
					position: "relative",
					"&::before": {
						content: '""',
						position: "fixed",
						top: 0,
						left: 0,
						width: "100%",
						height: "100%",
						background: mode === "light"
							? "radial-gradient(circle at 20% 80%, rgba(0, 212, 170, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 193, 7, 0.1) 0%, transparent 50%)"
							: "radial-gradient(circle at 20% 80%, rgba(0, 212, 170, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255, 193, 7, 0.2) 0%, transparent 50%)",
						pointerEvents: "none",
						zIndex: -1,
					},
				},
				"*::-webkit-scrollbar": {
					width: "8px",
					height: "8px",
				},
				"*::-webkit-scrollbar-track": {
					background: mode === "light" ? "#f1f1f1" : "#2a2a2a",
					borderRadius: "4px",
				},
				"*::-webkit-scrollbar-thumb": {
					background: mode === "light" ? "#00B894" : "#00D4AA",
					borderRadius: "4px",
					"&:hover": {
						background: mode === "light" ? "#00A085" : "#00B894",
					},
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
					backdropFilter: mode === "light" ? "blur(10px)" : "blur(20px)",
					backgroundColor: mode === "light" 
						? "rgba(255, 255, 255, 0.9)" 
						: "rgba(26, 31, 46, 0.8)",
					border: mode === "light" 
						? "1px solid rgba(0, 212, 170, 0.2)" 
						: "1px solid rgba(0, 212, 170, 0.1)",
					boxShadow: mode === "light"
						? "0 8px 32px rgba(0, 0, 0, 0.1)"
						: "0 8px 32px rgba(0, 0, 0, 0.3)",
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
					backdropFilter: mode === "light" ? "blur(10px)" : "blur(20px)",
					backgroundColor: mode === "light" 
						? "rgba(255, 255, 255, 0.9)" 
						: "rgba(26, 31, 46, 0.8)",
					border: mode === "light" 
						? "1px solid rgba(0, 212, 170, 0.2)" 
						: "1px solid rgba(0, 212, 170, 0.1)",
					boxShadow: mode === "light"
						? "0 4px 20px rgba(0, 0, 0, 0.08)"
						: "0 4px 20px rgba(0, 0, 0, 0.2)",
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "translateY(-4px)",
						boxShadow: mode === "light"
							? "0 12px 40px rgba(0, 0, 0, 0.15)"
							: "0 12px 40px rgba(0, 0, 0, 0.4)",
						border: mode === "light"
							? "1px solid rgba(0, 212, 170, 0.4)"
							: "1px solid rgba(0, 212, 170, 0.3)",
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					borderRadius: "12px",
					textTransform: "none",
					fontWeight: 600,
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "translateY(-2px)",
						boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
					},
				},
			},
			variants: [],
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
					"&:hover": {
						transform: "scale(1.05)",
					},
				},
			},
		},
		MuiAppBar: {
			styleOverrides: {
				root: {
					backgroundImage: "none",
					backdropFilter: mode === "light" ? "blur(20px)" : "blur(30px)",
					backgroundColor: mode === "light" 
						? "rgba(255, 255, 255, 0.95)" 
						: "rgba(26, 31, 46, 0.95)",
					borderBottom: mode === "light" 
						? "1px solid rgba(0, 212, 170, 0.2)" 
						: "1px solid rgba(0, 212, 170, 0.1)",
					boxShadow: mode === "light"
						? "0 4px 20px rgba(0, 0, 0, 0.1)"
						: "0 4px 20px rgba(0, 0, 0, 0.3)",
				},
			},
		},
	},
});

export default themeByMode;
