import { Pagination } from "@/types";
import axios from "axios";

export function getGistsByUsername(username: string, params: Pagination) {
  return axios.get(`https://api.github.com/users/${username}/gists`, {
    params,
  });
}

export function getGistById(id: string) {
  return axios.get(`https://api.github.com/gists/${id}`, {});
}
