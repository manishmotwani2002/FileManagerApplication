import React from "react";
import Path from "./Path/Path";
import "./index.css";
import Content from "./FolderContent/Content";
import AddContent from "./AddContent/AddContent";

function RightPanel({ currentFolder }: any) {
  return (
    <div>
      <div className="header-container">
        <div>
          <Path />
        </div>
        <div>
          <input
            className="input"
            type="text"
            placeholder="enter your query here!!"
          />
        </div>
      </div>
      <div>
        <Content currentFolder={currentFolder} />
      </div>
      <div>{/* <AddContent /> */}</div>
    </div>
  );
}

export default RightPanel;
