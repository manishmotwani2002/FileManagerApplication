import { useState, useEffect, useRef, useCallback } from "react";
import { getPhotos } from "../../../utils/folderPhotos";
import AddContent from "../AddContent/AddContent";
import FileCard from "../FilesAndFoldersCards/FileCard";
import FolderCard from "../FilesAndFoldersCards/FolderCard";
import type { RootState } from "../../../store/store";
import { useSelector } from "react-redux";

import { debounce } from "../../../utils/debounce";

import "./content.css";

function Content({ currentFolder, searchQuery }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState("Loading...");
  const [menuOpen, setMenuOpen] = useState(false);
  const [filteredFolders, setFilteredFolders] = useState([]);

  const currentDirectory = useSelector(
    (state: RootState) => state.directory.directory
  );

  const folders = localStorage.getItem("folders")
    ? JSON.parse(localStorage.getItem("folders") || "{}")
    : [];

  const nestedFolders = folders.filter(function (folder: any) {
    return (
      JSON.stringify(folder.directory) === JSON.stringify(currentDirectory)
    );
  });

  const handleAdd = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (page == 1) {
      if (localStorage.getItem(currentFolder)) {
        setFiles(JSON.parse(localStorage.getItem(currentFolder) || "{}"));
      } else {
        getPhotos(currentFolder).then((response) => {
          setFiles(response.results);
          localStorage.setItem(currentFolder, JSON.stringify(response.results));
        });
      }
    } else {
      setLoading("Loading...");
      getPhotos(currentFolder, page)
        .then((response) => {
          if (response.results == undefined) {
            setLoading("You're all caught up!!");
            return;
          }

          const updatedPhotos = files.concat(response.results);
          setFiles(updatedPhotos);

          setLoading("");
        })
        .catch((err) => console.log("Catch errror", err));
    }
  }, [page]);

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let selectedFolder;
    const myDebouncedFunction = debounce((query) => {
      selectedFolder = nestedFolders.filter((folder: any) => {
        if (query.length > 0)
          return folder.name.toLowerCase().includes(query.toLowerCase());
      });

      setFilteredFolders(selectedFolder);
    }, 3000);

    myDebouncedFunction(searchQuery);
  }, [searchQuery]);

  return (
    <div>
      {filteredFolders.length > 0 && (
        <div className="files-container">
          {filteredFolders?.map((folder: any, index: number) => {
            return (
              <div key={index}>
                <FolderCard folderName={folder.name} />
              </div>
            );
          })}
        </div>
      )}
      {filteredFolders.length === 0 && (
        <div className="files-container" onScroll={(e) => handleScroll(e)}>
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
            return (
              <div key={index} onClick={() => {}}>
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
          {loading.length > 0 && <div>{loading}</div>}
        </div>
      )}
    </div>
  );
}

export default Content;
