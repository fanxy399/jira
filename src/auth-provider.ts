import { User } from "Screens/Projects/List";

const API = process.env.REACT_APP_API_URL;
const localStorageKey = "__auth_provider_token__";

// 获取用户token
export const token = () => window.localStorage.getItem(localStorageKey);

// 保存用户token
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 注册
export const register = (params: { username: string; password: string }) => {
  fetch(`${API}/register`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    if (res.ok) handleUserResponse(await res.json());
  });
};

// 登陆
export const login = (params: { username: string; password: string }) => {
  fetch(`${API}/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(params),
  }).then(async (res) => {
    if (res.ok) handleUserResponse(await res.json());
  });
};

// 登出
export const loginOut = () => window.localStorage.removeItem(localStorageKey);
