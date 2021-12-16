import React, { lazy, Suspense } from "react";

const LazyHomePage = lazy(() => import("./HomePage"));

const HomePage = (props:any) => (
  <Suspense fallback={null}>
    <LazyHomePage {...props} />
  </Suspense>
);

export default HomePage;
