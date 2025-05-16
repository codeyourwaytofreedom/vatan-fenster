// context/ModalContext.tsx
import React, { createContext, ReactNode, useContext, useState } from 'react';

interface ModalContextProps {
  isModalOpen: boolean;
  openModal: (content: React.ReactElement | undefined) => void;
  closeModal: ()=> void;
  content: React.ReactElement | undefined;
}

const ModalContext = createContext<ModalContextProps | undefined>(undefined);

export const ModalProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState<React.ReactElement | undefined>();

  const openModal = (node: React.ReactElement | undefined) => {
    setContent(node);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setContent(undefined);
  };

  return (
    <ModalContext.Provider value={{ isModalOpen, openModal, closeModal, content }}>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) throw new Error('useModal must be used within a ModalProvider');
  return context;
};
