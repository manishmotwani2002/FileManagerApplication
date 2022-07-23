import { useState } from "react";
import SystemTreeItem from "./SystemTreeItem";
import "./index.css";

import type { RootState } from "../../store/store";
import { useSelector } from "react-redux";

function SystemTree({ setCurrentFolder }: any) {
  // const [folders, setFolders] = useState(
  //   localStorage.getItem("folders")
  //     ? JSON.parse(localStorage.getItem("folders") || "{}")
  //     : []
  // );

  const folders = useSelector((state: RootState) => state.folders.folders);

  console.log("left panel folders", folders);

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
