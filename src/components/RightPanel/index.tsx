import React from "react";
import Path from "./Path/Path";
import "./index.css";
import Content from "./FolderContent/Content";
import AddContent from "./AddContent/AddContent";

function RightPanel() {
  return (
    <div>
      <div className="header">
        <div>
          <Path />
        </div>
        <div>
          <input type="text" placeholder="enter your query here!!" />
        </div>
      </div>
      <div>
        <Content />
      </div>
      <div>{/* <AddContent /> */}</div>
    </div>
  );
}

export default RightPanel;
