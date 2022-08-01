import "./FolderCard.css";

const FolderCard = ({ folderName, folderType }: any) => {
  let icon;
  if (folderType === "File") {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z"
          clip-rule="evenodd"
        />
      </svg>
    );
  } else {
    icon = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 "
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
      </svg>
    );
  }
  return (
    <div className="folder-wrapper">
      <div className="folder-icon">{icon}</div>

      <div className="folder-name">{folderName}</div>
    </div>
  );
};

export default FolderCard;
