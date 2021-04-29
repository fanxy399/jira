import { FormEvent, ReactNode } from "react";
import { useAuth } from "context/auth-context";

export default function Login(props: { children: ReactNode }) {
  const { login, user } = useAuth();
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = (event.currentTarget.elements[0] as HTMLInputElement)
      .value;
    const password = (event.currentTarget.elements[1] as HTMLInputElement)
      .value;
    login({ username, password });
  };
  return (
    <form onSubmit={handleSubmit}>
      <div>{user ? `登录成功，当前用户： ${user?.name}` : "未登录"}</div>
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">登陆</button>
      {props.children}
    </form>
  );
}
