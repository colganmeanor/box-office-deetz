import React from 'react';
import '../styles/Modal.css';
import { fetchSingleMovie } from '../api-Calls';
import Error from './Error';

class MovieDetails extends React.Component {
  constructor() {
    super();
    this.state = {
      movie: null,
      isLoading: true,
      error: null
    }
  }

  componentDidMount = () => {
    fetchSingleMovie(this.props.selectedMovie)
      .then(data => this.setState({
        movie: data.movie,
        isLoading: false
      }))
      .catch(error => {
        this.setState({error: error.message})
      })
  }

  render = () => {
    if (this.state.error) {
      return (
        <Error error={this.state.error}/>
      )
    } 
    
    if (this.state.movie && !this.state.isLoading) {
      const myStyle = {
        backgroundImage: `url(${this.state.movie.backdrop_path})`
      }
      return (
        <div className="modal-container">
          <div className="modal">
            <article className="modal-window">
              <div className="modal-backdrop-img" alt={this.state.movie.title + ` backdrop img`} style={myStyle}>
              </div>
              <img src={this.state.movie.poster_path} alt={this.state.movie.title + ` poster`} className="modal-poster"/>
              <div className="modal-poster movie-content">
                <div className="modal-title">
                  <h3 className="modal-movie-title"  id="movie-title">{this.state.movie.title}</h3>
                </div>
                <p className="modal-p" id="average-rating"><b>Average Rating:</b> {this.state.movie.average_rating} / 10</p>
                <p className="modal-p"><b>Release Date:</b> {this.state.movie.release_date}</p>
                <p className="modal-p"><b>Overview:</b> {this.state.movie.overview}</p>
                <p className="modal-p"><b>Genres:</b> {this.state.movie.genres}</p>
                <p className="modal-p"><b>Budget:</b> {this.state.movie.budget}</p>
                <p className="modal-p"><b>Revenue:</b> {this.state.movie.revenue}</p>
                <p className="modal-p"><b>Tagline:</b> {this.state.movie.tagline}</p>
                <button className="movie-details-close-button" onClick={() => this.props.closeMovieDetails()}>Close</button>
              </div>
            </article>
          </div>
        </div>
      )
    } else {
      return null;
    }
  }

}

export default MovieDetails;
