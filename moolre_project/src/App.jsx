import HomePage from './components/HomePage';
import Navbar from './components/Navbar';
import SMSMessage from './components/SMS';
import Transaction from './components/Transaction'
import { Toaster } from 'sonner';


function App() {
  return (
    <>
      <Toaster position="top-right" richColors />
      <Navbar />
      <div id="home">
        <HomePage />
      </div>
      <div id="transact">
        <Transaction />
      </div>
      <div id="send_sms">
        <SMSMessage />
      </div>
    </>
  );
}

export default App
