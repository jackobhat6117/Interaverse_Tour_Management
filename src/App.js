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
import MarkupSetting from './pages/Settings/Order/Markup/Markup.js';
import CommissionSettings from './pages/Settings/Agency/Commision';
import PointsSettings from './pages/Settings/Agency/Points';
import PageNotFound from './pages/PageNotFound';
import PaymentSetting from './pages/Settings/Agency/Payment';
import Finance from './pages/Settings/Finance/Finance';
import FinanceContainer from './pages/Settings/Finance/FinanceContainer';
import Orders from './pages/Orders/Orders';
import UserManagement from './pages/UserManagement/UserManagement';
import Links from './pages/Links/Links';
import CreateFlightOrder from './pages/Orders/Flight/CreateFlightOrder';
import OffersList from './pages/Orders/Flight/FlightSearch/OffersList';
import FlightBook from './pages/Orders/Flight/Book/FlightBook';
import FlightBookDetails from './pages/Orders/Flight/Book/FlightBookDetails.js';
import FlightAncillaries from './pages/Orders/Flight/Book/FlightAncillaries.js';
import ProfileSurvey from './components/ProfileSurvey/New/ProfileSurvey.js';
import WelcomeNavbar from './components/WelcomeNavbar.js';
import LearnSupport from './pages/Welcome/LearnSupport.js';
import LearnPricing from './pages/Welcome/LearnPricing.js';
import LearnMiles from './pages/Welcome/LearnMiles/LearnMiles.js';
import ProfileStatusCheck from './components/ProfileSurvey/New/ProfileStatusCheck.js';
import Test from './pages/test.js';
import FlightPayment from './pages/Orders/Flight/Book/FlightPayment.js';
import FlightOrder from './pages/Orders/Flight/Booked/FlightOrder.js';
import OrderNav from './components/Settings/OrderNav.js';
import PayoutMethods from './pages/Settings/Finance/PayoutMethods.js';
import PaymentGateway from './pages/Settings/Agency/PaymentGateway.js';
import SupplierSettings from './pages/Settings/Order/Suppliers/Suppliers.js';
import PromoSettings from './pages/Settings/Order/PromoCodes/PromoCodes.js';
import EmailTemplateSettings from './pages/Settings/EmailTemplates/EmailTemplates.js';
import ChangeFlightOrder from './pages/Orders/Flight/Booked/ChangeOrder/ChangeOrder.js';
import CurrencySetting from './pages/Settings/Agency/Currency/CurrencySetting.js';
import FAQSetting from './pages/Settings/FAQ/FAQSetting.js';
// import 'dotenv/config'


// const rootElement = document.getElementById("root");


const CustomThemeProvider = ({ children }) => {
  // const themeHook = useTheme();
  
  // Create a new theme object with the updated primary color
  const theme = createTheme({
    palette: {
      primary: {
        main: '#0067FF',
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
          <SnackbarProvider autoHideDuration={3000} maxSnack={3} anchorOrigin={{vertical: 'top',horizontal: 'right'}} >
            <Routes>
              <Route path='/' element={<AuthValidate />}>
                <Route path='test' element={<Test />} />
                {/* <Route path='profile' element={<ProfileSurvey />} /> */}
                {/* <Route path='/welcome' element={<WelcomeNavbar />} >
                  <Route index element={<ProfileStatusCheck />} />
                  <Route path='support' element={<LearnSupport />} />
                  <Route path='pricing' element={<LearnPricing />} />
                  <Route path='learn' element={<LearnMiles />} />
                </Route> */}
                <Route path='/' element={<Navbar />}>
                  <Route index element={<Dashboard />} />
                  <Route path='order' element={<Orders />} />
                  <Route path='order/new/:order' element={<CreateFlightOrder />} />
                  <Route path='order/new/flight/offers' element={<OffersList />} />
                  <Route path='order/new/flight/book/:id' element={<FlightBook />} />
                  <Route path='order/new/flight/book/details/:id' element={<FlightBookDetails />} />
                  <Route path='order/new/flight/book/ancillaries/:id' element={<FlightAncillaries />} />
                  <Route path='order/new/flight/book/payment/:id' element={<FlightPayment />} />
                  <Route path='order/flight/:id' element={<FlightOrder />} />
                  <Route path='order/flight/change/:id' element={<ChangeFlightOrder />} />
                  <Route path='users' element={<UserManagement />} />
                  <Route path='link' element={<Links />} />
                  <Route path='*' element={<PageNotFound />} />
                </Route>
                <Route path='settings' element={<SettingSideBar />}>
                  <Route path='' element={<AccountNav />}>
                    <Route index element={<AccountSettings />} />
                    <Route path='team' element={<TeamMembers />} />
                    <Route path='security' element={<SecuritySettings />} />
                    <Route path='*' element={<PageNotFound />} />
                  </Route>
                  <Route path='agency' element={<AccountSetupNav />}>
                    <Route index element={<AgencySetupSetting />} />
                    <Route path='brand' element={<Settings />} />
                    <Route path='contact' element={<ContactEmails />} />
                    <Route path='developer' element={<DeveloperSetting />} />
                    <Route path='*' element={<PageNotFound />} />
                  </Route>
                  <Route path='order' element={<OrderNav />}>
                    <Route index element={<MarkupSetting />} />
                    <Route path='commission' element={<CommissionSettings />} />
                    <Route path='points' element={<PointsSettings />} />
                    <Route path='suppliers' element={<SupplierSettings />} />
                    <Route path='dealcodes' element={<PromoSettings />} />
                    <Route path='emailTemplates' element={<EmailTemplateSettings />} />
                    <Route path='*' element={<PageNotFound />} />
                  </Route>
                  <Route path='finance' element={<FinanceContainer />}>
                    <Route index element={<Finance />} />
                    <Route path='method' element={<PayoutMethods />} />
                    <Route path='balance' element={<BalanceSetting />} />
                    <Route path='payment' element={<PaymentSetting />} />
                    <Route path='gateway' element={<PaymentGateway />} />
                    <Route path='currency' element={<CurrencySetting />} />
                    <Route path='*' element={<PageNotFound />} />
                  </Route>
                  <Route path='faq' element={<FAQSetting />} />
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
