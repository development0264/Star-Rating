import CustomAutoComplete from './components/CustomAutoComplete';
import { Container, Row, Col } from 'react-bootstrap';
import CustomDropdownsGenre from './components/CustomDropdownsGenre';
import CustomDropdownsRatings from './components/CustomDropdownsRatings';
import { useEffect, useState } from 'react';
import axios from 'axios';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "./style.css";

function App() {
  const [moviesData, setMoviesData] = useState([]);
  const [showMovies, setshowMovies] = useState(false)
  const [category, setCategory] = useState([
    { category: "Any genre", checked: false },
    { category: "Drama", checked: false },
    { category: "Action", checked: false },
    { category: "Comedy", checked: false },
    { category: "Thriller", checked: false }]);

  const [ratings, setRatings] = useState([
    { rating: "Any ratings", checked: false },
    { rating: 1, checked: false },
    { rating: 2, checked: false },
    { rating: 3, checked: false },
    { rating: 4, checked: false },
    { rating: 5, checked: false },
    { rating: 6, checked: false },
    { rating: 7, checked: false },
    { rating: 8, checked: false },
    { rating: 9, checked: false },
    { rating: 10, checked: false },
  ]);

  const [filterMoviesData, setFilterMoviesData] = useState([]);

  const movies = filterMoviesData?.map((e) => ({ label: e.title, value: e.title, ratings: e.Rating, category: e.Category }));

  const getMoviesData = async () => {
    try {
      const data = await axios.get("test.json");
      setMoviesData(data.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    getMoviesData();
  }, [showMovies]);

  const getSelectedItems = (list, key) => {
    const itemsArray = list;
    const keyName = key;
    const selectedItems = itemsArray.filter(data => data.checked === true).map((data) => data[keyName]);
    return selectedItems
  };

  const checkAnySelected = (list, key, compare) => {
    const isAnySelected = list.some(data => data.checked === true && data[key] === compare);
    return isAnySelected;
  }

  const checkMoviesRatings = (data, movie) => {
    const value1 = data - 0.5;
    const value2 = data + 0.5;
    if (value1 <= movie.Rating && value2 >= movie.Rating) return movie;
    return false
  }

  useEffect(() => {
    const isAnyGenreSelected = checkAnySelected(category, "category", "Any genre");

    const isAnyRatingSelected = checkAnySelected(ratings, "rating", "Any ratings");

    const selectedCategory = getSelectedItems(category, 'category');

    const selectedRating = getSelectedItems(ratings, 'rating');

    let tempMoviesData;

    if (isAnyGenreSelected || isAnyRatingSelected) {
      setFilterMoviesData(moviesData);
      return;
    }

    if (selectedCategory.length === 0 && selectedRating.length === 0) {
      setFilterMoviesData(moviesData);
      return;
    }

    if (selectedCategory.length === 0 || selectedRating.length === 0) tempMoviesData = moviesData.filter((movie) => selectedCategory.includes(movie.Category) || selectedRating.some((data) => checkMoviesRatings(data, movie)));

    if (selectedCategory.length > 0 && selectedRating.length > 0) tempMoviesData = moviesData.filter((movie) => selectedCategory.includes(movie.Category) && selectedRating.some((data) => checkMoviesRatings(data, movie)));

    setFilterMoviesData(tempMoviesData);

  }, [category, ratings, moviesData]);

  return (
    <Container>
      <Row>
        <Col xs={6} >
          <CustomAutoComplete movieName={movies} setshowMovies={setshowMovies} />
        </Col>
        <Col xs={6} className='select-dropdown btn-dropdown ps-0'>
          <CustomDropdownsRatings heading={"Ratings"} menuItems={ratings} setRatings={setRatings} />
          <CustomDropdownsGenre heading={"Genre"} menuItems={category} setCategory={setCategory} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
