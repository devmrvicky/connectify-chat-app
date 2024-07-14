import { useEffect, useState } from "react";

const useCheckDownloadedAssets = () => {
  const [downloadedAssets, setDownloadedAssets] = useState(
    JSON.parse(localStorage.getItem("downloadedAssetsIds")) || []
  );

  return { downloadedAssets };
};

export { useCheckDownloadedAssets };
