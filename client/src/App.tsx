import React, { FunctionComponent } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import MetaTags from 'react-meta-tags';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';
import 'fontsource-roboto';

const App: FunctionComponent<unknown> = () => {
    const endpoint = process.env.REACT_APP_ENDPOINT || 'http://localhost:4000/graphql';
    const client = new ApolloClient({
        uri: `${endpoint}`,
        cache: new InMemoryCache(),
    });

    return (
        <ApolloProvider client={client}>
            <MetaTags>
                <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
            </MetaTags>
            <CssBaseline />
            <Layout />
        </ApolloProvider>
    );
};

export default App;
