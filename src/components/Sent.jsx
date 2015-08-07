import React, { Component, PropTypes } from 'react';

export default class Sent extends Component {
  static propTypes = {
    hash: PropTypes.string,
  }

  render() {
    return (
      <div>
        <label>
          Deposit sent!
        </label>

        <p className="semi_info">
          Your deposit will be available on Kraken around 24 hours.
        </p>

        <p>
          <a className="button" href={`https://etherchain.org/tx/${this.props.hash}`}>
            View in block explorer
          </a>
        </p>
      </div>
    );
  }
}
