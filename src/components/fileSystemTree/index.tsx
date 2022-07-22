import React from "react";
import SystemTreeItem from "./SystemTreeItem";
import "./index.css";

function SystemTree() {
  return (
    <div className="menu-root">
      Root
      <div>
        <SystemTreeItem />
        <div className="children-item">
          <SystemTreeItem />
          <SystemTreeItem />
          <SystemTreeItem />
        </div>
      </div>
    </div>
  );
}

export default SystemTree;
