export interface File {
  filename: string;
  type: string;
  language: string;
  size: number;
}
export interface Files {
  [key: string]: File;
}
export interface Gist {
  id: string;
  files: Files;
  created_at: Date;
  updated_at: Date;
  description: string;
}

export interface Fork {
  url: string;
  user: User;
  id: string;
  created_at: Date;
  updated_at: Date;
}

export interface User {
  login: string;
  avatar_url: string;
}
