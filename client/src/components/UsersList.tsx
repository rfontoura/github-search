import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserSearchResult } from '../graphql/query';
import UserCard from './UserCard';

const useStyles = makeStyles((theme) => ({
    loading: {
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    usersList: {
        display: 'flex',
        marginTop: theme.spacing(2),
        flexWrap: 'wrap',
        width: '100%',
    },
}));

type UsersListType = {
    isLoading?: boolean;
    searchResult: UserSearchResult;
};

const UsersList: FunctionComponent<UsersListType> = ({ searchResult, isLoading = false }: UsersListType) => {
    const styles = useStyles();

    if (isLoading) {
        return (
            <div className={styles.loading}>
                <CircularProgress size={40} />
            </div>
        );
    }

    if (!searchResult) {
        return null;
    }

    if (!searchResult.userCount) {
        return <div>Users not found</div>;
    }

    return (
        <div className={styles.usersList}>
            {searchResult.users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    );
};

UsersList.defaultProps = {
    isLoading: false,
};

export default UsersList;
