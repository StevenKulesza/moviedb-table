import React, { Component } from "react";
import MovieTable from "../components/movieTable";

// Title (string - sort)
// Vote Count (number - sort)
// Average Vote (number - editable - sort)
// Popularity (number - sort)
// Poster (use https://image.tmdb.org/t/p/w370_and_h556_bestv2/{key})
// Overview
// Favorite
// Select Movie
// Delete

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      tableTiles: [
        { title: "Title", data_item: "title" },
        { title: "Vote", data_item: "vote_count" },
        { title: "Average Vote", data_item: "vote_average" },
        { title: "Popularity", data_item: "popularity" },
        { title: "Poster", data_item: "poster_path" },
        { title: "Overview", data_item: "overview" },
        { title: "Favorite", data_item: "favorite" },
        { title: "Delete", data_item: "delete" }
      ],
      favoriteMovies: []
    };
  }
  componentDidMount() {
    this.setState({
      data: this.props.data
    });
  }

  deleteItem(id) {
    console.log("delete", id);
  }

  favoriteItem(id) {
    console.log("favorite", id);
  }

  render() {
    const { data, tableTiles } = this.state;
    return (
      <div className="container">
        <MovieTable
          data={data}
          tableTiles={tableTiles}
          deleteItem={this.deleteItem}
          favoriteItem={this.favoriteItem}
        />
      </div>
    );
  }
}
