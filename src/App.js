import './App.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard/Dashboard';
import { store } from './redux/store';
import { Provider } from 'react-redux';
import { SnackbarProvider } from 'notistack';
// import 'dotenv/config'

function App() {
  return (
    <Router>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} anchorOrigin={{vertical: 'top',horizontal: 'right'}} >
          <Routes>
            <Route path='/' element={<Navbar />}>
              <Route index element={<Dashboard />} />
            </Route>
          </Routes>
        </SnackbarProvider>
      </Provider>
    </Router>
  );
}

export default App;
