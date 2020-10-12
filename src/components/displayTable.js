import React from 'react';
import './displayTable.css'
function displayTable(props) {
    const changeColor = (id) => props.addFavourite[id] ? "red" : "grey";
  return (
      <table className="assets">
          <thead>
              <tr>
                  <th>
                    <button className="button-header"
                        onClick={() => props.sortBy('id')}>Id
                    </button>
                  </th>
                  <th>
                    <button className="button-header"
                        onClick={() => props.sortBy('assetName')}>Asset Name
                    </button>
                  </th>
                  <th>
                    <button className="button-header"
                        onClick={() => props.sortBy('price')}>Price
                    </button>
                  </th>
                  <th>
                    <button className="button-header"
                        onClick={() => props.sortBy('lastUpdate')}>Last Update
                    </button>
                  </th>
                  <th>
                    <button className="button-header"
                        onClick={() => props.sortBy('type')}>Type
                    </button>
                  </th>
                  <th>
                      Add to Favourites
                  </th>
              </tr>
          </thead>
          <tbody>
              {
                  props.data.map((row) => (
                      <tr key={row.id}>
                          <td key={row.id}>{row.id}</td>
                          <td key={row.assetName}>{row.assetName}</td>
                          <td key={row.price}>{row.price}</td>
                          <td key={row.lastUpdate}>{new Date(row.lastUpdate).toLocaleString()}</td>
                          <td key={row.type}>{row.type}</td>
                          <td> 
                              <button className="likeBtn" onClick={(e) => props.handleFavourite(row, e)} >
                                <i className="fas fa-heart fa-lg" style={{ color: changeColor(row.id) }}></i>
                              </button>
                          </td>
                      </tr>
                  ))
              }
          </tbody>
      </table>
  );
}
 
export default displayTable;