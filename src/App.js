import React, { Component } from 'react';
import Header from './Components/Header';
import MoviesContainer from './Components/MoviesContainer';
import Modal from './Components/Modal';
import { fetchAllMovies } from './api-Calls';
import './App.css';
import thisIsFire from './styles/thisIsFire.gif';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null,
      isModalOpen: false,
      isLoading: true,
      error: null
    }
  }

  componentDidMount = () => {
    fetchAllMovies()
      .then(data => {
        this.setState({ movies: data.movies, isLoading: false })
      })
      .catch(error => {
        this.setState({error: error.message})
      });
  }


  setSelectedMovie = (id) => {
    this.setState({ selectedMovie: id });
  }

  toggleModal = (bool) => {
    this.setState({ isModalOpen: bool });
  }

  render = () => {
    return (
      this.state.error !== null ?
        <div className="error-display">
          <img src={thisIsFire} alt="this is fine gif" className="dog-gif"/>
          <p><b>Error:</b> {this.state.error}</p>
          <p>Please refresh your browser.</p>
        </div>
      :
        <div className="App">
          <Header />
          {this.state.isLoading && <div>Loading...</div>}
          {!this.state.isLoading && 
            <MoviesContainer movies={this.state.movies}
              selectedMovie={this.state.selectedMovie}
              isModalOpen={this.state.isModalOpen}
              setSelectedMovie={this.setSelectedMovie}
              toggleModal={this.toggleModal}
            />}
          {this.state.isModalOpen && this.state.selectedMovie ?
            <Modal
              selectedMovie={this.state.selectedMovie}
              toggleModal={this.toggleModal}
            />
            : null
          }
        </div>
    )
  }

}

export default App;
