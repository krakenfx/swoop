import React, { PropTypes, Component } from 'react';
import web3 from 'web3';

export default class Balance extends Component {
  static propTypes = {
    address: PropTypes.string.isRequired,
  }

  constructor(props) {
    super(props);
    if (props.address) { this.fetch(); }
  }

  componentDidReceiveProps(prevProps) {
    if (prevProps.address !== this.props.address) {
      this.fetch();
    }
  }

  fetch() {
    this.setState({ loading: true, error: null, balance: null });

    web3.eth.getBalance(this.props.address, (error, balance) => {
      this.setState({ loading: false });
      if (error) { this.setState({ error }); }
      this.setState({ balance });
    });
  }

  render() {
    if (this.state.loading) {
      return <span className="semi_info">Fetching balance...</span>;
    }

    if (this.state.error) {
      return <span className="semi_info" title={this.state.error.message}>Could not fetch balance</span>;
    }

    // Convert to ETH and round down.
    const ethBalance = web3.fromWei(web3.toBigNumber(this.state.balance), 'ether').toFixed(2, 1);

    return <span className="semi_info">You have {ethBalance} ETH</span>;
  }

  state = {
    error: null,
    loading: false,
  }
}
