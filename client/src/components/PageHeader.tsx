import React, { FunctionComponent } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Octopus from './Octopus';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: theme.spacing(1),
    },
    header: {
        fontSize: '3rem',
    },
    image: {
        marginRight: theme.spacing(2),
    },
}));

const PageHeader: FunctionComponent<unknown> = () => {
    const styles = useStyles();
    return (
        <div className={styles.container}>
            <div className={styles.image}>
                <a
                    href="https://www.freepik.com/vectors/pattern"
                    target="_blank"
                    rel="noreferrer"
                    title="Pattern vector created by macrovector - www.freepik.com"
                >
                    {/* GitHub doesn't allow to use its octopus [https://github.com/logos] :( so I had to pick another one */}
                    <Octopus />
                </a>
            </div>
            <div className={styles.header}>GitHub User Search</div>
        </div>
    );
};

export default PageHeader;
