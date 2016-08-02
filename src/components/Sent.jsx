import React, { Component, PropTypes } from 'react';

export default class Sent extends Component {
  static propTypes = {
    hash: PropTypes.string.isRequired,
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      const secondsRemaining = this.state.secondsRemaining - 1;
      this.setState({ secondsRemaining });
      if (!secondsRemaining) {
        clearInterval(this.timer);
        this.timer = null;
      }
    }, 1e3);
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  render() {
    return (
      <div>
        <label>
          Deposit sent!
        </label>

        <p className="semi_info">
          Your deposit will be available on Kraken in a few minutes. The link below will work
          in around 30 seconds.
        </p>

        <p>
          <a
            className="button"
            href={`https://etherchain.org/tx/${this.props.hash}`}
            target="_blank"
            disabled={this.state.secondsRemaining > 0}
          >
            View in block explorer
            {this.state.secondsRemaining > 0 && <span>
              {' '}({this.state.secondsRemaining})
            </span>}
          </a>
        </p>
      </div>
    );
  }

  state = {
    secondsRemaining: 30,
  }
}
