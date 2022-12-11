import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
import Main from './views/Main';
import CreatePelis from './views/CreatePelis';
import EditMovie from './views/EditMovie';
import CreateReviews from './views/CreateReviews';
import Reviews from './views/Reviews';
import EditReviews from './views/EditReviews';

function App() {
  return (
    <div className="App">
    
      <Link to={'/'}>Home</Link>

      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/create' element={<CreatePelis/>}/>
        <Route path='/edit/:id' element={<EditMovie/>}/>
        <Route path='/create-review/:idMovie' element={<CreateReviews/>}/>
        <Route path='/reviews/:idMovie' element={<Reviews/>}/>
        <Route path='/edit-review/:idReview' element={<EditReviews/>}/>

      </Routes>
      
    </div>
  );
}

export default App;
