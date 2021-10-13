import MapSection from './components/mapSection';
import MapTitleSection from './components/mapTitleSection';
import GetTestedSection from './components/getTestedSection';
import GetResultsSection from './components/getResultsSection';
import GetTestedQuestionSection from './components/getTestedQuestionSection';
import AppBarSection from './components/appBarSection';
import AppFooterSection from './components/appFooterSection';


function App() {
  return (
    <div className="App">
      <AppBarSection/>
      <GetTestedSection/>
      <GetResultsSection/>

      <MapTitleSection/> {/* could move this into mapsection */}
      <MapSection/>


      <GetTestedQuestionSection/>
      <AppFooterSection/>

    </div>
  );
}

export default App;
