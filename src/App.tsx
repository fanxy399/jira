import { useAuth } from "context/auth-context";
import Authenticated from "Authenticated";
import Unauthenticated from "Screens/Unauthenticated";
import ErrorBoundary from "components/ErrorBoundary";
import { FullPageErrorFallback } from "components/lib";
// import {ErrorBoundary} from 'react-error-boundary'
import "App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">
      <ErrorBoundary fallbackRender={FullPageErrorFallback}>
        {user ? <Authenticated /> : <Unauthenticated />}
      </ErrorBoundary>
    </div>
  );
}

export default App;
