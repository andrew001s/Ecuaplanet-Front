import './global.css';
import ChatLayout from './src/components/layout/ChatLayout';
import Chat from './src/screens/Chat';

export default function App() {
  return (
    <ChatLayout>
      <Chat />
    </ChatLayout>
  );
}
