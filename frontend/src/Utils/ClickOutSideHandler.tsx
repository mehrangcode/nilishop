import { useEffect } from "react";

const useOutsideClick = (nodeElement:any, callback:any) => {
  const handleClick = (e: any) => {
      console.log(e.target)
    if (nodeElement && !nodeElement.current.contains(e.target)) {
            callback();
    }
  };
  
useEffect(() => {
    document.addEventListener("click", handleClick, false);
    return () => {
      document.removeEventListener("click", handleClick, false);
    };
  });
};

export default useOutsideClick;