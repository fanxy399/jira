import { FormEvent } from "react";

export default function Login() {
  const API = process.env.REACT_APP_API_URL;
  const login = (params: { username: string; password: string }) => {
    fetch(`${API}/login`, {
      method: "post",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(params),
    }).then(async (res) => {
      if (res.ok) await res.json();
    });
  };
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
      <div>
        <label htmlFor="username">用户名</label>
        <input type="text" id="username" />
      </div>
      <div>
        <label htmlFor="password">密码</label>
        <input type="password" id="password" />
      </div>
      <button type="submit">提交</button>
    </form>
  );
}
