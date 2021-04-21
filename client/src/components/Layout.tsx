import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { SEARCH, SearchResult } from '../graphql/query';

const Container = styled.div`
    display: flex;
    padding: 50px;
`;

const Layout: FunctionComponent<unknown> = () => {
    const { loading, error, data = { userCount: 0 } } = useQuery<SearchResult>(SEARCH, {
        variables: {
            search: 'rafael',
        },
    });

    if (error) {
        console.log('error', error);
        return <div>ERROR OCURRED</div>;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Container>
            <p>aa</p>
        </Container>
    );
};

export default Layout;
