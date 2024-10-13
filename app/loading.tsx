import { LoaderIcon } from "lucide-react";
import React from "react";

const loading = () => {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center gap-2 text-white">
      <LoaderIcon
        size={48}
        className="animate-spin duration-1000 repeat-infinite"
      />
      <p className="text-gap-100 text-lg">Loading</p>
    </div>
  );
};

export default loading;
