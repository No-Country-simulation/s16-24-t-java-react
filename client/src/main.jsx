import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { router } from "./router.jsx";
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
	<I18nWrapper>
		<RouterProvider router={router} />
	</I18nWrapper>
);


