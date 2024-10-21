import { createContext, useEffect, useReducer, useState } from "react";

// Define available anchors for the drawer
export type Anchor = "left" | "right";

// Define the state interface
interface State {
  loading: boolean;
  error: string;
  theme: "light" | "dark"; // Add theme state
  drawer: {
    left: boolean;
    right: boolean;
  };
}

// Define the action types, including theme and drawer actions
interface Action {
  type: "TOGGLE_THEME" | "SET_THEME" | "TOGGLE_DRAWER";
  anchor?: Anchor;
  open?: boolean;
  theme?: "light" | "dark"; // Add theme for SET_THEME action
}

// Define the context props for state, dispatch, and toggleDrawer
export interface ContextProps {
  state: State;
  dispatch: React.Dispatch<Action>;
  toggleDrawer: (anchor: Anchor, open: boolean) => void;
  collapsed: boolean;
  setCollapsed: React.Dispatch<React.SetStateAction<boolean>>;

  // Add the currentModal, handleOpenModal, and handleCloseModal properties
  currentModal: "event" | "login" | null;
  handleOpenModal: (modal: "event" | "login") => void;
  handleCloseModal: () => void;

  // Use a single function to toggle between light and dark modes
  toggleTheme: () => void;
}

// Create the context with a default value
export const Context = createContext<ContextProps | undefined>(undefined);

// INITIAL STATE
const initialState: State = {
  loading: true,
  error: "",
  theme: "light", // Default to light theme
  drawer: {
    left: false,
    right: false,
  },
};

// Define the reducer function
function reducer(state: State, action: Action): State {
  const newTheme = state.theme === "light" ? "dark" : "light";
  switch (action.type) {
    case "TOGGLE_THEME":
      localStorage.setItem("theme", newTheme);
      return {
        ...state,
        theme: newTheme,
      };

    case "SET_THEME":
      return {
        ...state,
        theme: action.theme ?? "light", // Fallback to "light"
      };

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

  // Load theme from localStorage on initial load
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) {
      dispatch({ type: "SET_THEME", theme: savedTheme });
    }
  }, []);

  // Effect to manage global theme styles
  useEffect(() => {
    const root = document.documentElement;

    // Apply theme by toggling 'dark' class on the root element
    if (state.theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [state.theme]);

  // Function to handle drawer toggling
  const toggleDrawer = (anchor: Anchor, open: boolean) => {
    dispatch({ type: "TOGGLE_DRAWER", anchor, open });
  };

  // Single function to toggle between light and dark modes
  const toggleTheme = () => {
    dispatch({ type: "TOGGLE_THEME" });
  };

  // Handle screen resize
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

  // Modal state and logic (as per your original setup)
  const [currentModal, setCurrentModal] = useState<"event" | "login" | null>(
    null
  );

  const handleOpenModal = (modal: "event" | "login") => {
    if (state.drawer.left || state.drawer.right) {
      toggleDrawer("left", false);
      toggleDrawer("right", false);
    }
    setCurrentModal(modal);
  };

  const handleCloseModal = () => {
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
    toggleTheme,
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
