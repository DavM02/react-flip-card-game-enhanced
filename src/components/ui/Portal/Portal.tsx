import React, { ReactNode } from "react";
import { createPortal } from "react-dom";
import './portal.css'

interface PortalProps {
  children: ReactNode;
}

  const Portal: React.FC<PortalProps> = ({ children }) => {

  const PortalRoot = document.getElementById("modal-root") as HTMLDivElement;

  return createPortal(children, PortalRoot);

};

export default Portal;
