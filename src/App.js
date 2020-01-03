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

  async addItem(){
    try {
      await axios.post("https://todolist-488ce.firebaseio.com/alexandro.json",{
        todo:this.state.newItem
      });
    } catch (error) {
      console.log(error)
    }
  }

  getTodo(){
      axios.get("https://todolist-488ce.firebaseio.com/alexandro.json")
      .then(body=>{
        let size = Object.keys(body.data).length;
        for(var i=0;i<size;i++){
          let key
          var updatedList=[]
          key = Object.keys(body.data)[i];
          axios.get("https://todolist-488ce.firebaseio.com/alexandro/"+key.toString()+"/todo.json")
          .then(body=>{
            updatedList.push(body.data.toString())

          })
        }
        this.setState({
          "list":updatedList
        });
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
          {this.state.list}
        </div>
      </header> 
    );
  }
}
 
export default App;