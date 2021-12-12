import React from 'react';
import '../styles/MovieDetails.css';
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
  if (this.state.movie && !this.state.isLoading) {
    const myStyle = {
      backgroundImage: `url(${this.state.movie.backdrop_path})`
    }
    return (
        <div className="movie-details">
          <article className="movie-details-window">
            <div className="movie-details-backdrop-img" style={myStyle}>
            </div>
            <img src={this.state.movie.poster_path} alt={this.state.movie.title + ` poster`} className="movie-details-poster"/>
            <div className="movie-content">
              <div className="movie-details-title">
                <h3>{this.state.movie.title}</h3>
              </div>
              <p className='movie-details-p'><b>Genres:</b>{this.state.movie.genres.join(', ')} </p>
              <p className="movie-details-p"><b>Average Rating:</b> {Number(this.state.movie.average_rating.toFixed(2))} / 10</p>
              <p className="movie-details-p"><b>Release Date:</b> {this.state.movie.release_date}</p>
              <p className="movie-details-p"><b>Overview:</b> {this.state.movie.overview}</p>
              {this.state.movie.budget ? <p className="movie-details-p"><b>Budget:</b> ${this.state.movie.budget}</p> : null}
              {this.state.movie.revenue ? <p className="movie-details-p"><b>Revenue:</b> ${this.state.movie.revenue}</p> : null}
              {this.state.movie.tagline ? <p className="movie-details-p"><b>Tagline:</b> {this.state.movie.tagline}</p> : null}
              <button onClick={() => this.props.closeMovieDetails()}>Close</button>
            </div>
          </article>
        </div>
    )
  } else {
    return null;
  }

}
}

export default MovieDetails;
