import React, {
  createContext,
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

interface IStateContextType {
  activeMenu: boolean;
  setActiveMenu: Dispatch<SetStateAction<boolean>>;
  isClicked: IInitialState;
  setIsClicked: Dispatch<SetStateAction<IInitialState>>;
  handleClick: (clicked: string) => void;
  screenSize?: number;
  setScreenSize: Dispatch<SetStateAction<number | undefined>>;
}

interface IInitialState {
  chat: boolean;
  cart: boolean;
  userProfile: boolean;
  notification: boolean;
}

interface IContextProviderType {
  children: ReactNode;
}

const initialState = {
  chat: false,
  cart: false,
  userProfile: false,
  notification: false,
};

const StateContext = createContext<IStateContextType>({
  activeMenu: false,
  setActiveMenu: () => {},
  
  isClicked: initialState,
  setIsClicked: () => {},
  handleClick: () => {},
  
  screenSize: undefined,
  setScreenSize: () => {},
});

export const ContextProvider: FC<IContextProviderType> = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState<boolean>(true);
  const [isClicked, setIsClicked] = useState<IInitialState>(initialState);
  const [screenSize, setScreenSize] = useState<number | undefined>(undefined);

  const handleClick = (clicked: string) => {
    setIsClicked({ ...initialState, [clicked]: true });
  };

  return (
    <StateContext.Provider
      value={{
        activeMenu,
        setActiveMenu,
        isClicked,
        setIsClicked,
        handleClick,
        screenSize,
        setScreenSize,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
