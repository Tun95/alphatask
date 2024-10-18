import { createContext, useReducer, useState } from "react";

// Define available anchors for the drawer
export type Anchor = "left" | "right";

// Define the state interface, combining loading/error and drawer state
interface State {
  loading: boolean;
  error: string;
  drawer: {
    left: boolean;
    right: boolean;
  };
}

// Define the action types, including both UI and drawer actions
interface Action {
  type: "DARK_MODE" | "LIGHT_MODE" | "TOGGLE_DRAWER";
  anchor?: Anchor;
  open?: boolean;
}

// Define the context props for state, dispatch, and toggleDrawer
export interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  toggleDrawer: (
    anchor: Anchor,
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context with default value
export const Context = createContext<ContextProps | undefined>(undefined);

// INITIAL STATE
const initialState: State = {
  loading: true,
  error: "",
  drawer: {
    left: false,
    right: false,
  },
};

// Define the reducer function
function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "DARK_MODE":
      return { ...state, loading: false };
    case "LIGHT_MODE":
      return { ...state, loading: false };
    case "TOGGLE_DRAWER":
      if (action.anchor) {
        return {
          ...state,
          drawer: { ...state.drawer, [action.anchor]: action.open || false },
        };
      }
      return state;
    default:
      return state;
  }
}

// Define the provider component to wrap around your app
interface ContextProviderProps {
  children: React.ReactNode;
}

export function ContextProvider({ children }: ContextProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const [collapsed, setCollapsed] = useState(false);
  // Function to handle drawer toggling
  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      dispatch({ type: "TOGGLE_DRAWER", anchor, open });
    };

  const value: ContextProps = {
    state,
    dispatch,
    toggleDrawer,
    collapsed,
    setCollapsed,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
