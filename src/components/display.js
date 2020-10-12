import React, { Component } from 'react';
import {mock} from './mock.js';
import DisplayTable from './displayTable.js';
import SearchBox from './searchBox.js';

class Display extends Component {
    constructor(props){
        super(props);
        this.state = {
           data : [],
           direction: 'asc',
           searchFlag: '',
           updateFlag: true,
           sortFlag: false,
           key: '',
           filterFlag: false,
           addFavourite: JSON.parse(localStorage.getItem('Favourite'))     
           /* Getting the localStorage and setting to addFavourite state
           so that it persists in LocalStorage when you refresh*/
        }
        this.sortBy = this.sortBy.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleFavourite = this.handleFavourite.bind(this);
    }

    componentDidMount(){
      var arr = [];
        mock.subscribe((val) =>{
          arr.push(val)
          if(arr.length === 400){
            /* Filtering the rows based on id, assetName, Price and Type*/
            if(this.state.filterFlag && this.state.searchFlag){            
              arr = arr.filter((row) => {
                return (row.id === parseInt(this.state.searchFlag) ||
                        row.assetName.includes(this.state.searchFlag.toUpperCase()) ||
                        row.price.toString().indexOf(this.state.searchFlag) >-1 ||
                        row.type.toUpperCase().includes(this.state.searchFlag.toUpperCase())
                       )
                });
            }
          /* Sorting the rows in ascending or descending order
            first click on table header - descending
            next click on the table header - ascending*/
          if(this.state.sortFlag){             
            arr.sort( (a,b) => {
              if(this.state.direction === 'asc'){
                if (a[this.state.key] < b[this.state.key]) return -1;
                if (a[this.state.key] > b[this.state.key]) return 1;
                return 0;
              }
              else {
                if (a[this.state.key] < b[this.state.key]) return 1;
                if (a[this.state.key] > b[this.state.key]) return -1;
                return 0;
              }
            });
          }
            this.setState({data : arr})
            arr = [];
          }   
        });   
    }

    sortBy(key){
      this.state.key = key;
      this.state.sortFlag = true;
      this.state.direction = this.state.direction === 'asc' ? 'desc':'asc';
    }

    handleInput = (e) =>{
      this.state.searchFlag =  e.target.value;
      this.state.filterFlag = true;
    }

    /* Storing the clicked favorites in localStorage 
       Toggling logic for the favourite button, will toggle the state on the click*/
    handleFavourite(key, e){
      e.preventDefault();
      let newFavoriteList = this.state.addFavourite;
      newFavoriteList[key.id] = !newFavoriteList[key.id];
      if(newFavoriteList){
        localStorage.setItem('Favourite', JSON.stringify(newFavoriteList));
      }
      this.setState({addFavourite: newFavoriteList})
    }

    render() {
        return (
          <div>
            <SearchBox handleInput={this.handleInput}/>
              <DisplayTable 
                data={this.state.data}
                addFavourite = {this.state.addFavourite}
                sortBy={this.sortBy}
                handleFavourite={this.handleFavourite}
              />
          </div>
        )
      }
}

export default Display;

