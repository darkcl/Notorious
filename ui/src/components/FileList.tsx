import * as React from "react";

declare var folder;

class FileList extends React.Component<{}, {}> {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <div>name:{folder.data.name || "==not read=="}</div>
        <div>
          files:
          {folder.data.files ? folder.data.files.count : "==not read=="}
        </div>
        <button onClick={() => console.log("click")}>Read file</button>
      </div>
    );
  }
}

export default FileList;
