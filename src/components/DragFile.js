import { useState } from "react";
import { FileUploader } from "react-drag-drop-files";


const fileTypes = ["JPEG", "PNG", "GIF"];

const DragFile = () => {
  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };
  return (
    <div className="App">
      <FileUploader
        multiple={true}
        onChange={handleChange}
        name="file"
        types={fileTypes}
      />
      <p>{file ? `File name: ${file[0].name}` : "No files chosen"}</p>
    </div>
  );
}

export default DragFile