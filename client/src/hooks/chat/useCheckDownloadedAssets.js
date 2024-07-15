import { useState } from "react";

const useCheckDownloadedAssets = () => {
  const [downloadedAssets, setDownloadedAssets] = useState(
    JSON.parse(localStorage.getItem("downloadedAssetsIds")) || []
  );

  const setFileToDownloadedList = (id) => {
    setDownloadedAssets((prev) => [...prev, id]);
    localStorage.setItem(
      "downloadedAssetsIds",
      JSON.stringify([...downloadedAssets, id])
    );
  };

  return { downloadedAssets, setFileToDownloadedList };
};

export { useCheckDownloadedAssets };
