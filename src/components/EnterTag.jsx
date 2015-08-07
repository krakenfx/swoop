import React, { PropTypes, Component } from 'react';
import deposit from '../../src/deposit';

function isTagValid(tag) {
  return !!tag.match(/^([A-Z0-9]{11})?[A-Z0-9]{9}$/);
}

export default class EnterTag extends Component {
  static propTypes = {
    onSent: PropTypes.func.isRequired,
    wallet: PropTypes.object,
    amount: PropTypes.string,
  }

  onSubmit = (event) => {
    event.preventDefault();

    const { tag } = this.state;

    if (!isTagValid(tag)) {
      this.setState({
        error: 'Invalid account id',
      });
      return;
    }

    deposit(
      this.props.wallet.address,
      tag,
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
        <div className="enter-tag">
          <label>Enter account id</label>
          <p className="semi_info">
            You can find this under Funding, Deposit, Ether
            on <a href="https://kraken.com">kraken.com</a>
          </p>
          <input
            type="text"
            value={this.state.tag}
            onChange={e => this.setState({ tag: e.target.value, error: null })}
          />
        </div>
        <button className="button" type="submit">Deposit to Kraken</button>
         {this.state.error && <div className="error_message">{this.state.error}</div>}
      </form>
    );
  }

  state = {
    tag: '',
  }
}
