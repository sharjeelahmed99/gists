import { File, Files } from "@/types";

export const getLanguages = (files?: Files) => {
  const languages = files
    ? Object.values(files).map(
        (file: File) =>
          file.language || file.type || file.filename.split(".")[0],
      )
    : [];
  return [...new Set(languages)];
};

export const getGistForkUrl = (username, forkId) => {
  return `https://gist.github.com/${username}/${forkId}`;
};
