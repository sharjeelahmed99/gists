import React from "react";
import { Route, Routes } from "react-router-dom";

import NotFound from "./pages/NotFound";
import GistList from "./pages/gists/GistList";
import GistDetails from "./pages/gists/GistDetails";

export default (
  <Routes>
    <Route path="/" element={<GistList />} />
    <Route path="/gists/:gistId" element={<GistDetails />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
);
