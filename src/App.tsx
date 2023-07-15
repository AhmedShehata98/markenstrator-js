// 3rd party libraries
import { BrowserRouter as Router } from "react-router-dom";

// helpers
import Routes from "./Router/Routes";

// themes
import "./index.css";
import useGetToken from "./Hooks/useGetToken";
import { useAppDispatch } from "./Redux/ReduxHooks";
import { SET_USER_AUTH_STATE } from "./Redux/Slice/AppSlice";

function App() {
  const dispatch = useAppDispatch();
  const { token } = useGetToken();
  if (token) {
    dispatch(SET_USER_AUTH_STATE(true));
  }
  // const showSidebarRef: React.MutableRefObject<null> = useRef(null);

  // function StoreThemeClass(className: string): void {
  //   window.localStorage.setItem("themeMode", className);
  // }
  // function getThemeClass(localStoreageThemeKey: string): string | null {
  //   return window.localStorage.getItem(localStoreageThemeKey);
  // }

  // const toggleThemeMode: React.MouseEventHandler<HTMLButtonElement> = (
  //   event
  // ): void => {
  //   const htmlElement = window.document.documentElement as HTMLHtmlElement;
  //   const button = event.target as HTMLElement;
  //   const icon = button.firstChild as HTMLElement;
  //   //
  //   if (htmlElement.classList.contains("dark")) {
  //     htmlElement.classList.remove("dark");
  //     htmlElement.classList.add("light");
  //   } else {
  //     htmlElement.classList.remove("light");
  //     htmlElement.classList.add("dark");
  //   }
  //   StoreThemeClass(htmlElement.className);
  //   if (icon.classList.contains("fi-sr-moon")) {
  //     icon.classList.remove("fi-sr-moon");
  //     icon.classList.add("fi-sr-sun");
  //   } else {
  //     icon.classList.remove("fi-sr-sun");
  //     icon.classList.add("fi-sr-moon");
  //   }
  // };

  // useLayoutEffect(() => {
  //   const htmlElement = window.document.documentElement as HTMLHtmlElement;
  //   const themeClass: string | null = getThemeClass("themeMode");

  //   if (Boolean(themeClass)) {
  //     htmlElement.classList.add(themeClass!);
  //   }
  // }, []);

  return (
    <Router>
      <Routes />
    </Router>
  );
}

export default App;
