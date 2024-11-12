import Navegacion from './Navegacion';
import { UserProvider } from './context/UserContext';

export default function App() {
  return (
    <UserProvider>
      <Navegacion/>
    </UserProvider>
    
  );
}