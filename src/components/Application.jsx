import React, { Component } from 'react';
import LoadWallet from './LoadWallet';
import WalletPassword from './WalletPassword';
import EnterAmount from './EnterAmount';
import web3 from 'web3';
import EnterAddress from './EnterAddress';
import overrideSendTransaction from '../overrideSendTransaction';
import Stage from './Stage';
import Sent from './Sent';

export default class Application extends Component {
  componentWillMount() {
    overrideSendTransaction(web3.eth, () => {
      return this.state.wallet.privKey;
    });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.stage !== this.state.stage) {
      const ref = this.refs[`${this.state.stage}-stage`];
      if (!ref) { return; }
      const node = React.findDOMNode(ref);
      if (!node.scrollIntoView) { return; }
      node.scrollIntoView(false);
    }
  }

  onLoadWallet = (wallet) => {
    this.setState({
      stage: 'decrypt-wallet',
      originalWallet: wallet,
    });
  }

  onWalletPassword = (wallet) => {
    this.setState({
      wallet,
      stage: 'amount',
    });
  }

  onEnterAmount = (amount) => {
    this.setState({
      amount,
      stage: 'address',
    });
  }

  onSent = (hash) => {
    this.setState({
      stage: 'sent',
      hash,
    });

    // Scroll to bottom
    setTimeout(() => {
      window.scrollTo(0, document.body.scrollHeight);
    }, 50);
  }

  onClickRestart = (event) => {
    event.preventDefault();
    window.scrollTo(0, 0);
    location.reload();
  }

  render() {
    return (
      <div className="application">
        <button className="button restart" onClick={this.onClickRestart}>
          Restart
        </button>
        <div className="heading">
          <img src={require('../../assets/kraken.png')} />
          <h1>Claim your ether pre-sale wallet</h1>
          <p>
            Use this <a href="https://github.com/krakenfx/swoop" title="View on Github">open source</a> tool to send ethers from your pre-sale wallet to Kraken.
          </p>
        </div>

        <div className="stages">
          <Stage number="1" active={this.state.stage === 'load-wallet'} ref="load-wallet-stage">
            <LoadWallet onLoad={this.onLoadWallet} />
          </Stage>
          <Stage number="2" active={this.state.stage === 'decrypt-wallet'} ref="decrypt-wallet-stage">
            <WalletPassword onPassword={this.onWalletPassword} wallet={this.state.originalWallet} />
          </Stage>
          <Stage number="3" active={this.state.stage === 'amount'} ref="amount-stage">
            <EnterAmount onAmount={this.onEnterAmount} address={this.state.originalWallet && this.state.originalWallet.ethaddr} />
          </Stage>
          <Stage number="4" active={this.state.stage === 'address'} ref="address-stage">
            <EnterAddress amount={this.state.amount} onSent={this.onSent} wallet={this.state.wallet} />
          </Stage>
          {this.state.stage === 'sent' && <Stage active={this.state.stage === 'sent'} ref="sent-stage">
            <Sent hash={this.state.hash} />
          </Stage>}
        </div>
      </div>
    );
  }

  state = {
    stage: 'load-wallet',
  }
}
