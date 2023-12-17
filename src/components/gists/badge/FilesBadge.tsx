import { getLanguages } from "@/utils";
import { Badge } from "antd";
import { useMemo } from "react";
import * as React from "react";

const FilesBadge: React.FC<any> = (props): JSX.Element => {
  const { files } = props;
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
