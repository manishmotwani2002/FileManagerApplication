import "./index.css";

import { Folder } from "../../../../types/folderTypes";

type Dispatch<A> = (value: A) => void;
type SetStateAction<S> = S | ((prevState: S) => S);

type Props = {
  selectedFolder: Folder;
  setShowInfo: Dispatch<SetStateAction<boolean>>;
};

const FolderInfo = ({ selectedFolder, setShowInfo }: Props) => {
  return (
    <div className="FolderInfo01GetInfoBackground ">
      <div className="FolderInfo02GetInfoModal">
        <div>
          <div className="">
            <svg
              xmlns="http://wwlw.w3.org/2000/svg"
              className="icon info-cross"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              onClick={() => {
                setShowInfo(false);
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="FolderInfo04DisplayStyle">
            <span>Folder Name:</span>
            <h3>{selectedFolder.name}</h3>
          </div>
          <div className="FolderInfo04DisplayStyle">
            <span>Folder Size:</span>
            <h3>{selectedFolder.size}</h3>
          </div>
          <div className="FolderInfo04DisplayStyle">
            <span>Folder Creator:</span>
            <h3>{selectedFolder.creator}</h3>
          </div>
          <div className="FolderInfo04DisplayStyle">
            <span>Folder Date:</span>
            <h3>{selectedFolder.date}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FolderInfo;
