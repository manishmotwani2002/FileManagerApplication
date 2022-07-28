import React from "react";
import "./FolderInfo.css";

function FolderInfo(props: any) {
  const { selectedFolder, setShowInfo } = props;

  return (
    <div className="getInfoBackground ">
      <div className="getInfoModal">
        <div>
          <div className="info-cross">
            <svg
              xmlns="http://wwlw.w3.org/2000/svg"
              className="icon info-cross"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              stroke-width="2"
              onClick={() => {
                setShowInfo();
              }}
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <div className="displayStyle">
            <span>Folder Name:</span>
            <h3>{selectedFolder.name}</h3>
          </div>
          <div className="displayStyle">
            <span>Folder Size:</span>
            <h3>{selectedFolder.size}</h3>
          </div>
          <div className="displayStyle">
            <span>Folder Creator:</span>
            <h3>{selectedFolder.creator}</h3>
          </div>
          <div className="displayStyle">
            <span>Folder Date:</span>
            <h3>{selectedFolder.date}</h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FolderInfo;
