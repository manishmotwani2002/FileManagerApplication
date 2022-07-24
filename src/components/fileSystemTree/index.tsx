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

  console.log(currentDirectory);

  console.log("left panel folders", folders);

  const handleClick = (folderName: string) => {
    setCurrentFolder(folderName);
    //update the directory of the folder
    console.log(folderName);
    dispatch(addDirectory({ folderName, request: "root" }));
  };

  return (
    <div className="menu-root">
      <h3>Root</h3>
      <div>
        {folders.map((item: any, index: number) => {
          if (
            JSON.stringify(item.directory) ==
            JSON.stringify(currentDirectory.directory)
          ) {
            console.log("inside the map", item.directory, currentDirectory);
            return (
              <div key={item} onClick={() => handleClick(item.name)}>
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
