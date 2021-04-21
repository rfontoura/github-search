# GitHub Searcher

This project provides access to the GitHub user search API without requiring authentication to the final user, using
React, NodeJS and GraphQL (Apollo).

# Configuration

To provide a GitHub user search interface, you must provide an OAuth token that give access to the API. To do
that, follow [the steps described here](https://docs.github.com/en/graphql/guides/forming-calls-with-graphql#authenticating-with-graphql).
After create the token, make a copy of `/server/.env.sample` to `/server/.env` and put it on the
`GH_TOKEN` variable.

## Structure

1. **TODO** `./start` - run this file to start both backend and frontend
2. `client` - the folder containing the frontend (React)
3. `server` - the folder containing the backend, composed of NodeJS server, Apollo Server to provide data to the frontend
and a server to connect to the GitHub GraphQL API.