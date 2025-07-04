import { blueGrey, blue } from "@mui/material/colors";

const themeByMode = (mode) => ({
	palette: {
		mode,
		primary: {
			light: blueGrey[300],
			main: blueGrey[600],
			dark: blueGrey[900],
			...(mode === "dark" && {
				light: blueGrey[600],
				main: blueGrey[200],
				dark: blueGrey[100],
			}),
		},
		secondary: {
			light: blue[300],
			main: blue[900],
			dark: blue[300],
			...(mode === "dark" && {
				light: blue[900],
				main: blue[600],
				dark: blue[300],
			}),
		},
		background: {
			default: "#FFF",
			paper: "#F5F5F5",
		},
		...(mode === "dark" && {
			background: {
				default: "#000",
				paper: "#192231",
			},
			divider: "rgba(255,255,255,0.21)",
		}),
		text: {
			...(mode === "light"
				? {
						primary: "#192231",
						secondary: "#24344d",
				  }
				: {
						primary: "#fff",
						secondary: "#f5f5f5",
				  }),
		},
	},
	typography: {
		fontFamily: ["VT323", "monospace"].join(","),
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					textAlign: "center",
					overflow: "hidden",
					minHeight: "100vh",
				},
			},
		},
	},
});

export default themeByMode;
