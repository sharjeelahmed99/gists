import Detail from "@/components/gists/details/Details";
import React from "react";
import { useParams } from "react-router-dom";

const GistDetails: React.FC = (): JSX.Element => {
  const { gistId } = useParams();

  return <Detail gistId={gistId} />;
};

export default GistDetails;
