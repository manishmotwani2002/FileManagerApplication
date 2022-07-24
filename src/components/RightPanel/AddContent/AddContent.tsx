import { useState } from "react";
import "./addContent.css";
import type { RootState } from "../../../store/store";
import { useSelector, useDispatch } from "react-redux";
import { addFolder } from "../../../store/folderSlice";

function AddContent(props: any) {
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
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
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
        <div className="toggle_btn_wrapper">
          <button className="toggle_btn">File</button>
          <button className="toggle_btn">Folder</button>
        </div>
        <form className="create-form">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange("name")}
          />
          <input
            type="text"
            placeholder="Creator"
            onChange={handleChange("creator")}
          />
          <input
            type="text"
            placeholder="Size"
            onChange={handleChange("size")}
          />
          <input
            type="text"
            placeholder="Date(DD/MM/YYYY)"
            onChange={handleChange("date")}
          />
          <button onClick={(e) => handleSubmit(e)}>Create</button>
        </form>
      </div>
    </div>
  );
}

export default AddContent;
