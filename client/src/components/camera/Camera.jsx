import { VscLoading } from "react-icons/vsc";
import { forwardRef, useEffect } from "react";

const Camera = forwardRef(({ isCameraOpening, mediaStream, ...props }, ref) => {
  useEffect(() => {
    if (!ref.current) return;
    ref.current.srcObject = mediaStream;
  }, [mediaStream]);
  return (
    <div className="w-full h-full">
      {isCameraOpening ? (
        <div className="w-full h-full flex items-center justify-center">
          <VscLoading className="animate-spin w-10 h-10" />
        </div>
      ) : (
        <div className="w-full h-full">
          <video ref={ref} {...props} className="w-full h-full object-cover" />
        </div>
      )}
    </div>
  );
});

export default Camera;
