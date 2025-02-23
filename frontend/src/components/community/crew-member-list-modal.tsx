import React from "react";
import { Text } from "@chakra-ui/react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CrewMemeberListModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const overlayStyle: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0, 0, 0, 0.3)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  };

  const contentStyle: React.CSSProperties = {
    backgroundColor: "white",
    padding: "30px",
    borderRadius: "30px",
    textAlign: "center",
    width: "450px",
    maxWidth: "800px",
    height: "600px",
    maxHeight: "1200px",
    position: "relative",
  };

  const closeButtonStyle: React.CSSProperties = {
    position: "absolute",
    top: "30px",
    right: "30px",
    background: "none",
    border: "none",
    color: "black",
    fontSize: "24px",
    cursor: "pointer",
  };

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={contentStyle} onClick={(e) => e.stopPropagation()}>
        <button style={closeButtonStyle} onClick={onClose}>
          X
        </button>
        <Text color="black">크루원</Text>
      </div>
    </div>
  );
};

export default CrewMemeberListModal;
