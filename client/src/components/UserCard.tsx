import React, { FunctionComponent } from 'react';
import StarRateRoundedIcon from '@material-ui/icons/StarRateRounded';
import BusinessIcon from '@material-ui/icons/Business';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { Avatar, Paper } from '@material-ui/core';
import { User } from '../graphql/query';

const getUserInitials = (fullName: string) => {
    const names = fullName.split(' ');
    return names.map((name) => name.charAt(0).toUpperCase()).join();
};

type AvatarOrInitialsType = {
    user: User;
    avatarStyle: string;
};

const AvatarOrInitials = ({ user, avatarStyle }: AvatarOrInitialsType) => {
    const { avatarUrl, name, login } = user;
    if (avatarUrl) {
        return (
            <div>
                <Avatar variant="circular" src={user.avatarUrl} className={avatarStyle} />
            </div>
        );
    }
    const initials = getUserInitials(name || login);
    return (
        <div>
            <Avatar variant="circular" className={avatarStyle} style={{ backgroundColor: 'orange' }}>
                {initials}
            </Avatar>
        </div>
    );
};

const GitHubStar = ({ user }: { user: User }) => {
    // see https://stars.github.com/
    if (!user.isGitHubStar) {
        return null;
    }
    return <StarRateRoundedIcon style={{ fontSize: 30 }} color="primary" />;
};

const useStyles = makeStyles((theme) => {
    const cardWidth = theme.spacing(20);
    return {
        icon: {
            root: {
                marginRight: theme.spacing(1),
            },
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: theme.spacing(0.5),
        },
        container: {
            margin: theme.spacing(1),
            padding: theme.spacing(2),
            width: cardWidth + theme.spacing(12),
            display: 'flex',
            flexDirection: 'column',
        },
        avatar: {
            height: cardWidth,
            width: cardWidth,
        },
        avatarContainer: {
            display: 'flex',
            justifyContent: 'center',
        },
        flexCenter: {
            display: 'flex',
            alignItems: 'center',
            marginTop: theme.spacing(1),
        },
        name: {
            marginTop: theme.spacing(1),
            fontWeight: 700,
            fontSize: '1.2rem',
        },
        login: {
            marginTop: '0.2rem',
            fontSize: '0.9rem',
            color: '#888888',
        },
        followersLine: {
            marginTop: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        },
        createdAt: {
            fontSize: '1.1rem',
            fontStyle: 'italic',
            color: '#333333',
        },
    };
});

type UserCardType = {
    user: User;
};

const UserCard: FunctionComponent<UserCardType> = ({ user }: UserCardType) => {
    const styles = useStyles();
    return (
        <Paper className={styles.container}>
            <div className={styles.avatarContainer}>
                <AvatarOrInitials user={user} avatarStyle={styles.avatar} />
            </div>
            <div className={styles.flexCenter}>
                {user.name && (
                    <div className={styles.flexCenter}>
                        <div
                            title="This person is a GitHub star!"
                            style={{ lineHeight: '0.5rem' }}
                            className={styles.flexCenter}
                        >
                            <a rel="noreferrer" href="https://stars.github.com/profiles/" target="_blank">
                                <GitHubStar user={user} />
                            </a>
                        </div>
                        <div className={styles.name}>{user.name}</div>
                    </div>
                )}
            </div>
            <div className={styles.login}>{user.login}aa</div>
            {user.bio && <div>{user.bio}</div>}
            {user.company && (
                <div className={styles.flexCenter}>
                    <div className={styles.icon}>
                        <BusinessIcon color="primary" />
                    </div>
                    <div>{user.company}</div>
                </div>
            )}
            {user.location && (
                <div className={styles.flexCenter}>
                    <div className={styles.icon}>
                        <LocationOnOutlinedIcon color="primary" />
                    </div>
                    <div>{user.location}</div>
                </div>
            )}
            <div className={styles.followersLine}>
                <div className={styles.icon}>
                    <PeopleAltOutlinedIcon className={styles.icon} />
                </div>
                {user.followers} followers · {user.following} following ·{' '}
            </div>
            <div className={styles.flexCenter}>
                Repositories: {user.repositories} ·{' '}
                <div>
                    <StarRateRoundedIcon />
                </div>
                <span title={`${user.starredRepositories} starred repositories`}>{user.starredRepositories}</span>
            </div>
        </Paper>
    );
};

export default UserCard;
