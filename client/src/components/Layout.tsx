import React, { FunctionComponent, useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { SEARCH_USERS } from '../graphql/query';
import PageHeader from './PageHeader';
import UsersList from './UsersList';

const Layout: FunctionComponent<unknown> = () => {
    const useStyles = makeStyles((theme) => ({
        container: {
            marginTop: theme.spacing(1),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        listContainer: {
            marginTop: theme.spacing(2),
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            maxWidth: '1680px',
        },
        searchRow: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            marginTop: theme.spacing(1),
        },
        searchField: {
            marginBottom: theme.spacing(1),
        },
        submit: {
            height: theme.spacing(4),
            width: theme.spacing(16),
        },
    }));
    const classes = useStyles();

    const [query, setQuery] = useState('');
    const [runQuery, { loading, error, data }] = useLazyQuery(SEARCH_USERS, {
        variables: {
            query,
        },
    });

    const runSearch = useCallback(() => {
        runQuery({
            variables: { query },
        });
    }, [query, runQuery]);

    const onPressEnter = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.keyCode === 13) {
                runSearch();
            }
        },
        [runSearch],
    );

    return (
        <div className={classes.container}>
            <Container component="main" maxWidth="sm">
                <div>
                    <PageHeader />
                    <div className={classes.searchRow}>
                        <TextField
                            type="search"
                            variant="outlined"
                            id="query"
                            label="Search users at GitHub"
                            helperText="e.g.: stars: > 30"
                            name="query"
                            size="medium"
                            autoFocus
                            fullWidth
                            className={classes.searchField}
                            onKeyDown={onPressEnter}
                            onChange={(e) => setQuery(e.target.value)}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                            onClick={runSearch}
                        >
                            Search
                        </Button>
                    </div>
                    {error && <div>ERROR: `${error}`</div>}
                </div>
            </Container>
            <Container maxWidth="xl" className={classes.listContainer}>
                {!error && <UsersList searchResult={data?.searchUsers} isLoading={loading} />}
            </Container>
        </div>
    );
};

export default Layout;
