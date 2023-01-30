import { Outlet } from 'react-router-dom';
import './App.scss';

export const App: React.FC = () => (
  <div className="App">
    <Outlet />
  </div>
);
