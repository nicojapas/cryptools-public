import ReactDOM from "react-dom/client";
import "./styles/index.css";
import App from "./App";
import ReactGA from "react-ga4";
// import { CookiesProvider } from "react-cookie";

// const TRACKING_ID = "G-FQFSGZK3Q4";

// ReactGA.initialize(TRACKING_ID);

const root = ReactDOM.createRoot(document.getElementById("root"));
const app = (
//	<CookiesProvider>
		<App />
//	</CookiesProvider>
);

root.render(app);
