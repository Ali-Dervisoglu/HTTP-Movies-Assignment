import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";
import MovieUpdateForm from "./MovieUpdateForm";
import { Route, useHistory } from "react-router-dom";

export default class Movie extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  deleteMovie = (id) => {
    console.log("delete is function is running");
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => console.log(err));
  };

  render() {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }

    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button className="update-button" onClick={() => {
          this.props.history.push(`/update-movie/${this.state.movie.id}`);
          // useHistory(`/update-movie/${this.state.movie.id}`);
        }}>
          Update
        </button>
        {/* <Route path="update-movie/:id" render={props => (
        <MovieUpdateForm {...props}/>
      )} /> */}

        <button className="delete-button" onClick={() => {
           this.deleteMovie(this.state.movie.id);
        }}>
          delete movie
        </button>

      </div>
    );
  }
}
