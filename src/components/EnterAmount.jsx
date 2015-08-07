import React, { PropTypes, Component } from 'react';
import web3 from 'web3';
import Balance from './Balance';

export default class EnterAmount extends Component {
  static propTypes = {
    onAmount: PropTypes.func.isRequired,
    address: PropTypes.string,
  }

  state = {
    error: null,
  }

  onSubmit = (event) => {
    event.preventDefault();
    const amount = web3.toWei(this.state.amount, 'ether');
    this.props.onAmount(amount);
  }

  render() {
    return (
      <form className="decrypt-wallet" onSubmit={this.onSubmit}>
        <div className="enter-amount">
          <label>Choose amount</label>
          <input
            type="text"
            value={this.state.amount}
            onChange={e => this.setState({ amount: e.target.value })}
          />
          <span className="after_input">ETH</span>
          {this.props.address && <Balance address={this.props.address} />}
        </div>
        <button className="button" type="submit">Choose Amount</button>
         {this.state.error && <div className="error_message">{this.state.error}</div>}
      </form>
    );
  }
}
