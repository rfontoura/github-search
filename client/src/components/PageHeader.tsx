import React, { FunctionComponent } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
    },
    icon: {
        marginTop: theme.spacing(1),
        marginRight: theme.spacing(1),
        fontSize: '3.5rem',
    },
}));

const PageHeader: FunctionComponent<unknown> = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div>
                <SearchIcon className={styles.icon} color="primary" />
            </div>
            <Typography component="h1" variant="h3">
                GitHub User Search
            </Typography>
        </div>
    );
};

export default PageHeader;
