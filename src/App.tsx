import { useAuth } from "context/auth-context";
import Authenticated from "Authenticated";
import Unauthenticated from "Screens/Unauthenticated";

function App() {
  const { user, logout } = useAuth();
  return (
    <div className="App">
      <div></div>
      {user ? (
        <>
          <div>
            欢迎登陆， 用户名：{user.name}
            <button onClick={logout}>登出</button>
          </div>
          <br />
          <Authenticated />
        </>
      ) : (
        <Unauthenticated />
      )}
    </div>
  );
}

export default App;
