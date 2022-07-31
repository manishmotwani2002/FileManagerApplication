import { Children, useState } from "react";
import SystemTreeItem from "./SystemTreeItem";
import "./index.css";

import type { RootState } from "../../store/store";
import { useSelector, useDispatch } from "react-redux";

import { addDirectory } from "../../store/directorySlice";

const SystemTree = ({ setCurrentFolder }: any) => {
  const [currentChildFolders, setCurrentChildFolders] = useState<[] | null>(
    null
  );
  const dispatch = useDispatch();

  const folders = useSelector((state: RootState) => state.folders.folders);
  const currentDirectory = useSelector((state: RootState) => state.directory);

  const handleClick = (folder: any) => {
    setCurrentFolder(folder);
    const { name } = folder;
    //update the directory of the folder
    dispatch(addDirectory({ folderName: name, request: "root" }));
  };

  const handleHideMenu = () => {
    const closeMenu: any = document.querySelector(".system-tree");
    closeMenu.style.display = "none";
  };

  const handleChildren = (clickedFolder: any) => {
    const currentDirectory = [...clickedFolder.directory, clickedFolder.name];

    const childFolders: any = folders.filter((folder) => {
      return (
        JSON.stringify(folder.directory) === JSON.stringify(currentDirectory)
      );
    });
    setCurrentChildFolders(childFolders);
  };

  return (
    <div>
      <div className="menu-root">
        <h3>Root</h3>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 cross-icon"
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={handleHideMenu}
        >
          <path
            fill-rule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clip-rule="evenodd"
          />
        </svg>
        <div>
          {folders.map((item: any, index: number) => {
            if (JSON.stringify(item.directory) === JSON.stringify(["root"])) {
              return (
                <div
                  key={item}
                  onClick={() => {
                    handleClick(item);
                    handleChildren(item);
                  }}
                >
                  <SystemTreeItem name={item.name} />
                </div>
              );
            }
          })}

          {currentChildFolders?.map((child: any, index: number) => {
            return (
              <div
                className="children-item"
                key={child}
                onClick={() => {
                  handleClick(child);
                  handleChildren(child);
                }}
              >
                <SystemTreeItem name={child.name} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SystemTree;
