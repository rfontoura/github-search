import React, { FunctionComponent, useCallback, useState } from 'react';
import { useLazyQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';

import { SEARCH_USERS, SearchUsersParametersType, SearchUsersResultType } from '../graphql/query';
import PageHeader from './PageHeader';
import UsersList from './UsersList';
import SearchTips from './SearchTips';

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
            maxWidth: '1730px',
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
        loading: {
            width: '200px',
            height: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
    }));

    const classes = useStyles();

    const [query, setQuery] = useState('');
    const [runQuery, { loading, error, data }] = useLazyQuery<SearchUsersResultType, SearchUsersParametersType>(
        SEARCH_USERS,
        {
            variables: {
                query,
            },
        },
    );

    const runSearch = useCallback(() => {
        runQuery({
            variables: { query },
        });
    }, [query, runQuery]);

    const onClickNext = useCallback(() => {
        runQuery({
            variables: {
                query,
                direction: 'FORWARD',
                cursor: data?.searchUsers?.endCursor,
            },
        });
    }, [data?.searchUsers?.endCursor, query, runQuery]);

    const onClickPrevious = useCallback(() => {
        runQuery({
            variables: {
                query,
                direction: 'BACKWARD',
                cursor: data?.searchUsers?.startCursor,
            },
        });
    }, [data?.searchUsers?.startCursor, query, runQuery]);

    const onPressEnter = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.code === 'Enter') {
                runSearch();
            }
        },
        [runSearch],
    );

    const containerStyle = {} as Record<string, unknown> | { style: { height: string } };
    if (!data && !loading && !error) {
        containerStyle.style = {
            height: '100vh',
        };
    }

    return (
        <div className={classes.container}>
            <Container component="main" maxWidth="sm" className={classes.container} {...containerStyle}>
                <PageHeader />
                <div className={classes.searchRow}>
                    <TextField
                        type="search"
                        variant="outlined"
                        id="query"
                        label="Search users at GitHub"
                        name="query"
                        size="medium"
                        autoFocus
                        fullWidth
                        className={classes.searchField}
                        onKeyDown={onPressEnter}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <SearchTips initiallyFolded={!!data} />
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
                {loading && (
                    <div className={classes.loading}>
                        <CircularProgress size={40} />
                    </div>
                )}
                {error && <div>ERROR: `${error}`</div>}
            </Container>
            {!error && !!data && (
                <Container maxWidth="xl" className={classes.listContainer}>
                    <UsersList
                        searchResult={data.searchUsers}
                        onClickNext={onClickNext}
                        onClickPrevious={onClickPrevious}
                    />
                </Container>
            )}
        </div>
    );
};

export default Layout;
