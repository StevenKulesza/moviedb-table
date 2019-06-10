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
      favoriteMovies: []
    };

    this.deleteItem = this.deleteItem.bind(this);
    this.favoriteItem = this.favoriteItem.bind(this);
    this.sortColumnHandler = this.sortColumnHandler.bind(this);
    this.changeTab = this.changeTab.bind(this);
    this.handleVoteChange = this.handleVoteChange.bind(this);
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

  handleVoteChange(e, idx) {
    let validation = /^\d*[.,]?\d{0,1}$/g;
    if (!validation.test(e.target.value) || e.target.value > 10) return;

    let data = [...this.state.data];

    data[idx].vote_average = e.target.value;
    this.setState({ data });
  }

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

  sortColumnHandler(title, idx) {
    if (this.state.activeColumn === idx) {
      let toggle = !this.state.toggle;
      this.setState({
        toggle: toggle,
        activeColumn: idx,
        rows: sortColumn(this.state.data, title, toggle)
      });
    } else {
      this.setState({
        activeColumn: idx,
        rows: sortColumn(this.state.data, title, false)
      });
    }
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
