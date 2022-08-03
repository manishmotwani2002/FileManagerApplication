import { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import SystemTree from "./components/FileSystemTree/index";
import RightPanel from "./components/RightPanel";

const App = () => {
  const [currentFolder, setCurrentFolder] = useState({
    type: "Folder",
    name: "root",
  });
  document.addEventListener("contextmenu", (event) => event.preventDefault());
  return (
    <div>
      <div className="root">
        <div id="menu" className="system-tree">
          <SystemTree setCurrentFolder={setCurrentFolder} />
        </div>
        <div className="right-panel">
          <RightPanel
            currentFolder={currentFolder}
            setCurrentFolder={setCurrentFolder}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
