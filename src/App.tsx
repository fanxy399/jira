import React from "react";
import { useAuth } from "context/auth-context";
import ErrorBoundary from "components/ErrorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
// import {ErrorBoundary} from 'react-error-boundary'
import "App.css";

const Authenticated = React.lazy(() => import("Authenticated"));
const Unauthenticated = React.lazy(() => import("Screens/Unauthenticated"));

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        <React.Suspense fallback={FullPageLoading}>
          {user ? <Authenticated /> : <Unauthenticated />}
        </React.Suspense>
      </ErrorBoundary>
    </div>
  );
}

export default App;
