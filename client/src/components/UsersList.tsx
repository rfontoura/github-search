import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserSearchResult } from '../graphql/query';
import UserCard from './UserCard';
import Pagination from './Pagination';

const useStyles = makeStyles((theme) => ({
    usersList: {
        display: 'flex',
        marginTop: theme.spacing(2),
        flexWrap: 'wrap',
        width: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
}));

type UsersListType = {
    searchResult: UserSearchResult;
    onClickNext: () => void;
    onClickPrevious: () => void;
};

const UsersList: FunctionComponent<UsersListType> = ({ searchResult, onClickNext, onClickPrevious }: UsersListType) => {
    const styles = useStyles();
    const { hasNextPage, hasPreviousPage } = searchResult;

    if (!searchResult) {
        return null;
    }

    if (!searchResult.userCount) {
        return <div>Users not found</div>;
    }

    return (
        <Container maxWidth="xl" className={styles.container}>
            <Pagination
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onClickNext={onClickNext}
                onClickPrevious={onClickPrevious}
                total={searchResult.userCount}
            />
            <div className={styles.usersList}>
                {searchResult.users.map((user) => (
                    <UserCard key={user.id} user={user} />
                ))}
            </div>
        </Container>
    );
};

export default UsersList;
