import { useState } from "react";

import SystemTree from "./components/FileSystemTree";
import RightPanel from "./components/RightPanel";

import { Folder } from "./types/folderTypes";

import "./app.css";

const App = () => {
  const [currentFolder, setCurrentFolder] = useState({
    type: "Folder",
    name: "root",
    date: "01/01/2002",
    creator: "Manish",
    size: "100",
    directory: ["root"],
    folderId: 100,
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
