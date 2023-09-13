import { createTheme } from "@mui/material/styles";

export const lightTheme = createTheme({
  palette: {
    // primary: {
    //   main: '#ffffff',
    // },
    secondary: {
      main: "#000000", // Replace with your desired secondary color
    },
    header:{
      main: "#ffffff", // Replace with your desired secondary color
    },
    mode: "light",
  },
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          color: "blue",
        },
      },
    },
  },
});

export const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    secondary:{
      main: "#fff",

    },
    header:{
      main: "#696969", // Replace with your desired secondary color
    },
    mode: "dark",
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          "& .MuiSvgIcon-root": {
            fill: "#A9A9A9", 
          },
          "&:hover .MuiSvgIcon-root": {
            fill: "#ffffff", 
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // Some CSS
          color: "#A9A9A9",
          borderColor: "#606060",
          "&:hover": {
            color: "#ffffff",
            borderColor: "#ffffff", 
          },
        },
      },
    },
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          color: "white",
        },
      },
    },
    // MuiInputLabel: {
    //   styleOverrides: {
    //     root: {
    //       // Change the label color here
    //       color: 'red', // Change 'red' to your desired label color
    //     },
    //   },
    // },
  },
  overrides: {
    MuiDataGrid: {
      root: {
        "& .MuiDataGrid-cell": {
          border: "none", // Remove cell borders
        },
      },
    },
  },
});
