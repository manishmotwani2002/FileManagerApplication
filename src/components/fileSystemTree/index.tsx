import { useState } from "react";
import SystemTreeItem from "./SystemTreeItem";
import "./index.css";

import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

import { addDirectory } from "../../store/directorySlice";

function SystemTree({ setCurrentFolder }: any) {
  const dispatch = useDispatch();

  const folders = useSelector((state: RootState) => state.folders.folders);
  const currentDirectory = useSelector((state: RootState) => state.directory);

  const handleClick = (folder: any) => {
    setCurrentFolder(folder);
    const { name } = folder;
    //update the directory of the folder
    dispatch(addDirectory({ folderName: name, request: "root" }));
  };

  return (
    <div className="menu-root">
      <h3>Root</h3>
      <div>
        {folders.map((item: any, index: number) => {
          if (JSON.stringify(item.directory) === JSON.stringify(["root"])) {
            return (
              <div key={item} onClick={() => handleClick(item)}>
                <SystemTreeItem name={item.name} />
              </div>
            );
          }
        })}
        <div className="children-item"></div>
      </div>
    </div>
  );
}

export default SystemTree;
