import React, { FunctionComponent } from 'react';
import { Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { UserSearchResult } from '../graphql/query';
import UserCard from './UserCard';
import Pagination from './Pagination';
import telescopeImage from '../images/telescope.png';

const useStyles = makeStyles((theme) => ({
    usersList: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: theme.spacing(2),
        flexWrap: 'wrap',
        width: '100%',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: theme.spacing(4),
    },
    imageContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        fontSize: '1.4rem',
    },
    image: {
        width: '400px',
        height: '400px',
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
        return (
            <div className={styles.imageContainer}>
                <img
                    src={telescopeImage}
                    className={styles.image}
                    title="Technology vector created by catalyststuff - www.freepik.com"
                />
                <div style={{ textAlign: 'center' }}>
                    User not found matching your criteria.
                    <br />
                    Have you tried searching for{' '}
                    <a href="https://stars.github.com/" rel="noreferrer" target="_blank">
                        GitHub stars
                    </a>
                    ?
                </div>
            </div>
        );
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
            <Pagination
                hasNextPage={hasNextPage}
                hasPreviousPage={hasPreviousPage}
                onClickNext={onClickNext}
                onClickPrevious={onClickPrevious}
                showTotal={false}
            />
        </Container>
    );
};

export default UsersList;
