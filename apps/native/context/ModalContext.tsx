import React, { createContext, useState, useContext } from "react";

type ModalContextType = {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
};

export const ModalContext = createContext<ModalContextType>({
  modalVisible: false,
  setModalVisible: () => {},
});

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ModalContext.Provider value={{ modalVisible, setModalVisible }}>
      {children}
    </ModalContext.Provider>
  );
};

// Optional helper hook
export const useModal = () => useContext(ModalContext);
