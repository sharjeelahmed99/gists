import { useState, useEffect, useMemo } from "react";
import * as React from "react";
import { Descriptions, Divider } from "antd";
import { getGistById } from "@/api";
import FilesBadge from "../badge/FilesBadge";
import { Fork } from "@/types";
import Forks from "../forks/Forks";
import Files from "../files/Files";

type Gist = {
  forks: Fork[];
  files: any;
};

const Details = ({ gistId }) => {
  const [gistDetails, setGistDetails] = useState<Gist>();

  const fetch = async () => {
    try {
      const response = await getGistById(gistId || "");
      setGistDetails(response.data);
    } catch (error) {
      console.error("Error on fetch gist details:", error);
    }
  };
  useEffect(() => {
    fetch();
  }, [gistId]);

  const { forks, files } = gistDetails || {};
  const oldestForks = useMemo(
    () =>
      [...(forks || [])]
        .sort(
          (a, b) =>
            new Date(a.created_at).valueOf() - new Date(b.created_at).valueOf()
        )
        .slice(0, 3),
    [forks]
  );

  return (
    <div>
      <h2>Gist Detail</h2>
      <Descriptions title="Gist Information">
        <Descriptions.Item label="Forks">{forks?.length}</Descriptions.Item>
        <Descriptions.Item label="Badge">
          <FilesBadge files={files}></FilesBadge>
        </Descriptions.Item>
      </Descriptions>
      <Divider />

      {files && <Files files={files} />}
      <Divider />

      {oldestForks?.length > 0 && <Forks forks={oldestForks} />}
    </div>
  );
};

export default Details;
