import React, { Fragment } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import styles from './styles.module.css';

function SimpleCard(props) {
  const { funds, totalValue } = props;

  return (
    <div className={styles.summaryContainer}>
        {funds.length > 0 &&
            <Card className={styles.card}>
            <CardContent>
                {funds.map((fund) => {
                    const {fundId, amount, curretValue, currentNav} = fund;
                    return (
                        <Fragment>
                        <div className={styles.fundRow}>
                            <p>Fund Id : {fundId}</p>
                            <p>Invested Amount : {amount}</p>
                            <p>Curret Value : {curretValue}</p>
                            <p>Current Nav : {currentNav}</p>
                        </div>
                        </Fragment>);
                })}
                <h2>total Amount: {totalValue}</h2>
            </CardContent>
            </Card>
        }
    </div>
  );
}

export default withStyles(styles)(SimpleCard);
