import logo from './logo.svg';
import './App.css';

import Types from './components/materialTypograph';
import Container from '@material-ui/core/Container';
import SimplePaper from './components/simplePaper';
import Paper from '@material-ui/core/Paper';

function App() {
  return (
    <div className="App">
      <Container >
        <SimplePaper/>
      </Container>
    </div>
  );
}

export default App;
