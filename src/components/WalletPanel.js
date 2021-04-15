import React, { useState, useEffect } from "react";
import MobileWalletContainer from "./MobileWalletContainer";
import DesktopWalletContainer from "./DesktopWalletContainer";

const WalletPanel = (props) => {
  const { showWallet } = props;

  const [width, setWidth] = useState(window.innerWidth);

  const handleWindowResize = () => setWidth(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => window.removeEventListener("resize", handleWindowResize);
  }, []);

  return (
    <>
      {width < 750 && <MobileWalletContainer showWallet={showWallet} />}
      {width >= 750 && <DesktopWalletContainer showWallet={showWallet} />}
    </>
  );
};

export default WalletPanel;
