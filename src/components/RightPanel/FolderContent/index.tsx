import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddContent from "../AddContent";
import FileCard from "../FilesAndFoldersCards/FileCard";
import FolderCard from "../FilesAndFoldersCards/FolderCard";
import FolderInfo from "../FilesAndFoldersCards/FolderInfo";

import type { RootState } from "../../../store/store";
import { deleteFolder } from "../../../store/folderSlice";
import { addDirectory } from "../../../store/directorySlice";

import { getPhotos } from "../../../utils/folderPhotos";
import { debounce } from "../../../utils/debounce";

import "./index.css";

const Content = ({ currentFolder, setCurrentFolder, searchQuery }: any) => {
  const File = "File";

  const [modalOpen, setModalOpen] = useState(false);
  const [fileModal, setFileModal] = useState("");
  const [files, setFiles] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState("Loading...");
  const [menuOpen, setMenuOpen] = useState({
    isOpen: false,
    key: 0,
  });

  const [filteredFolders, setFilteredFolders] = useState([]);
  const [folderInfo, setFolderInfo] = useState({});
  const [showInfo, setShowInfo] = useState(false);

  const currentDirectory = useSelector(
    (state: RootState) => state.directory.directory
  );
  const dispatch = useDispatch();

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
    if (currentFolder.type === File) {
      if (page == 1) {
        if (localStorage.getItem(currentFolder.name)) {
          setFiles(
            JSON.parse(localStorage.getItem(currentFolder.name) || "{}")
          );
        } else {
          getPhotos(currentFolder.name).then((response) => {
            setFiles(response.results);
            localStorage.setItem(
              currentFolder.name,
              JSON.stringify(response.results)
            );
          });
        }
      } else {
        setLoading("Loading...");
        getPhotos(currentFolder.name, page)
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
    }
  }, [page, currentFolder]);

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

  const handleDelete = (folder: any) => {
    //call the reducer
    dispatch(deleteFolder(folder));
  };

  const handleDirectory = (folder: any) => {
    //value.payload.request
    dispatch(addDirectory({ folder: folder }));
  };

  const handleClose = () => {
    const concernedElement: any = document.querySelector(".image-container");
    document.addEventListener("mousedown", (e: any) => {
      if (concernedElement.contains(e.target)) {
        //clicked inside
      } else {
        setFileModal("");
        //clicked outside
      }
    });
    return <div></div>;
  };

  const handleInfo = (selectedFolder: any) => {
    setFolderInfo(selectedFolder);
    setShowInfo(true);
  };

  return (
    <div>
      {filteredFolders.length > 0 && (
        <div className="files-container">
          {filteredFolders?.map((folder: any, index: number) => {
            return (
              <div
                key={index}
                onContextMenu={() => {
                  setMenuOpen({
                    ...menuOpen,
                    key: index,
                    isOpen: !menuOpen.isOpen,
                  });
                }}
              >
                <FolderCard folderName={folder.name} folderType={folder.type} />
                {menuOpen.isOpen && index === menuOpen.key && (
                  <div className="options-section" key={index}>
                    <div
                      className="options"
                      onClick={() => {
                        handleDirectory(folder);
                        setCurrentFolder(folder);
                      }}
                    >
                      Open
                    </div>
                    <div
                      className="options"
                      onClick={() => {
                        handleInfo(folder);
                      }}
                    >
                      Get Info
                    </div>
                    <div
                      className="options delete"
                      onClick={() => {
                        handleDelete(folder);
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
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
            let currentIndex = index;
            return (
              <div
                key={index}
                onDoubleClick={() => {
                  handleDirectory(folder);
                  setCurrentFolder(folder);
                }}
                onContextMenu={() => {
                  setMenuOpen({
                    ...menuOpen,
                    key: index,
                    isOpen: !menuOpen.isOpen,
                  });
                }}
              >
                <FolderCard folderName={folder.name} folderType={folder.type} />
                {menuOpen.isOpen && index === menuOpen.key && (
                  <div className="options-section" key={index}>
                    <div
                      className="options"
                      onClick={() => {
                        handleDirectory(folder);
                        setCurrentFolder(folder);
                        setMenuOpen({
                          ...menuOpen,
                          isOpen: !menuOpen.isOpen,
                        });
                      }}
                    >
                      Open
                    </div>
                    <div
                      className="options"
                      onClick={() => {
                        handleInfo(folder);
                        setMenuOpen({
                          ...menuOpen,
                          isOpen: !menuOpen.isOpen,
                        });
                      }}
                    >
                      Get Info
                    </div>
                    <div
                      className="options delete"
                      onClick={() => {
                        handleDelete(folder);
                        //   setMenuOpen({
                        //     ...menuOpen,
                        //     isOpen: !menuOpen.isOpen,
                        //   });
                      }}
                    >
                      Delete
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {showInfo && (
            <FolderInfo selectedFolder={folderInfo} setShowInfo={setShowInfo} />
          )}

          {currentFolder.type === "File" && fileModal.length > 0 && (
            <div className="modalBackground">
              <img
                src={fileModal}
                alt="Photo in Dialog"
                className="image-container"
              />
              <div>{handleClose()}</div>
            </div>
          )}

          {currentFolder.type === "File" &&
            files?.map((file, index) => {
              return (
                <div
                  className="folder-item"
                  key={index}
                  onClick={() => {
                    setFileModal(file.urls.full);
                  }}
                >
                  <FileCard imageLink={file.urls.small} />
                </div>
              );
            })}
          {currentFolder.type === "File" && loading.length > 0 && (
            <div className="loader"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
