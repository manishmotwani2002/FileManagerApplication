import "./index.css";

const FileCard = ({ imageLink }: any) => {
  return (
    <div className="file-card">
      <img src={imageLink} alt="File Image" />
    </div>
  );
};

export default FileCard;
