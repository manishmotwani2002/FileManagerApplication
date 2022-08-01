import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import type { RootState } from "../../../store/store";
import { addFolder } from "../../../store/folderSlice";

import "./addContent.css";

const AddContent = (props: any) => {
  const { setOpenModal } = props;

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

  const handleChange = (key: string) => (e: any) => {
    setInputContent({ ...inputContent, [key]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(addFolder({ inputContent, currentDirectory }));
    setOpenModal(false);
  };

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="form-header">
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
        <div className="wrapper">
          <div className="toggle_btn_wrapper">
            <input
              type="radio"
              id="file"
              value="File"
              name="type"
              className="toggle_btn"
              onChange={handleChange("type")}
            />
            <label>File</label>
            <input
              type="radio"
              id="folder"
              value="Folder"
              name="type"
              autoFocus
              className="toggle_btn"
              onChange={handleChange("type")}
            />
            <label>Folder</label>
          </div>
        </div>
        <form className="create-form" onSubmit={(e: any) => handleSubmit(e)}>
          <input
            className="form-input"
            type="text"
            placeholder="Name"
            autoFocus
            required
            onChange={handleChange("name")}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Creator"
            onChange={handleChange("creator")}
          />
          <input
            className="form-input"
            type="text"
            placeholder="Size"
            onChange={handleChange("size")}
          />
          <input
            className="form-input"
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
