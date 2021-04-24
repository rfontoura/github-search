import React, { FunctionComponent, useMemo } from 'react';
import { Button } from '@material-ui/core';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import { makeStyles } from '@material-ui/core/styles';

type PaginationType = {
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    total?: number;
    onClickNext: () => void;
    onClickPrevious: () => void;
    showTotal?: boolean;
};

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width: '100%',
    },
    buttonContainer: {
        marginLeft: theme.spacing(1),
        width: theme.spacing(8),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
}));

const Pagination: FunctionComponent<PaginationType> = ({
    hasNextPage,
    hasPreviousPage,
    total = 0,
    onClickNext,
    onClickPrevious,
    showTotal = true,
}: PaginationType) => {
    const styles = useStyles();
    const formatter = useMemo(() => new Intl.NumberFormat(), []);
    return (
        <div className={styles.container}>
            {showTotal && <div>{`${formatter.format(total)} ${total === 1 ? 'user' : 'users'} found`}</div>}
            <div className={styles.buttonContainer}>
                <Button disabled={!hasPreviousPage} onClick={onClickPrevious} title="Previous page">
                    <NavigateBeforeIcon />
                </Button>
            </div>
            <div className={styles.buttonContainer}>
                <Button disabled={!hasNextPage} onClick={onClickNext} title="Next page">
                    <NavigateNextIcon />
                </Button>
            </div>
        </div>
    );
};

Pagination.defaultProps = {
    total: 0,
    showTotal: true,
};

export default Pagination;
