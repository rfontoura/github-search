import React, { FunctionComponent } from 'react';
import { CircularProgress } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { SearchResult } from '../graphql/query';

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

type UsersListType = {
    isLoading?: boolean;
    searchResult: SearchResult;
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
            {searchResult.nodes.map((userNode) => (
                <div key={userNode.avatarUrl}>
                    <div>
                        <img src={userNode.avatarUrl} alt={userNode.name} className={styles.avatar} />
                    </div>
                    <div style={{ fontWeight: 'bold' }}>
                        [isGitHubStar *]{userNode.name}, created at {formatDate(userNode.createdAt)}
                    </div>
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
