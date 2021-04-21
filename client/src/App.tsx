import React, { FunctionComponent } from 'react';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import MetaTags from 'react-meta-tags';
import CssBaseline from '@material-ui/core/CssBaseline';
import Layout from './components/Layout';
import 'fontsource-roboto';

const App: FunctionComponent<unknown> = () => {
    let endpoint;
    if (typeof window === 'undefined') {
        endpoint = 'http://api';
    } else {
        const { host: originalHost, protocol } = window.location;
        const host = originalHost.indexOf(':') > -1 ? originalHost.split(':')[0] : originalHost;
        endpoint = `${protocol}//${host.split(':')[0]}:4000`;
    }

    const client = new ApolloClient({
        uri: `${endpoint}/graphql`,
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
