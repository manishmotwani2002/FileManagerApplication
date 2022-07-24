import { useState, useEffect, useRef, useCallback } from "react";
import { getPhotos } from "../../../utils/folderPhotos";
import AddContent from "../AddContent/AddContent";
import FileCard from "../FilesAndFoldersCards/FileCard";
import "./content.css";
function Content({ currentFolder }: any) {
  const [modalOpen, setModalOpen] = useState(false);
  const [files, setFiles] = useState<any[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleAdd = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    getPhotos(currentFolder).then((response) => {
      setFiles(response.results);
    });
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
