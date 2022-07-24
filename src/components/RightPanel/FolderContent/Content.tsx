import { useState, useEffect, useRef, useCallback } from "react";
import { getPhotos } from "../../../utils/folderPhotos";
import AddContent from "../AddContent/AddContent";
import FileCard from "../FilesAndFoldersCards/FileCard";
import FolderCard from "../FilesAndFoldersCards/FolderCard";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

import { debounce } from "../../../utils/debounce";

import "./content.css";

<div>{/* <AddContent /> */}</div>;
function Content({ currentFolder, searchQuery }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);

  const currentDirectory = useSelector(
    (state: RootState) => state.directory.directory
  );

  console.log(currentDirectory);

  const folders = localStorage.getItem("folders")
    ? JSON.parse(localStorage.getItem("folders") || "{}")
    : [];

  console.log(folders);

  const nestedFolders = folders.filter(function (folder: any) {
    return (
      JSON.stringify(folder.directory) === JSON.stringify(currentDirectory)
    );
  });

  console.log(nestedFolders);

  const handleAdd = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (localStorage.getItem(currentFolder)) {
      setFiles(JSON.parse(localStorage.getItem(currentFolder) || "{}"));
    } else {
      getPhotos(currentFolder).then((response) => {
        setFiles(response.results);
        localStorage.setItem(currentFolder, JSON.stringify(response.results));
      });
    }
  }, [currentFolder]);

  return (
    <div className="files-container">
      {modalOpen && <AddContent setOpenModal={setModalOpen} />}

      <div
        className="add-item folder-item"
        onClick={() => {
          handleAdd();
        }}
      >
        +
      </div>

      {nestedFolders.map((folder: any, index: number) => {
        console.log(folder);
        return (
          <div>
            <FolderCard folderName={folder.name} />
          </div>
        );
      })}

      {files?.map((file, index) => {
        return (
          <div className="folder-item">
            <FileCard imageLink={file.urls.small} />
          </div>
        );
      })}
    </div>
  );
}

export default Content;
