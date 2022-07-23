import { useState } from "react";
import SystemTreeItem from "./SystemTreeItem";
import "./index.css";

function SystemTree({ setCurrentFolder }: any) {
  const [folders, setFolders] = useState(
    localStorage.getItem("folders")
      ? JSON.parse(localStorage.getItem("folders") || "{}")
      : []
  );

  const handleClick = (folderName: string) => {
    setCurrentFolder(folderName);
  };

  return (
    <div className="menu-root">
      Root
      <div>
        {folders.map((item: any, index: number) => {
          return (
            <div key={item} onClick={() => handleClick(item.name)}>
              <SystemTreeItem name={item.name} />
            </div>
          );
        })}
        <div className="children-item"></div>
      </div>
    </div>
  );
}

export default SystemTree;
