import React, { PropTypes, Component } from 'react';
import deposit from '../../src/deposit';

function isAddressValid(address) {
  return !!address.match(/^0x[a-fA-F0-9]{40}$/);
}

export default class EnterAddress extends Component {
  static propTypes = {
    onSent: PropTypes.func.isRequired,
    wallet: PropTypes.object,
    amount: PropTypes.string,
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { address } = this.state;

    if (!isAddressValid(address)) {
      this.setState({
        error: 'Invalid deposit address',
      });
      return;
    }

    deposit(
      this.props.wallet.address,
      address,
      this.props.amount,
      (err, hash) => {
        if (err) {
          this.setState({ error: `Deposit failed: ${err.message}` });
          return;
        }
        this.props.onSent(hash);
      }
    );
  }

  render() {
    return (
      <form className="decrypt-wallet" onSubmit={this.onSubmit}>
        <div className="enter-address">
          <label>Enter deposit address</label>
          <p className="semi_info">
            You can find this under Funding, Deposit, Ether
            on <a href="https://kraken.com">kraken.com</a>. (Starts with <strong>0x</strong>)
          </p>
          <input
            type="text"
            value={this.state.address}
            style={{ width: '24em' }}
            onChange={e => this.setState({ address: e.target.value, error: null })}
          />
        </div>
        <button className="button" type="submit">Deposit to Kraken</button>
         {this.state.error && <div className="error_message">{this.state.error}</div>}
      </form>
    );
  }

  state = {
    address: '',
  }
}
