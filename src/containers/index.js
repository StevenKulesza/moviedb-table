import React, { Component } from "react";
import MovieTable from "../components/movieTable/movieTable";

// Title (string - sort)
// Vote Count (number - sort)
// Average Vote (number - editable - sort)
// Popularity (number - sort)
// Poster - not in the mockups, assuming just linking to the image based on README (string - sort)
// Overview (string - sort)
// Favorite
// Delete

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "movie",
      activeColumn: null,
      data: [],
      tableTiles: [
        { title: "Title", data_item: "title", type: "string" },
        { title: "Vote", data_item: "vote_count", type: "interger" },
        { title: "Average Vote", data_item: "vote_average", type: "interger" },
        { title: "Popularity", data_item: "popularity", type: "interger" },
        { title: "Poster", data_item: "poster_path", type: "string" },
        { title: "Overview", data_item: "overview", type: "string" },
        { title: "Favorite", data_item: "favorite", type: "boolean" },
        { title: "Delete", data_item: "delete", type: "function" }
      ],
      favoriteMovies: []
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
    this.sortColumnHandler = this.sortColumnHandler.bind(this);
  }
  componentDidMount() {
    this.setState({ data: this.props.data });
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

  sortColumnHandler(title, idx) {
    if (this.state.activeColumn === idx) {
      let toggle = !this.state.toggle;
      this.setState({
        toggle: toggle,
        activeColumn: idx,
        rows: this.sortColumn(this.state.data, title, toggle)
      });
    } else {
      this.setState({
        activeColumn: idx,
        rows: this.sortColumn(this.state.data, title, false)
      });
    }
  }

  sortColumn(data, colIdx, reverse) {
    if (reverse === true) {
      data.sort(sortFunction).reverse();
    } else {
      data.sort(sortFunction);
    }

    function sortFunction(a, b) {
      if (a[colIdx] === b[colIdx]) {
        return 0;
      } else {
        return a[colIdx] < b[colIdx] ? -1 : 1;
      }
    }
    return data;
  }

  render() {
    const {
      activeTab,
      data,
      tableTiles,
      favoriteMovies,
      activeColumn,
      toggle
    } = this.state;

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
          activeColumn={activeColumn}
          toggle={toggle}
          deleteItem={this.deleteItem}
          favoriteItem={this.favoriteItem}
          sortColumnHandler={this.sortColumnHandler}
        />
      </div>
    );
  }
}
