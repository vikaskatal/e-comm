import React, { lazy, Suspense } from "react";

const LazyLoginPage = lazy(() => import("./LoginPage"));

const LoginPage = (props:any) => (
  <Suspense fallback={null}>
    <LazyLoginPage {...props} />
  </Suspense>
);

export default LoginPage;
