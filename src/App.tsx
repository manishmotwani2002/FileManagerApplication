import React from "react";
import logo from "./logo.svg";
import "./App.css";
import SystemTreeItem from "./components/fileSystemTree/SystemTreeItem";
import SystemTree from "./components/fileSystemTree";
import RightPanel from "./components/RightPanel";

function App() {
  return (
    <div>
      File Manager
      <div className="root">
        <div className="system-tree">
          <SystemTree />
        </div>
        <div className="right-panel">
          <RightPanel />
        </div>
      </div>
    </div>
  );
}

export default App;
