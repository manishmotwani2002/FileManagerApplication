import "./index.css";

type Props = {
  imageLink: string;
};

const FileCard = ({ imageLink }: Props) => {
  return (
    <div className="FileCard01FileCard">
      <img src={imageLink} alt="File Image" />
    </div>
  );
};

export default FileCard;
