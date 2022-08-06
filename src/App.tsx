import { useState } from "react";

import SystemTree from "./components/FileSystemTree";
import RightPanel from "./components/RightPanel";

import "./App.css";

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
      <div className="App01Root">
        <div id="menu" className="App03SystemTree">
          <SystemTree setCurrentFolder={setCurrentFolder} />
        </div>
        <div className="App02RightPanel">
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
