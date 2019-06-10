import React from "react";
import "./tabs.scss";

const Tabs = ({ activeTab, changeTab }) => {
  return (
    <div className="tabs">
      <button
        className={"tab-button " + (activeTab === "movie" ? "active" : "")}
        onClick={() => changeTab("movie")}
      >
        Movie List
      </button>
      <button
        className={"tab-button " + (activeTab === "favorite" ? "active" : "")}
        onClick={() => changeTab("favorite")}
      >
        Favorites List
      </button>
    </div>
  );
};

export default Tabs;
