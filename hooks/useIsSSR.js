import React from "react";

const useIsSSR = () => {
  // to avoid hydration error
  const [isSSR, setIsSSR] = React.useState(true);
  React.useEffect(() => {
    setIsSSR(false);
  }, []);
  return isSSR;
};

export default useIsSSR;
