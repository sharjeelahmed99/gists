import * as React from "react";
import { File } from "@/types";
import FilesBadge from "../badge/FilesBadge";
import { humanReadableSize } from "@/utils";
type FilesProps = {
  files: any;
};

const Files: React.FC<FilesProps> = ({ files }): JSX.Element => {
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
