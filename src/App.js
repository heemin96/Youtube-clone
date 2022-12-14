import { Outlet } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import styled, { ThemeProvider } from "styled-components";

import { YoutubeApiProvider } from "./context/YoutubeApiContext";
import { AppContext } from "./context/NavBarContext";
import SearchHeader from "./components/SearchHeader";
import { theme } from "./styles/theme";
import "./styles/global.css";

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <AppContext>
        <SearchHeader />
        <YoutubeApiProvider>
          <QueryClientProvider client={queryClient}>
            <Outlet />
          </QueryClientProvider>
        </YoutubeApiProvider>
      </AppContext>
    </ThemeProvider>
  );
}

const VideoContainer = styled.div``;

export default App;
