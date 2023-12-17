import * as React from "react";
import { getGistForkUrl } from "@/utils";
import { Avatar, Divider } from "antd";
import { Fork } from "@/types";

type ForksProps = {
  forks: Fork[];
};

const Forks: React.FC<ForksProps> = ({ forks }): JSX.Element => {
  return (
    <>
      <h3>Oldest Forks</h3>
      {forks.map((fork, index) => (
        <div key={index}>
          <div>
            <Avatar
              src={
                <img
                  src={fork.user.avatar_url}
                  alt={`${fork.user.login}'s avatar`}
                />
              }
            />

            {fork.user.login}
          </div>
          <div>
            <a
              href={getGistForkUrl(fork.user.login, fork.id)}
              target="_blank"
              rel="noopener noreferrer"
            >
              View Fork
            </a>
          </div>
          <div>
            <p>Created at: {new Date(fork.created_at).toLocaleString()}</p>
          </div>
          <Divider />
        </div>
      ))}
    </>
  );
};

export default Forks;
