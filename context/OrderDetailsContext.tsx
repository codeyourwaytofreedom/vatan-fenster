import { initialSize } from '@/data/configuration_options';
import { Size } from '@/types/Configurator';
import { createContext, useState, ReactNode, useContext } from 'react';

// Define the context type
interface OrderDetailsContextType {
  size: Size | null;
  orderDetailsReady: boolean | undefined;
  setOrderDetailsReady: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setSize: React.Dispatch<React.SetStateAction<Size | null>>;
}

// Create the context with a default value
const OrderDetailsContext = createContext<OrderDetailsContextType | undefined>(undefined);

// Provider component
export const OrderDetailsProvider = ({ children }: { children: ReactNode }) => {
  const [orderDetailsReady, setOrderDetailsReady] = useState<boolean>();
  const [size, setSize] = useState<Size | null>(initialSize);

  return (
    <OrderDetailsContext.Provider
      value={{ size, orderDetailsReady, setSize, setOrderDetailsReady }}
    >
      {children}
    </OrderDetailsContext.Provider>
  );
};

// Custom hook to use the context
export const useOrderDetailsReady = () => {
  const context = useContext(OrderDetailsContext);
  if (!context) {
    throw new Error('useOrderDetails must be used within an OrderDetailsProvider');
  }
  return context;
};
