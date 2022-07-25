import "./FolderCard.css";

export default function FolderCard({ folderName }: any) {
  return (
    <div>
      <div className="folder-wrapper">
        <div className="folder-icon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 "
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        </div>

        <div className="folder-name">{folderName}</div>
      </div>
    </div>
  );
}
