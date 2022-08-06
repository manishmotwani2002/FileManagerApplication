import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import AddContent from "../AddContent";
import FileCard from "../FilesAndFoldersCards/FileCard";
import FolderCard from "../FilesAndFoldersCards/FolderCard";
import FolderInfo from "../FilesAndFoldersCards/FolderInfo";
import NotFound from "../../../assets/notFound.webp";

import type { RootState } from "../../../store/store";
import { deleteFolder } from "../../../store/folderSlice";
import { addDirectory } from "../../../store/directorySlice";

import { getPhotos } from "../../../utils/folderPhotos";
import { debounce } from "../../../utils/debounce";

import { Folder } from "../../../types/folderTypes";

import "./index.css";

type Props = {
  currentFolder: Folder;
  setCurrentFolder: (active: Folder) => void;
  searchQuery: string;
};

const Content = ({ currentFolder, setCurrentFolder, searchQuery }: Props) => {
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
  const [search, setSearch] = useState(false);

  const [folders, setFolders] = useState(
    localStorage.getItem("folders")
      ? JSON.parse(localStorage.getItem("folders") || "{}")
      : []
  );
  const [filteredFolders, setFilteredFolders] = useState([]);
  const [folderInfo, setFolderInfo] = useState({
    type: "Folder",
    name: "root",
    date: "01/01/2002",
    creator: "Manish",
    size: "100",
    directory: ["root"],
    folderId: 100,
  });
  const [showInfo, setShowInfo] = useState(false);

  const currentDirectory = useSelector(
    (state: RootState) => state.directory.directory
  );
  const dispatch = useDispatch();

  const nestedFolders = folders.filter(function (folder: Folder) {
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

  const handleScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;

    if (scrollHeight - scrollTop <= clientHeight + 10) {
      setPage((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let selectedFolder;
    const myDebouncedFunction = debounce((query) => {
      selectedFolder = nestedFolders.filter((folder: Folder) => {
        if (query.length > 0)
          return folder.name.toLowerCase().includes(query.toLowerCase());
      });

      setFilteredFolders(selectedFolder);
    }, 1000);

    if (searchQuery.length > 0) setSearch(true);
    if (searchQuery.length == 0) setSearch(false);

    myDebouncedFunction(searchQuery);
  }, [searchQuery]);

  const handleDelete = (folder: Folder) => {
    //call the reducer
    dispatch(deleteFolder(folder));
    setFolders(
      localStorage.getItem("folders")
        ? JSON.parse(localStorage.getItem("folders") || "{}")
        : []
    );
  };

  const handleDirectory = (folder: Folder) => {
    //value.payload.request
    dispatch(addDirectory({ folder: folder }));
  };

  const handleClose = () => {
    const concernedElement =
      document.querySelector<HTMLInputElement>(".image-container");

    document.addEventListener("mousedown", ({ target }: MouseEvent): void => {
      if (
        concernedElement !== null &&
        concernedElement.contains(target as HTMLInputElement)
      ) {
        //clicked inside
      } else {
        setFileModal("");
        //clicked outside
      }
    });
    return <div></div>;
  };

  const handleInfo = (selectedFolder: Folder) => {
    setFolderInfo(selectedFolder);
    setShowInfo(true);
  };

  return (
    <div>
      {filteredFolders.length > 0 && (
        <div className="Content01FilesContainer">
          {filteredFolders?.map((folder: Folder, index: number) => {
            const { name, type } = folder;
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
                <FolderCard folderName={name} folderType={type} />
                {menuOpen.isOpen && index === menuOpen.key && (
                  <div className="Content02OptionsDiv" key={index}>
                    <div
                      className="Content03Options"
                      onClick={() => {
                        handleDirectory(folder);
                        setCurrentFolder(folder);
                      }}
                    >
                      Open
                    </div>
                    <div
                      className="Content03Options"
                      onClick={() => {
                        handleInfo(folder);
                      }}
                    >
                      Get Info
                    </div>
                    <div
                      className="Content03Options Content04Delete"
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
      {filteredFolders.length == 0 && search && (
        <div className="Content05ImgWrapper">
          <img src={NotFound} alt="" className="Content06NotFoundImg" />
        </div>
      )}
      {filteredFolders.length === 0 && !search && (
        <div
          className="Content01FilesContainer"
          onScroll={(e) => handleScroll(e)}
        >
          {modalOpen && (
            <AddContent setFolders={setFolders} setOpenModal={setModalOpen} />
          )}

          <div
            className="Content07AddItem Content08FolderItem"
            onClick={() => {
              handleAdd();
            }}
          >
            +
          </div>

          {nestedFolders.map((folder: Folder, index: number) => {
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
                  <div className="Content02OptionsDiv" key={index}>
                    <div
                      className="Content03Options"
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
                      className="Content03Options"
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
                      className="Content03Options Content04Delete"
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

          {showInfo && (
            <FolderInfo selectedFolder={folderInfo} setShowInfo={setShowInfo} />
          )}

          {currentFolder.type === "File" && fileModal.length > 0 && (
            <div className="Content09ModalBackground">
              <img
                src={fileModal}
                alt="Photo in Dialog"
                className="Content10ImgContainer"
              />
              <div>{handleClose()}</div>
            </div>
          )}

          {currentFolder.type === "File" &&
            files?.map((file, index) => {
              return (
                <div
                  className="Content08FolderItem"
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
            <div className="Content11Loader"></div>
          )}
        </div>
      )}
    </div>
  );
};

export default Content;
