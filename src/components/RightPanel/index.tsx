import { useState } from "react";
import Path from "./Path/Path";
import "./index.css";
import Content from "./FolderContent/Content";
import AddContent from "./AddContent/AddContent";

const RightPanel = ({ currentFolder, setCurrentFolder }: any) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleChange = (e: any) => {
    setSearchQuery(e.target.value);
  };

  const handleMenuDisplay = (folder: any) => {
    const sideMenu: any = document.querySelector("#menu");
    sideMenu.style.display = "block";
  };

  return (
    <div>
      <div className="header-container">
        <Path />
        <div className="search-container">
          <input
            className="input"
            type="text"
            placeholder="enter your query here!!"
            onChange={(e) => {
              handleChange(e);
            }}
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 search-icon"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
      </div>
      <Content
        currentFolder={currentFolder}
        setCurrentFolder={setCurrentFolder}
        searchQuery={searchQuery}
      />
    </div>
  );
};

export default RightPanel;
