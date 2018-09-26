import React,{Component} from 'react';
import './style.css'

const increment = (value) => { 
  return value + 1;
}

class ButtonWithText extends Component {

  state = {
    count: 0,
  }

  onButtonClick = () => {
    this.setState({
      count: increment(this.state.count)
    })
  }
  
  render() {
    return (
      <div>
        <h1>Mon exemple à la con</h1>
        <button onClick={this.onButtonClick} className="ButtonWithText">{"Click me to increment :" + this.state.count}</button>
      </div>
    )
  }
}

export default ButtonWithText;