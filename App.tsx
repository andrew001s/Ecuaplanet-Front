import { AuthProvider } from './src/context/AuthContext';
import Layout from './src/screens/_layout';
import './global.css';

export default function App() {
  return (
    <AuthProvider>
      <Layout />
    </AuthProvider>
  );
}
