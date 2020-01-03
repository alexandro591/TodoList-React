import React, {Component} from 'react';
const axios = require('axios')

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem:"",
      list:[]
    }
  }

  async deleteItem(item){
    try {
      await axios.delete("https://todolist-488ce.firebaseio.com/alexandro/"+item.toString()+".json");
    } catch (error) {
      console.log(error)
    }
  }


  async addItem(){
    try {
      await axios.post("https://todolist-488ce.firebaseio.com/alexandro.json",{
        todo:this.state.newItem
      });
    } catch (error) {
      console.log(error)
    }
    this.state.newItem="";
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
      "newItem":value
    });
  };

  render() { 
    return ( 
      <header className="App">
        <div>
          Add an Item...
          <br/>
          <input
            className="input"
            type="text"
            placeholder="Type item here"
            value={this.state.newItem}
            onChange={e=>this.updateInput(e.target.value)}
          />
          <button className="addBtn" onClick={()=>this.addItem()}>
            Add
          </button>
          <br/>
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
      </header> 
    );
  }
}
 
export default App;