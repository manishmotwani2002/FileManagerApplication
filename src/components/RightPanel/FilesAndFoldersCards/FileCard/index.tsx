import "./index.css";

type Props = {
  imageLink: string;
};

const FileCard = ({ imageLink }: Props) => {
  return (
    <div className="file-card">
      <img src={imageLink} alt="File Image" />
    </div>
  );
};

export default FileCard;
