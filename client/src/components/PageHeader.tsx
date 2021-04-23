import React, { FunctionComponent } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: '2rem',
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
            <div className={styles.header}>GitHub User Search</div>
        </div>
    );
};

export default PageHeader;
