import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../store/store";
import { addFolder } from "../../../store/folderSlice";

import { Folder } from "../../../types/folderTypes";

import "./index.css";

type Props = {
  setFolders: (active: Folder) => void;
  setOpenModal: (active: boolean) => void;
};

const AddContent = ({ setOpenModal, setFolders }: Props) => {
  const count = useSelector((state: RootState) => state.folders);
  const currentDirectory = useSelector(
    (state: RootState) => state.directory.directory
  );
  const dispatch = useDispatch();

  const [inputContent, setInputContent] = useState({
    name: "",
    creator: "",
    size: "",
    date: "",
    type: "Folder",
    directory: currentDirectory,
  });

  const handleChange =
    (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputContent({ ...inputContent, [key]: e.target.value });
    };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(addFolder({ inputContent, currentDirectory }));
    setOpenModal(false);
    setFolders(
      localStorage.getItem("folders")
        ? JSON.parse(localStorage.getItem("folders") || "{}")
        : []
    );
  };

  return (
    <div className="AddContent01ModalBackground">
      <div className="AddContent02ModalContainer">
        <div className="AddContent03FormHeader">
          <div className="heading">Create New</div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon cross"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="AddContent04Wrapper">
          <div className="AddContent05ToggleBtnWrapper">
            <input
              type="radio"
              id="file"
              value="File"
              name="type"
              className="AddContent06ToggleBtn"
              onChange={handleChange("type")}
            />
            <label>File</label>
            <input
              type="radio"
              id="folder"
              value="Folder"
              name="type"
              autoFocus
              className="AddContent06ToggleBtn"
              onChange={handleChange("type")}
              checked
            />
            <label>Folder</label>
          </div>
        </div>
        <form
          className="AddContent07CreateForm"
          onSubmit={(e) => handleSubmit(e)}
        >
          <input
            className="AddContent08FormInput"
            type="text"
            placeholder="Name"
            autoFocus
            required
            onChange={handleChange("name")}
          />
          <input
            className="AddContent08FormInput"
            type="text"
            placeholder="Creator"
            onChange={handleChange("creator")}
          />
          <input
            className="AddContent08FormInput"
            type="text"
            placeholder="Size"
            onChange={handleChange("size")}
          />
          <input
            className="AddContent08FormInput"
            type="date"
            placeholder="Date(DD/MM/YYYY)"
            onChange={handleChange("date")}
          />
          <input type="submit" className="button-main" />
        </form>
      </div>
    </div>
  );
};

export default AddContent;
