import logo from './logo.svg';
import './App.css';
import {Bitbucket} from 'bitbucket';


function App() {


const clientOptions = {
  baseUrl: 'https://api.bitbucket.org/2.0',
  request: {
    timeout: 10,
  },
}

const bitbucket = new Bitbucket(clientOptions);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
