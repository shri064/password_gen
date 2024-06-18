import { useState } from 'react';
import './App.css';
import { LC, NC, SC, UC } from './Data/PassChar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [number, setNumber] = useState(false);
  let [symbol, setSymbol] = useState(false);
  let [passlength, setPassLength] = useState(8);

  let [pass, setPass] = useState('');

  let createPassword = () => {
    let finalPass = '';
    let charSet = '';
    if (uppercase || lowercase || number || symbol) {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (number) charSet += NC;
      if (symbol) charSet += SC;

      for (let i = 0; i < passlength; i++) {
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      setPass(finalPass);

    } else {
      toast.error('Please select at least one checkbox', {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  let deletePass = () => {
    if (pass !== '') {
      setPass(''); // Clear the password
      toast.success("Password cleared successfully");
    } else {
      toast.error("Password field is already empty");
    }
  }

  let copyPass = () => {
    if (pass) {
      navigator.clipboard.writeText(pass);
      toast.success("Password copied successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    } else {
      toast.error("No password to copy", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  return (
    <div className="password">
      <h2>Password Generator</h2>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="passInput">
        <input type="text" value={pass} readOnly />
        <button onClick={copyPass}>Copy</button>
        <button onClick={deletePass}>Clear</button>
      </div>

      <div className="length">
        <label>Password Length</label>
        <input type="number" max={20} value={passlength} onChange={(event) => setPassLength(event.target.value)} />
      </div>

      <div className="length">
        <label>Include UpperCase</label>
        <input type="checkbox" checked={uppercase} onChange={() => setUppercase(!uppercase)} />
      </div>

      <div className="length">
        <label>Include LowerCase</label>
        <input type="checkbox" checked={lowercase} onChange={() => setLowercase(!lowercase)} />
      </div>

      <div className="length">
        <label>Include Numbers</label>
        <input type="checkbox" checked={number} onChange={() => setNumber(!number)} />
      </div>

      <div className="length">
        <label>Include Symbols</label>
        <input type="checkbox" checked={symbol} onChange={() => setSymbol(!symbol)} />
      </div>

      <button className="btn" onClick={createPassword}>
        Generate Password
      </button>

    </div>
  );
}

export default App;
