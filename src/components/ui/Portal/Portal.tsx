import { PropsWithChildren } from "react";
import { createPortal } from "react-dom";
import './portal.css';

const Portal: React.FC<PropsWithChildren<object>> = ({ children }) => {
  const PortalRoot = document.getElementById("modal-root") as HTMLDivElement;

  return createPortal(children, PortalRoot);
};

export default Portal;
