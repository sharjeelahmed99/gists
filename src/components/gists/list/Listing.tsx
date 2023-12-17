import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import * as React from "react";
import { Input } from "../../custom/input";
import { PAGINATION } from "@/constants";
import { useNavigate } from "react-router-dom";
import { getGistsByUsername } from "@/api";
import { Gist } from "@/types";
import FilesBadge from "../badge/FilesBadge";

export const Listing: React.FC = (): JSX.Element => {
  const [username, setUsername] = useState("");
  const [gists, setGists] = useState([]);
  const [totalGists, setTotalGists] = useState(0);
  const navigate = useNavigate();
  const perPage = PAGINATION.PAGE_SIZE;

  const fetch = async (page = 1) => {
    try {
      const response = await getGistsByUsername(username, {
        page,
        per_page: perPage,
      });

      const { data, headers } = response;

      // Update the total gists count from the link in header
      if (page === 1) {
        const totalCount =
          headers["link"] &&
          headers["link"].match(/page=(\d+)&per_page=\d+>; rel="last"/);
        setTotalGists(
          totalCount ? parseInt(totalCount[1], 10) * perPage : data.length,
        );
      }

      setGists(data);
    } catch (error) {
      // Todo: Implement axios interceptors
      console.error("Error fetching gists:", error);
      setGists([]);
      setTotalGists(0);
    }
  };

  useEffect(() => {
    // Todo: Add a delay with timer on user input to save unnecessary api calls
    if (username) {
      fetch();
    }
  }, [username]);

  const handlePagination = (pagination) => {
    const { current } = pagination;
    fetch(current);
  };
  const handleRowClick = (gist) => {
    return {
      onClick: () => navigate(`/gists/${gist.id}`),
    };
  };

  const gistSource = useMemo(
    () =>
      gists.map((gist: Gist) => {
        const hasFiles: boolean =
          gist.files && Object.keys(gist.files).length > 0;
        const fileCount = Object.keys(gist.files || {}).length;

        return {
          id: gist.id,
          description: gist.description,
          fileCount: fileCount,
          filename: hasFiles
            ? gist.files[Object.keys(gist.files)[0]].filename
            : "",
          files: gist.files,
        };
      }),
    [gists],
  );

  const columns = [
    {
      title: "File Name",
      dataIndex: "filename",
      key: "filename",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Files Count",
      dataIndex: "fileCount",
      key: "fileCount",
    },
    {
      title: "Badge",
      dataIndex: "files",
      key: "files",
      render: (files: any) => {
        return <FilesBadge files={files}></FilesBadge>;
      },
    },
  ];

  return (
    <section>
      <h1>Welcome on Gists Finder!</h1>
      <div>
        <label>Search by user</label>
        <Input
          value={username}
          type="text"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <p>Total gists: {totalGists}</p>
      <Table
        dataSource={gistSource}
        columns={columns}
        rowKey={"id"}
        pagination={{ pageSize: perPage, total: totalGists }}
        onChange={handlePagination}
        onRow={handleRowClick}
      />
    </section>
  );
};
