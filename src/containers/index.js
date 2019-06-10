import React, { Component } from "react";
import MovieTable from "../components/movieTable/movieTable";
import Tabs from "../components/tabs/tabs";
import { sortColumn } from "../utils";

export default class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: "movie",
      activeColumn: null,
      data: [],
      favoriteMovies: [],
      toggle: false
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
    this.sortColumnHandler = this.sortColumnHandler.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.handleVoteChange = this.handleVoteChange.bind(this);
  }
  componentDidMount() {
    this.setState({ data: sortColumn(this.props.data, "vote_average", true) });
    this.favoriteItemByRating(this.props.data, 7);
  }

  /**
   * Updates the active tab to be visible
   * @param {String} tab - the tab to change
   */
  changeTab(tab) {
    this.setState({
      activeTab: tab,
      activeColumn: null,
      toggle: false
    });
  }

  /**
   * Deletes the movie from movie objects
   * @param {String} id - the identifier for the movie row
   */
  deleteItem(id) {
    let data = [...this.state.data];
    let favoriteMovies = [...this.state.favoriteMovies];
    let index = data.findIndex(x => x.id === id);
    let favoritesIndex = favoriteMovies.findIndex(x => x.id === id);

    data.splice(index, 1);
    favoriteMovies.splice(favoritesIndex, 1);

    this.setState({ data, favoriteMovies });
  }

  /**
   * Changes the vote average in both movie objects then sorts
   * @param {Object} e - the on change event containing the value
   * @param {String} id - the identifier for the movie row
   */
  handleVoteChange(e, id) {
    let validation = /^\d*[.,]?\d{0,1}$/g;
    if (!validation.test(e.target.value) || e.target.value > 10) return;

    let data = [...this.state.data];
    let favoriteMovies = [...this.state.favoriteMovies];
    let index = data.findIndex(x => x.id === id);
    let favoritesIndex = favoriteMovies.findIndex(x => x.id === id);

    data[index].vote_average = e.target.value;
    favoriteMovies[favoritesIndex].vote_average = e.target.value;

    data = sortColumn(data, "vote_average", true);
    favoriteMovies = sortColumn(favoriteMovies, "vote_average", true);

    this.setState({ data, favoriteMovies });
  }

  /**
   * Adds or removes the favorite item from the tables
   * @param {String} id - the identifier for the movie row
   */
  favoriteItem(id) {
    let data = [...this.state.data];
    let favoriteMovies = [...this.state.favoriteMovies];
    let index = data.findIndex(x => x.id === id);
    let favoritesIndex = favoriteMovies.findIndex(x => x.id === id);

    data[index].favorite = !data[index].favorite;

    data[index].favorite
      ? favoriteMovies.push(data[index])
      : favoriteMovies.splice(favoritesIndex, 1);

    this.setState({ data, favoriteMovies });
  }

  /**
   * Sorts the favorites by rating
   * @param {Object} data - the data to update
   * @param {Number} rating - the value to filter against
   */
  favoriteItemByRating(data, rating) {
    if (data.length < 1) return;

    let favorites = [...data].filter(item => {
      if (item.vote_average > rating) item.favorite = true;
      return item.vote_average > rating;
    });

    let favoriteMovies = [...this.state.favoriteMovies, favorites];

    this.setState({ favoriteMovies: favoriteMovies[0] });
  }

  /**
   * Sorts the column increasing / decreasing values
   * @param {string} title - the column to update
   * @param {Number} idx - the active filter column
   */
  sortColumnHandler(title, idx) {
    let sortData;

    this.state.activeTab === "movie"
      ? (sortData = this.state.data)
      : (sortData = this.state.favoriteMovies);

    this.setState({
      toggle: !this.state.toggle,
      activeColumn: idx,
      rows: sortColumn(sortData, title, !this.state.toggle)
    });
  }

  render() {
    const {
      activeTab,
      data,
      favoriteMovies,
      activeColumn,
      toggle
    } = this.state;

    return (
      <div className="container">
        <Tabs changeTab={this.changeTab} activeTab={activeTab} />
        <MovieTable
          data={activeTab === "movie" ? data : favoriteMovies}
          activeTab={activeTab}
          tableTiles={this.props.titles}
          activeColumn={activeColumn}
          toggle={toggle}
          deleteItem={this.deleteItem}
          favoriteItem={this.favoriteItem}
          sortColumnHandler={this.sortColumnHandler}
          handleVoteChange={this.handleVoteChange}
        />
      </div>
    );
  }
}
