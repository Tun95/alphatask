import { createContext, useEffect, useReducer, useState } from "react";

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
  toggleDrawer: (anchor: Anchor, open: boolean) => void; // Modified to simplify usage
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

  // Add the currentModal, handleOpenModal, and handleCloseModal properties
  currentModal: "event" | "login" | null;
  handleOpenModal: (modal: "event" | "login") => void;
  handleCloseModal: () => void;
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
  const toggleDrawer = (anchor: Anchor, open: boolean) => {
    dispatch({ type: "TOGGLE_DRAWER", anchor, open });
  };

  // Effect to manage the collapsed state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 900) {
        setCollapsed(false);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // MUI MODALS
  // MODAL TOGGLE
  const [currentModal, setCurrentModal] = useState<
    "event" | "login" | null
  >(null);

  const handleOpenModal = (modal: "event" | "login") => {
    // Close any open drawers when opening a modal
    if (state.drawer.left || state.drawer.right) {
      toggleDrawer("left", false); // Adjust based on which drawer you want to close
      toggleDrawer("right", false);
    }
    setCurrentModal(modal);
  };

  const handleCloseModal = () => {
    console.log("Closing modal"); // For debugging
    setCurrentModal(null);
  };

  const value: ContextProps = {
    state,
    dispatch,
    toggleDrawer,
    collapsed,
    setCollapsed,

    currentModal,
    handleOpenModal,
    handleCloseModal,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
