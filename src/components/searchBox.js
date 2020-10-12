import React, {Component} from 'react';
import './searchBox.css'
function SearchBox(props){
    return(
        <div>
            <label for="searchVal">Enter ID, Asset Name, Price or Type to filter</label>
            <input onChange={props.handleInput} type="text" id= "searchVal" placeholder="Enter ID, Asset Name, Price or Type to filter" />
        </div>
    )
}

export default SearchBox;