import { Suspense } from "react";

function I18nWrapper({ children }) {
  return <Suspense fallback={'...is loading'}>{children}</Suspense>;
}

export default I18nWrapper