import React from "react";
import ReactDOM from "react-dom";
import App from "App";
import reportWebVitals from "reportWebVitals";
import { DevTools, loadServer } from "jira-dev-tool";
import "antd/dist/antd.less";
import { AppProvider } from "context";
import { BrowserRouter as Router } from "react-router-dom";

loadServer(() => {
  ReactDOM.render(
    <Router>
      <React.StrictMode>
        <AppProvider>
          <DevTools />
          <App />
        </AppProvider>
      </React.StrictMode>
    </Router>,
    document.getElementById("root")
  );
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
