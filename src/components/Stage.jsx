import React, { Component, PropTypes } from 'react';

export default class Stage extends Component {
  static propTypes = {
    active: PropTypes.bool.isRequired,
    children: PropTypes.any.isRequired,
    number: PropTypes.string,
  }

  componentDidUpdate(prevProps) {
    if (prevProps.active !== this.props.active && this.props.active) {
      this.focusFirstInput();
    }
  }

  render() {
    return (
      <div className={'stage' + (this.props.active ? ' active' : '')} ref="stage">
        {this.props.number && <h2>{this.props.number}</h2>}
        {this.props.children}
      </div>
    );
  }

  focusFirstInput() {
    const node = this.refs.stage.getDOMNode();
    const input = node.querySelector('input').focus();
    if (!input) { return; }
    input.focus();
  }
}
