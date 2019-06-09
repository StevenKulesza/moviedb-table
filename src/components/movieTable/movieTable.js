import React from "react";
import "./table.scss";
import { POSTER_PATH } from "../../constants";

const MovieTable = ({
  data,
  tableTiles,
  sortColumnHandler,
  deleteItem,
  favoriteItem,
  activeColumn,
  toggle
}) => {
  if (!Array.isArray(data))
    return <div className="message">Data Unreadable.</div>;
  if (data.length < 1)
    return <div className="message">No movies to show currently.</div>;

  return (
    <table className="responsive-table">
      <thead>
        <tr>
          {tableTiles.map((item, idx) => {
            return (
              <th
                key={item.title}
                onClick={
                  item.type === "interger" || item.type === "string"
                    ? () => sortColumnHandler(item.data_item, idx)
                    : null
                }
                scope="col"
                data-label={item.title}
              >
                {item.title}
                {activeColumn === idx ? (toggle ? " ↓" : " ↑") : ""}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map((row, idx) => {
          return (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>{row.vote_count}</td>
              <td>{row.vote_average}</td>
              <td>{row.popularity}</td>
              <td>
                <a href={POSTER_PATH + row.poster_path}>{row.poster_path}</a>
              </td>
              <td>
                <div>{row.overview}</div>
              </td>
              <td>
                <input type="checkbox" onClick={() => favoriteItem(idx)} />
              </td>
              <td>
                <button onClick={() => deleteItem(idx)}>delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieTable;
