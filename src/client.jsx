/* global GETH_RPC_URL */
import React from 'react';
import Application from './components/Application';
import web3 from 'web3';
import '../styles/index.styl';

const provider = new web3.providers.HttpProvider(GETH_RPC_URL);
web3.setProvider(provider);

React.render(
  <Application />,
  document.body
);
