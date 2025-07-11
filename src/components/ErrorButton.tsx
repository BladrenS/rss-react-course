import { Component } from 'react';

export default class ErrorButton extends Component {
  throwError = () => {
    throw new Error('Manual error triggered');
  };

  render() {
    return (
      <button onClick={this.throwError} className="text-red-600 underline">
        Throw Error
      </button>
    );
  }
}
