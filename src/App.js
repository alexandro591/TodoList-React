import React, {Component} from 'react';
const axios = require('axios')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      themeColor: "#000000",
      height: window.innerHeight,
      newItem:"",
      list:[]
    }
  }

  async deleteItem(item){
    navigator.vibrate(200)
    try {
      await axios.delete("https://todolist-488ce.firebaseio.com/alexandro/"+item.toString()+".json");
    } catch (error) {
      console.log(error)
    }
  }


  async addItem(){
    if(this.state.newItem!==""){
      navigator.vibrate(200);
      try {
        await axios.post("https://todolist-488ce.firebaseio.com/alexandro.json",{
          todo:this.state.newItem
        });
      } catch (error) {
        console.log(error)
      }
      this.state.newItem="";
    }
    else{
      alert("You have to add an item first");
    }
  }

  getTodo(){
    axios.get("https://todolist-488ce.firebaseio.com/alexandro.json")
    .then(body=>{
      try {
        var nItems = Object.keys(body.data).length;
        var item=[];
        for(let i=0;i<nItems;i++){
          item.push([Object.keys(body.data)[i],body.data[Object.keys(body.data)[i].toString()].todo.toString()]);
        }
        this.setState({
          list:item
        });
      } catch (error) {
        this.setState({
          list:[]
        });
      }
    });
  }

  updateInput(value){
    this.setState({
      themeColor:"#000000",
      newItem:value
    });
  };

  render() { 
    return ( 
      
      <div className="App" style={{minHeight: this.state.height}}>
      <meta name="theme-color" content={this.state.themeColor}></meta>
        <div className="container">
          To do list...
          <br/>
          <input
            spellCheck="false"
            className="input"
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e=>this.updateInput(e.target.value)}
          />
          <button className="addBtn" onClick={()=>this.addItem()}>
            <b>Add</b>
          </button>
          <br/>
        </div>
        <div className="listContainer">
          {this.getTodo()}
          {this.state.list.map(item=>{
            return(
              <li className="list" key={item[1]}>
                {item[1]}
                <button className="deleteBtn" onClick={()=>this.deleteItem(item[0])}>
                  X
                </button>
              </li>
            )
          })}
        </div>
      </div> 
    );
  }
}
 
export default App;