import React, { PropTypes, Component } from 'react';
import loadWallet from '../loadWallet';

export default class DecryptWallet extends Component {
  static propTypes = {
    onPassword: PropTypes.func.isRequired,
    wallet: PropTypes.object,
  }

  onSubmit = (event) => {
    event.preventDefault();

    this.setState({ error: null });

    let wallet;

    try {
      wallet = loadWallet(this.props.wallet, this.state.password);
    } catch (e) {
      console.trace(e);
      this.setState({
        error: 'Decrypt failed. Wrong password?',
      });
      return;
    }

    this.setState({ state: this.state.password.replace(/./g, '-') });

    this.props.onPassword(wallet);
  }

  render() {
    return (
      <form className="decrypt-wallet" onSubmit={this.onSubmit}>
        <div className="wallet-password">
          <label>Wallet Password</label>
          <p>Your password is never sent outside of your browser.</p>
          <input
            type="password"
            value={this.state.password}
            onChange={e => this.setState({ password: e.target.value, error: null })}
          />
        </div>
        <button className="button" type="submit">Open Wallet</button>
         {this.state.error && <div className="error_message">{this.state.error}</div>}
      </form>
    );
  }

  state = {
    password: '',
  }
}
