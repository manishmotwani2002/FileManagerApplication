import React from "react";
import "./index.css";

const SystemTreeItem = ({ name = "New Folder" }) => {
  return (
    <div>
      <div className="tree-item" onClick={() => {}}>
        <div>{name}</div>
      </div>
    </div>
  );
};

export default SystemTreeItem;
