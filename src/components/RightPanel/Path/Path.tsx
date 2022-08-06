import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../store/store";
import { removeDirectory } from "../../../store/directorySlice";

import "./path.css";

const Path = () => {
  const currentDirectory = useSelector(
    (state: RootState) => state.directory.directory
  );

  const dispatch = useDispatch();

  const deleteDirectories = () => {
    dispatch(removeDirectory(currentDirectory));
  };
  const handleMenuDisplay = () => {
    const sideMenu = document.querySelector<HTMLInputElement>("#menu");
    if (sideMenu !== null) sideMenu.style.display = "block";
  };

  return (
    <div className="Path01PathContainer">
      <div id="hamburger-icon" onClick={handleMenuDisplay}>
        <div className="bar1"></div>
        <div className="bar2"></div>
        <div className="bar3"></div>
      </div>

      <div className="Path02Icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className=" "
          viewBox="0 0 20 20"
          fill="currentColor"
          onClick={() => {
            deleteDirectories();
          }}
        >
          <path
            fill-rule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
            clip-rule="evenodd"
          />
        </svg>
      </div>

      <div className="complete-path">
        {currentDirectory?.map((directory, index) => {
          if (index == currentDirectory.length - 1)
            return <span>{directory}</span>;
          else return <span>{directory}/</span>;
        })}
      </div>
    </div>
  );
};

export default Path;
