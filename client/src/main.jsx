import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import "./lib/i18n";
import I18nWrapper from "./lib/i18nWrapper.jsx";

const root = createRoot(document.getElementById("root"))

root.render(
	<React.StrictMode>
		<I18nWrapper>
			<App />
		</I18nWrapper>
	</React.StrictMode>,
);
