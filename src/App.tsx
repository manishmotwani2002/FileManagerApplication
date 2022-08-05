import { useState } from "react";

import SystemTree from "./components/FileSystemTree/SystemTree";
import RightPanel from "./components/RightPanel";

import "./App.css";

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
