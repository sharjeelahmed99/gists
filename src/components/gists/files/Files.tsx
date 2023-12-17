import * as React from "react";
import { File } from "@/types";
import FilesBadge from "../badge/FilesBadge";
import { humanReadableSize } from "@/utils";

const Files: React.FC<any> = (props): JSX.Element => {
  const { files } = props;
  return (
    <>
      <h3>Files</h3>
      {Object.values(files).map((file: File) => (
        <div key={file.filename}>
          <div>
            <strong>Name:</strong> {file.filename}
          </div>
          <div>
            <strong>Badge:</strong>
            <FilesBadge files={{ file }}></FilesBadge>
          </div>
          <div>
            <strong>Size:</strong> {humanReadableSize(file.size)}
          </div>
        </div>
      ))}
    </>
  );
};

export default Files;
