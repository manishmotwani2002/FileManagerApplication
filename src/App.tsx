import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SystemTreeItem from "./components/fileSystemTree/SystemTreeItem";
import SystemTree from "./components/fileSystemTree";

function App() {
  return (
    <div>
      File Manager
      <div className="root">
        <div>
          <SystemTree />
        </div>
        <div>Right side area</div>
      </div>
    </div>
  );
}

export default App;
