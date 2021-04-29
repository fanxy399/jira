import { useState } from "react";
import Login from "Screens/Unauthenticated/Login";
import Register from "Screens/Unauthenticated/Register";

export default function Unauthenticated() {
  const [flag, setflag] = useState(false);
  const button = (
    <button
      onClick={() => {
        setflag(!flag);
      }}
    >
      切换{flag ? "登录" : "注册"}
    </button>
  );
  return (
    <>{flag ? <Register children={button} /> : <Login children={button} />}</>
  );
}
