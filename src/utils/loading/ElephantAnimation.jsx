import Lottie from "lottie-react";
import elephant from "./elephant-loader.json";

export default function ElephantAnimation() {
  return (
    <div className="flex items-center justify-center w-full h-full">
      <Lottie 
        animationData={elephant} 
        loop={true} 
        style={{ width: 200, height: 200 }}
        className="max-w-xs max-h-xs"
      />
    </div>
  );
}
