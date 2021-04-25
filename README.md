# GitHub Searcher

This project provides access to the GitHub user search API without requiring authentication from the final user, using
React, NodeJS and GraphQL (Apollo).

## Configuration

- To provide a GitHub user search interface, you must provide an OAuth token that give access to the API. To do
that, follow [the steps described here](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql).
After creating the token, make a copy of `/server/.env.sample` to `/server/.env` and put it on the
`GH_TOKEN` variable
- Make sure you have [NodeJS](https://nodejs.org/en/) and [yarn](https://yarnpkg.com/) installed
- On the root folder, run `./start` to install and run the backend and frontend apps

## Structure

1. `client` - the folder containing the frontend (React)
2. `server` - the only purpose of this backend app is to protect the GitHub token that provides data to the frontend.
Anyway, that's a good example on how to run GraphQL client on a backend app. This folder contains the backend, composed
of NodeJS server, Apollo Server to provide data to the frontend and a server to connect to the GitHub GraphQL API.