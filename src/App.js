import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material';
// import 'dotenv/config'


const rootElement = document.getElementById("root");


const CustomThemeProvider = ({ children }) => {
  // const themeHook = useTheme();
  
  // Create a new theme object with the updated primary color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#1E61DC',
      },
      // secondary: {
      //   main: '#1E61DC',
      // },
      // primaryLight: {
      //   main: themeColor ? themeColor+'aa' : "#3a3"
      // }
    },
    components: {
      MuiPopover: {
        defaultProps: {
          container: rootElement,
        },
      },
      MuiPopper: {
        defaultProps: {
          container: rootElement,
        },
      },
    },
    });

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

function App() {
  return (
    <Router>
      <Provider store={store}>
        <CustomThemeProvider>
          <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top',horizontal: 'right'}} >
            <Routes>
              <Route path='/' element={<Navbar />}>
                <Route index element={<Dashboard />} />
              </Route>
            </Routes>
          </SnackbarProvider>
        </CustomThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
