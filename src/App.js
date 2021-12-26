import './App.css';
import Header from '../src/components/Header/Header'
import { BrowserRouter, Routes, Route, } from "react-router-dom"
import SimpleBottomNavigation from '../src/components/MainNav'
import { Container } from '@mui/material';
import Trending from '../src/components/Pages/Trending/Trending'
import Movies from '../src/components/Pages/Movies/Movies'
import Series from '../src/components/Pages/Series/Series'
import Search from '../src/components/Pages/Search/Search'

function App() {
  return (
    <>
      <Header />
      <div className="App">
        <Container>
          {/* <BrowserRouter> */}
            <Routes>
              <Route exact path="/" element={<Trending />} />
              <Route exact path="/movies" element={<Movies />} />
              <Route exact path="/series" element={<Series />} />
              <Route exact path="/search" element={<Search />} />
            </Routes>
          {/* </BrowserRouter> */}
        </Container>
      </div>
      <SimpleBottomNavigation />
    </>
  );
}

export default App;
