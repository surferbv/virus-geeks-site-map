import MapSection from './components/mapSection';
import MapTitleSection from './components/mapTitleSection';
import GetTestedSection from './components/getTestedSection';
import AppBarSection from './components/appBarSection';


function App() {
  return (
    <div className="App">
      <AppBarSection/>
      <GetTestedSection/>
      <MapTitleSection/>
      <MapSection/>
    </div>
  );
}

export default App;
