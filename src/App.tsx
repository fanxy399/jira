import { useAuth } from "context/auth-context";
import Authenticated from "Authenticated";
import Unauthenticated from "Screens/Unauthenticated";
import "App.css";

function App() {
  const { user } = useAuth();
  return (
    <div className="App">{user ? <Authenticated /> : <Unauthenticated />}</div>
  );
}

export default App;
