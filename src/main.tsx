import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";

// import { CookiesProvider } from "react-cookie";

// const TRACKING_ID = "G-FQFSGZK3Q4";

// ReactGA.initialize(TRACKING_ID);

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = ReactDOM.createRoot(rootElement);
const app = (
//	<CookiesProvider>
		<App />
//	</CookiesProvider>
);

root.render(app);
