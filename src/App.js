import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material';
import Settings from './pages/Settings/Settings';
import AuthValidate from './components/Auth/AuthValidate';
import SettingSideBar from './pages/Settings/Sidebar';
import TeamMembers from './pages/Settings/TeamMembers';
import ContactEmails from './pages/Settings/ContactEmails';
import SecuritySettings from './pages/Settings/Security';
import BalanceSetting from './pages/Settings/Balance';
import DeveloperSetting from './pages/Settings/Developer';
import AccountNav from './components/Settings/AccountNav';
import AccountSetupNav from './components/Settings/AccountSetupNav';
import AccountSettings from './pages/Settings/Agency/Account/Account';
import AgencySetupSetting from './pages/Settings/Agency/AgencySetup.js.js';
import MarkupSetting from './pages/Settings/Agency/Markup';
import CommissionSettings from './pages/Settings/Agency/Commision';
import PointsSettings from './pages/Settings/Agency/Points';
// import 'dotenv/config'


// const rootElement = document.getElementById("root");


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
    // components: {
    //   MuiPopover: {
    //     defaultProps: {
    //       container: rootElement,
    //     },
    //   },
    //   MuiPopper: {
    //     defaultProps: {
    //       container: rootElement,
    //     },
    //   },
    // },
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
              <Route path='/' element={<AuthValidate />}>
                <Route path='/' element={<Navbar />}>
                  <Route index element={<Dashboard />} />
                </Route>
                <Route path='settings' element={<SettingSideBar />}>
                  <Route path='' element={<AccountNav />}>
                    <Route index element={<Settings />} />
                    <Route path='team' element={<TeamMembers />} />
                    <Route path='contact' element={<ContactEmails />} />
                    <Route path='security' element={<SecuritySettings />} />
                    <Route path='balance' element={<BalanceSetting />} />
                    <Route path='developer' element={<DeveloperSetting />} />
                  </Route>
                  <Route path='agency' element={<AccountSetupNav />}>
                    <Route index element={<AccountSettings />} />
                    <Route path='setup' element={<AgencySetupSetting />} />
                    <Route path='markup' element={<MarkupSetting />} />
                    <Route path='commission' element={<CommissionSettings />} />
                    <Route path='points' element={<PointsSettings />} />
                  </Route>
                </Route>
              </Route>
            </Routes>
          </SnackbarProvider>
        </CustomThemeProvider>
      </Provider>
    </Router>
  );
}

export default App;
