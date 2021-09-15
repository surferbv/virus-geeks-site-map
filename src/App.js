import logo from './logo.svg';
import './App.css';

import Types from './components/materialTypograph'
import Container from '@material-ui/core/Container';


function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Container maxWidth="sm">
          <h1>HI BOB!</h1>
          <Types/>
        </Container>
      </header>
    </div>
  );
}

export default App;
