import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SystemTreeItem from "./components/fileSystemTree/SystemTreeItem";
import SystemTree from "./components/fileSystemTree";
import RightPanel from "./components/RightPanel";

function App() {
  const [currentFolder, setCurrentFolder] = useState("Files");

  return (
    <div>
      File Manager
      <div className="root">
        <div className="system-tree">
          <SystemTree setCurrentFolder={setCurrentFolder} />
        </div>
        <div className="right-panel">
          <RightPanel currentFolder={currentFolder} />
        </div>
      </div>
    </div>
  );
}

export default App;
