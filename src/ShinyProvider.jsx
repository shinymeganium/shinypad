import { createContext, useContext, useReducer } from "react";
import { shinyReducer } from "./ShinyReducer";

const ShinyStateContext = createContext(null);
const ShinyDispatchContext = createContext(null);

export const initialState = {
  currentHunt: null,
  targets: [],
  caught: [],
  loading: false
};

export const ShinyProvider = ({ children }) => {
  const [state, dispatch] = useReducer(shinyReducer, initialState);

  return  (
    <ShinyStateContext.Provider value={state}>
      <ShinyDispatchContext.Provider value={dispatch}>
        {children}
      </ShinyDispatchContext.Provider>
    </ShinyStateContext.Provider>
  )
};

export const useShinyState = () => useContext(ShinyStateContext);
export const useShinyDispatch = () => useContext(ShinyDispatchContext);