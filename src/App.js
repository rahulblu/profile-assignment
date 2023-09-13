import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_ALL_PROFILES } from "./apollo/queries";
import AllProfiles from "./pages/AllProfiles";
import { useState } from "react";
import Header from "./components/Header";
import { ThemeProvider } from '@mui/material/styles'; // Import ThemeProvider
import { lightTheme, darkTheme } from './styles/themes'; 
import Paper from '@mui/material/Paper';

function App() {
  const [darkMode, setDarkMode] = useState(true);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <ThemeProvider theme={theme}>
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <Paper elevation={3} style={{ padding: '16px', minHeight: '90vh' , borderRadius: 0}}>
      <AllProfiles />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
