import React, {Component} from 'react';
import './App.css';

function Square(props) {
  return (
    <button className = "square"
      onClick = {props.onClick}>
        {props.value}
      </button>
  );
}

function f(squares) {
  const wins = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 8; i++) {
    const [a, b, c] = wins[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a];
  }
  return null;
}

function find(squares) {
  for (let i = 0; i < 9; i++) {
    if (!squares[i]) return true;
  }
  return false;
}

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      squares : Array(9).fill(null),
      xisNext : true,
    };
  }
  handleClick(i) {
    const square = this.state.squares.slice();
    if (square[i] || f(this.state.squares)) return ;
    if (this.state.xisNext) square[i] = 'X';
    else square[i] = 'O';
    this.setState({
      squares : square,
      xisNext : !this.state.xisNext
    });
  }
  renderSquare(i) {
    return (
      <Square
        value = {this.state.squares[i]}
        onClick = {() => this.handleClick(i)}
      />
    );
  }
  render() {
    const winner = f(this.state.squares);
    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    }
    else {
      status = 'Next player: ' + (this.state.xisNext ? 'X' : 'O');
    }
    if (!find(this.state.squares)) status = 'Draw';
    return (
      <div>
        <div className = "status">
          {status}
        </div>
        <div className = "board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className = "board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className = "board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className = "game">
        <div className = "game-board">
            <Board/>
        </div>
      </div>
    );
  }
}

export default App;