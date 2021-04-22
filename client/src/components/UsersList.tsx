import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import { UserSearchResult } from '../graphql/query';
import { User } from '../../../server/src/types';

const formatDate = (dateString: string) => {
    if (!dateString) {
        return 'who knows?';
    }
    const date = new Date(dateString);
    const month = date.toLocaleString('default', { month: 'short' });
    return `${date.getDate()}/${month}/${date.getFullYear()}`;
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        marginTop: theme.spacing(8),
    },
    loading: {
        width: '200px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    avatar: {
        height: theme.spacing(12),
        width: theme.spacing(12),
        borderRadius: '20%',
    },
}));

const GitHubStar = ({ user }: { user: User }) => {
    // see https://stars.github.com/
    if (!user.isGitHubStar) {
        return null;
    }
    return <StarRateRoundedIcon style={{ paddingRight: '0.2em' }} color="primary" fontSize="small" />;
};

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
        <div>
            {searchResult.users.map((user) => (
                <div key={user.id}>
                    <div>
                        <img src={user.avatarUrl} alt={user.name} className={styles.avatar} />
                    </div>
                    <div>
                        <GitHubStar user={user} />
                        <span>{user.name}</span>
                    </div>
                    <div>Created at {formatDate(user.createdAt)}</div>
                    <div>Company</div>
                    <div>[people icon] followers * following * [star icon] starred repositories</div>
                    <div>Repositories: [repo number]</div>
                    <div>BIO</div>
                </div>
            ))}
        </div>
    );
};

UsersList.defaultProps = {
    isLoading: false,
};

export default UsersList;
