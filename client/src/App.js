import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Landing from './components/Landing';
import Home  from './components/Home';
import CreateVideogame from './components/CreateVideogame';
import Details from './components/Details';

function App() {
  return (
    <BrowserRouter>
    <div>
      <Switch>
        <Route exact path= '/' component={Landing}/>
        <Route path='/home' component={Home}/> 
        <Route exact path='/videogame' component={CreateVideogame}/>
        <Route exact path='/videogame/:id' component={Details}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
