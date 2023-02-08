import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing';
import Home from './Components/Home/Home';
import Details from './Components/Details/Details';
import addActivity from './Components/Create Activity';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
        <Route exact path='/countries' component={Home} />
        <Route exact path='/countries/:id' component={Details} />
        <Route exact path='/activities' component={addActivity} />
      </div>
    </BrowserRouter>
  );
}

export default App;
