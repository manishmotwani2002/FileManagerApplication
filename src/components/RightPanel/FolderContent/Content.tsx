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
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  // const [showMenu, setShowMenu] = useState(false);

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

  // useEffect(() => {}, [currentFolder]);

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
      setLoading(true);
      getPhotos(currentFolder, page)
        .then((response) => {
          console.log("response results", response.results);
          // setFiles((prev) => [...prev, ...response.results]);

          const updatedPhotos = files.concat(response.results);
          console.log("updated photos", updatedPhotos);
          console.log(files);
          setFiles(updatedPhotos);
          console.log(files);

          console.log("page value", page);
          setLoading(false);
        })
        .catch((err) => console.log(err));

      console.log("page value", page);
    }

    // const loadPhotos = async () => {
    //   setLoading(true);
    //   getPhotos(currentFolder, page)
    //     .then((response) => {
    //       console.log("response results", response.results);
    //       // setFiles((prev) => [...prev, ...response.results]);
    //       console.log(files);
    //       console.log("page value", page);
    //       setLoading(false);
    //     })
    //     .catch((err) => console.log(err));

    //   console.log("page value", page);
    // };

    // loadPhotos();
  }, [page]);

  const handleScroll = (event: any) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    console.log(scrollTop, clientHeight, scrollHeight);

    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setPage((prev) => prev + 1);
    }
  };

  // console.log("files new", files);

  return (
    // <div>
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
          <div key={index}>
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
      {loading && <div>Loading...</div>}
    </div>
    // </div>
  );
}

export default Content;
