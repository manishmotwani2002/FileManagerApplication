import { useState } from "react";
import AddContent from "../AddContent/AddContent";
import "./content.css";
function Content() {
  const [popUp, setPopUp] = useState(false);

  const handleAdd = () => {
    console.log(popUp);
    setPopUp(true);
    console.log(popUp);

    // const duringPopUp = popUp ? " during-popup" : "";
  };

  return (
    <div>
      <div
        className="add-item "
        onClick={() => {
          handleAdd();
        }}
      >
        <div className="folder-item">+</div>
      </div>
      {popUp && <AddContent setPopUp={setPopUp} />}
    </div>
  );
}

export default Content;
