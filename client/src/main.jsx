import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

// Supports weights 200-900
import '@fontsource-variable/nunito';
// Supports weights 200-900
import '@fontsource-variable/nunito-sans';
// Supports weights 200-800
import '@fontsource-variable/assistant';


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
