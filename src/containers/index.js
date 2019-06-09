import React, { Component } from "react";
import MovieTable from "../components/movieTable";

// Title (string - sort)
// Vote Count (number - sort)
// Average Vote (number - editable - sort)
// Popularity (number - sort)
// Poster (use https://image.tmdb.org/t/p/w370_and_h556_bestv2/{key})
// Overview
// Favorite
// Delete

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "movie",
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

    this.deleteItem = this.deleteItem.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
  }
  componentDidMount() {
    // I was not sure 100% if you all wanted me to ping the api here or store data.
    this.setState({
      data: this.props.data
    });
  }

  changeTab(tab) {
    this.setState({ activeTab: tab });
  }

  deleteItem(idx) {
    let data = [...this.state.data];
    data.splice(idx, 1);
    this.setState({ data });
  }

  favoriteItem(idx) {
    let data = [...this.state.data];
    let favoriteMovies = [...this.state.favoriteMovies];
    data[idx].favorite = !data[idx].favorite;

    data[idx].favorite
      ? favoriteMovies.push(data[idx])
      : favoriteMovies.splice(idx, 1);

    this.setState({ data, favoriteMovies });
  }

  render() {
    const { activeTab, data, tableTiles, favoriteMovies } = this.state;
    return (
      <div className="container">
        <div className="tabs">
          <button
            className={"tab-button " + (activeTab === "movie" ? "active" : "")}
            onClick={() => this.changeTab("movie")}
          >
            Movie List
          </button>
          <button
            className={
              "tab-button " + (activeTab === "favorite" ? "active" : "")
            }
            onClick={() => this.changeTab("favorite")}
          >
            Favorites List
          </button>
        </div>

        <MovieTable
          data={activeTab === "movie" ? data : favoriteMovies}
          tableTiles={tableTiles}
          deleteItem={this.deleteItem}
          favoriteItem={this.favoriteItem}
        />
      </div>
    );
  }
}
