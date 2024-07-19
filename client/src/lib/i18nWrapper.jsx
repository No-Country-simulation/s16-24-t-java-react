import { Suspense } from "react";
import AppSkeleton from "../components/skeletons/app-skeleton";

function I18nWrapper({ children }) {
  return <Suspense fallback={<AppSkeleton />}>{children}</Suspense>;
}

export default I18nWrapper