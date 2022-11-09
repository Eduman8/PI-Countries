import './App.css';
import { BrowserRouter, Route } from 'react-router-dom'
import Landing from './Components/Landing/Landing';
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Route exact path="/" component={Landing} />
      </div>
    </BrowserRouter>
  );
}

export default App;
