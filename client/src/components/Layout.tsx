import React, { FunctionComponent } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
    display: flex;
    padding: 50px;
`;

const Layout: FunctionComponent<unknown> = () => (
    <Container>
        <p>Some text</p>
    </Container>
);

export default Layout;
