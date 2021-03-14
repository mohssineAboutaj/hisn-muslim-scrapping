# husn muslim scrapper

- [husn muslim scrapper](#husn-muslim-scrapper)
  - [About](#about)
  - [Features](#features)
  - [Project Structure & files functionality](#project-structure--files-functionality)
  - [Requirements](#requirements)
  - [Download](#download)
  - [Install Dependencies](#install-dependencies)
  - [Usage](#usage)
    - [Developement](#developement)
    - [Production](#production)
    - [Custom](#custom)
  - [Thanks](#thanks)
  - [License](#license)

## About

A sample JavaScript/NodeJs scrapper project based on [hisnmuslim API](https://hisnmuslim.com/api/husn.json) to use all off the test & audios offline without the connecting with the original api

## Features

- get all the adhkars as text in _ARABIC_ & _ENGLISH_
- download audio's of the adhkars
- merge all of these info in one place in json file as a book

## Project Structure & files functionality

- _index.js_ fetch & create adkar main page in one json file
- _fetch.js_ fetch/download the dikr text & audio
- _merge.js_ merge/concat the data commes from _index.js_ & _fetch.js_
- _fetch-sub.js_ fetch sub adkar related to the main adkar fetched in _fetch.js_

## Requirements

- [Nodejs](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/)

## Download

you can clone this repository or download as zip file

## Install Dependencies

```sh
npm install
```

or

```sh
yarn install
```

## Usage

the default language of the data fetched is AR

### Developement

```sh
npm dev
```

or

```sh
yarn dev
```

- fetch with english translation

```sh
npm dev:en
```

or

```sh
yarn dev:en
```

### Production

```sh
npm start
```

or

```sh
yarn start
```

- fetch with english translation

```sh
npm start:en
```

or

```sh
yarn start:en
```

### Custom

you can also run specifie step `see scripts properties` this need you to be a developer

## Thanks

thenk you very much for the [hisnmuslim](https://hisnmuslim.com/) owner(s), baraka llaho fika

## License

[MIT](./LICENSE)
