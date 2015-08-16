# swoop

Ethreum pre-sale wallet importer.

| Branch     | Unit Tests |
|------------|------------|
| master     | [![Build Status](https://travis-ci.org/krakenfx/swoop.svg)](https://travis-ci.org/krakenfx/swoop) |

![Swoop](https://github.com/krakenfx/swoop/raw/master/logo.png)

## Installing

```
git clone https://github.com/krakenfx/swoop.git
```

## Running

```
GETH_RPC_URL=https://geth.kraken.com:2096 \
KRAKEN_ADDRESS=2910543af39aba0cd09dbb2d50200b3e800a63d2 \
npm run hot
```

And open your browser to `http://localhost:8080`

## Building

### Local webserver with hot module reloading

```
GETH_RPC_URL=https://geth.kraken.com:2096 \
KRAKEN_ADDRESS=2910543af39aba0cd09dbb2d50200b3e800a63d2 \
npm run hot
```

### Development version

```
GETH_RPC_URL=https://geth.kraken.com:2096 \
KRAKEN_ADDRESS=2910543af39aba0cd09dbb2d50200b3e800a63d2 \
npm run dev
```

### Production version

```
GETH_RPC_URL=https://geth.kraken.com:2096 \
KRAKEN_ADDRESS=2910543af39aba0cd09dbb2d50200b3e800a63d2 \
npm run prod
```

## Tests

`npm test`

And integration tests:

```
GETH_RPC_URL=https://geth.kraken.com:2096 \
npm run integration
```

## Author

Andreas Brekken <andreas@kraken.com>

## Acknowledgements

- UX by [Nicolai R. Nielsen](https://twitter.com/nrnielsen)
- Local signing by [Nick Dodson](https://github.com/SilentCicero)

## License

ISC
