import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';
import { useQuery } from '@apollo/client';
import { SEARCH_USERS, SearchResult } from '../graphql/query';

const Container = styled.div`
    display: flex;
    padding: 50px;
`;

const Layout: FunctionComponent<unknown> = () => {
    const { loading, error, data = { userCount: 0 } } = useQuery<SearchResult>(SEARCH_USERS, {
        variables: {
            query: 'rafael',
        },
    });

    if (error) {
        console.log('error', error);
        return (
            <div>
                <div>
                    <h1>ERROR OCURRED</h1>
                </div>
            </div>
        );
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
