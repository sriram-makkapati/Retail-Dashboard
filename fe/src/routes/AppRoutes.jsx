import { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Auth from '../pages/auth.jsx';
import Home from '../pages/Home.jsx';
import Demographics from '../pages/Demographics.jsx';
import SalesInsight from '../pages/SalesInsight.jsx';
import ProductInsight from '../pages/ProductInsight.jsx';
import SalesProductType from '../pages/SalesProductType.jsx';
import AppLayout from '../components/AppLayout.jsx';
import { ContextInstance } from '../context/AppContext';

function AppRoutes() {
  const { user } = useContext(ContextInstance);

  return (
    <AppLayout>
      <Routes>
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/"
          element={user ? <Home /> : <Navigate to="/auth" replace />}
        />
        <Route
          path="/demographics"
          element={user ? <Demographics /> : <Navigate to="/auth" replace />}
        />
        {/* Remove or fix this route if not needed */}
        {/* <Route
          path="/Retail Dashboard"
          element={user ? <Home /> : <Navigate to="/auth" replace />}
        /> */}
        <Route
          path="/sales-insight"
          element={user ? <SalesInsight /> : <Navigate to="/auth" replace />}
        />
        <Route 
          path="/product-insight"
          element={user ? <ProductInsight /> : <Navigate to="/auth" replace />} 
        />
        <Route
          path="/sales-product-type"
          element={user ? <SalesProductType /> : <Navigate to="/auth" replace />} 
        />
        <Route path="*" element={<Navigate to={user ? "/" : "/auth"} replace />} />
      </Routes>
    </AppLayout>
  );
}

export default AppRoutes;