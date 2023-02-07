import React, {
  createContext,
  FC,
  ReactNode,
  useContext,
  useState,
} from "react";

type IStateContextType  = {
  activeMenu: boolean;
}

const StateContext = createContext<IStateContextType | null>(null);

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

interface IContextProviderType {
  children: ReactNode;
}

export const ContextProvider: FC<IContextProviderType> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(true);

  return (
    <StateContext.Provider value={{ activeMenu: activeMenu }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
