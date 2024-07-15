import './App.css';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [location.pathname]);

    return <AppRoutes />;
}

export default App;
