import React from "react";
import "./table.scss";

const MovieTable = ({ data, tableTiles, deleteItem, favoriteItem }) => {
  if (data.length < 1 || !Array.isArray(data))
    return <div>Data Unreadable. Try again later.</div>;

  return (
    <table className="responsive-table">
      <thead>
        <tr>
          {tableTiles.map(item => {
            return (
              <th
                key={item.title}
                onClick={() => {}}
                scope="col"
                data-label={item.title}
              >
                {item.title}
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        {data.map(row => {
          return (
            <tr key={row.id}>
              <td>{row.title}</td>
              <td>{row.vote_count}</td>
              <td>{row.vote_average}</td>
              <td>{row.popularity}</td>
              <td>{row.poster_path}</td>
              <td>
                <div>{row.overview}</div>
              </td>
              <td>
                <input type="checkbox" onClick={() => favoriteItem(row.id)} />
              </td>
              <td>
                <button onClick={() => deleteItem(row.id)}>delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default MovieTable;
