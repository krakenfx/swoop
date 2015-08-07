import React, { PropTypes, Component } from 'react';

export default class LoadWallet extends Component {
  static propTypes = {
    onLoad: PropTypes.func.isRequired,
  }

  onChangeFile = (event) => {
    this.setState({ error: null });

    const file = event.target.files[0];
    if (!file) { return; }

    if (typeof FileReader !== 'function') {
      this.setState({ error: 'Browser too old. Try Chrome.' });
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      let wallet;

      try {
        wallet = JSON.parse(e.target.result);
      } catch (err) {
        this.setState({ error: 'File is not an Ethereum wallet.json' });
        return;
      }

      if (!wallet || !wallet.encseed) {
        this.setState({ error: 'File is not an Ethereum wallet.json' });
        return;
      }

      this.props.onLoad(wallet);
    };

    reader.onerror = () => {
      this.setState({ error: `Failed to read file: ${reader.error.message}` });
    };

    reader.readAsText(file);
  }

  render() {
    return (
      <div className="load-wallet">
        <label>Select your wallet</label>
        <p>Choose the wallet.json file from the pre-sale.</p>
        <input type="file" onChange={this.onChangeFile} className="custom-file-input" />
         {this.state.error && <div className="error_message">{this.state.error}</div>}
      </div>
    );
  }

  state = {}
}
