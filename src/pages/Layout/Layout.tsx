import { Outlet } from 'react-router-dom';
import NavBar from '../../components/NavBar/NavBar';

function Layout() {
  return (
    <div>
      <NavBar />
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
