import { Files } from "@/types";
import { getLanguages } from "@/utils";
import { Badge } from "antd";
import { useMemo } from "react";
import * as React from "react";
type FilesBadgeProps = {
  files: Files;
};

const FilesBadge: React.FC<FilesBadgeProps> = ({ files }): JSX.Element => {
  const languages = useMemo(() => getLanguages(files), [files]);
  return (
    <>
      {languages.map((language) => (
        <Badge
          key={language}
          count={language}
          style={{ backgroundColor: "#52c41a", margin: "0 5px" }}
        />
      ))}
    </>
  );
};

export default FilesBadge;
