import { Routes, Route, Navigate } from "react-router";
import { Link } from "react-router-dom";
import Epic from "../Epic";
import Kanban from "../Kanban";

export default function Project() {
  return (
    <div>
      <Link to={"/"}>
        <h2>Project-LIst</h2>
      </Link>
      <Link to={"Kanban"}>看板</Link>
      <Link to={"epic"}>任务组</Link>
      <Routes>
        <Route path={"kanban"} element={<Kanban />} />
        <Route path={"epic"} element={<Epic />} />
        <Navigate to={"kanban"} />
      </Routes>
    </div>
  );
}
