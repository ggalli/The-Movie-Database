import { Routes, Route, BrowserRouter } from "react-router-dom";

import { Home } from "./pages/Home";
import { Movie } from "./pages/Movie";
import { Header } from "./components/Header";

import './styles/app.scss'

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route index element={<Home />} />
        <Route path="movies/:movieId" element={<Movie />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
