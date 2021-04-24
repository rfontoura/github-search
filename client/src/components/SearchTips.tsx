import React, { FunctionComponent, useCallback, useState } from 'react';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    container: {
        margin: `${theme.spacing(1)}px 0 ${theme.spacing(2)}px`,
        display: 'flex',
        flexDirection: 'column',
        width: theme.spacing(69),
        fontSize: '0.9rem',
    },
    tipsContainer: {
        '& > table': {
            fontSize: '0.81rem',
            borderSpacing: 0,
        },
        '& > table > tr': {
            lineHeight: '1.2rem',
        },
        '& > table > tr > td:first-child': {
            color: '#888888',
            width: theme.spacing(28),
        },
        '& > table > tr > td:nth-child(2)': {
            width: theme.spacing(44),
        },
    },
    link: {
        marginBottom: theme.spacing(0.5),
        display: 'flex',
        alignItems: 'center',
        '&hover:': {
            fontColor: 'red',
        },
        cursor: 'pointer',
    },
}));

type SearchTipsType = {
    initiallyFolded?: boolean;
};

const SearchTips: FunctionComponent<SearchTipsType> = ({ initiallyFolded = false }: SearchTipsType) => {
    const [folded, setFolded] = useState(initiallyFolded);
    const openTips = useCallback(() => setFolded(false), []);
    const closeTips = useCallback(() => setFolded(true), []);
    const styles = useStyles();

    if (folded) {
        return (
            <div className={styles.container}>
                <div onClick={openTips} onKeyDown={openTips} role="button" tabIndex={0} className={styles.link}>
                    Show search tips <ExpandMoreIcon color="primary" />
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div onClick={closeTips} onKeyDown={closeTips} role="button" tabIndex={0} className={styles.link}>
                Hide tips <ExpandLessIcon color="primary" />
            </div>
            <div className={styles.tipsContainer}>
                <table>
                    <tr>
                        <td>fullname:&quot;Linus Torvalds&quot;</td>
                        <td>Find users with the full name &quot;Linus Torvalds&quot;.</td>
                    </tr>
                    <tr>
                        <td>tom location:&quot;San Francisco, CA&quot;</td>
                        <td>Find all tom users in &quot;San Francisco, CA&quot;.</td>
                    </tr>
                    <tr>
                        <td>chris followers:100..200</td>
                        <td>Find all chris users with followers between 100 and 200.</td>
                    </tr>
                    <tr>
                        <td>{`ryan repos:>10`}</td>
                        <td>Find all ryan users with more than 10 repositories.</td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

SearchTips.defaultProps = {
    initiallyFolded: false,
};

export default SearchTips;
