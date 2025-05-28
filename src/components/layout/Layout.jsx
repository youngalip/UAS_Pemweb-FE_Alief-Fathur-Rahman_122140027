// src/components/layout/Layout.jsx
import { Outlet } from 'react-router-dom';
import Navbar from '../common/navbar.jsx';
import Footer from '../common/footer.jsx';

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
