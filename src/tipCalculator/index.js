import React, { Component } from 'react';
import {
    Grid,
    Paper,
    TextField,
    Typography,
    withStyles,
    Button
} from '@material-ui/core'
import styles from './styles'

class TipCalculator extends Component {
    state = {
        subTotal: '',
        total: '',
        tipPercent: localStorage.tipAmount || 20,
        totalWithTipRounded: 0,
    }

    moneyRegex = /^[0-9]{0,5}\.?([0-9]{1,2})?$/g;

    onSubTotalChange = (event) => {
        const value = event.target.value;
        this.moneyRegex.lastIndex = 0;

        if (this.moneyRegex.test(value)) {
            this.setState({ subTotal: value }, () => { this.calculateTip() });
        }
    }

    onTotalChange = (event) => {
        const value = event.target.value;
        this.moneyRegex.lastIndex = 0;

        if (this.moneyRegex.test(value)) {
            this.setState({ total: value }, () => { this.calculateTip() });
        }
    }

    handleChangeFinalTotal = (amount) => {
        if (this.state.totalWithTipRounded + amount >= 0 && this.state.total) {
            this.setState((prev) => {
                return {
                    totalWithTipRounded: prev.totalWithTipRounded + amount,
                }
            },
                () => {
                    this.setState({ tipPercent: this.roundedTotalTipPercentage() },
                        () => {
                            localStorage.setItem("tipAmount", this.state.tipPercent)
                        }
                    )
                }
            );
        }
    }

    calculateTip = () => {
        const { tipPercent, total, subTotal } = this.state;
        const tipOnAmount = +subTotal !== 0 ? subTotal : total;
        const tipAmount = Math.ceil(+tipOnAmount * (+tipPercent / 100) * 100) / 100;
        const totalWithTip = +total + tipAmount;
        const roundedTotal = Math.ceil(totalWithTip);

        this.setState({ totalWithTipRounded: roundedTotal });
    }

    roundedTipAmount = () => {
        const { total, totalWithTipRounded } = this.state;
        return totalWithTipRounded - +total;
    }

    roundedTotalTipPercentage = () => {
        const { total, subTotal, totalWithTipRounded } = this.state;
        if (+subTotal !== 0) {
            const tipAmount = totalWithTipRounded - +total;
            const subTotalWithTip = +subTotal + tipAmount;
            return Math.ceil((subTotalWithTip / +subTotal - 1) * 10000) / 100;
        }
        return Math.ceil((totalWithTipRounded / +total - 1) * 10000) / 100
    }

    render() {
        const { classes } = this.props;
        const { totalWithTipRounded } = this.state;

        return (
            <Grid
                container
                alignItems="center"
                justify="center">
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Paper style={{ padding: 20 }}>
                        <Grid container>
                            <Grid
                                item xs={1}>
                                <Button
                                    className={classes.adjustedButton}
                                    variant="contained"
                                    onClick={() => this.handleChangeFinalTotal(-1)}>
                                    -</Button>
                            </Grid>
                            <Grid container item xs={10} justify="center">

                                <Grid item xs={10}>
                                    <TextField
                                        style={{ display: "block" }}
                                        variant="outlined"
                                        label="subtotal"
                                        value={this.state.subTotal}
                                        onChange={this.onSubTotalChange} />
                                    <TextField
                                        style={{ display: "block" }}
                                        variant="outlined"
                                        margin="normal"
                                        label="total"
                                        value={this.state.total}
                                        onChange={this.onTotalChange} />
                                    <Typography variant="h6">Percentage: {this.roundedTotalTipPercentage() || this.state.tipPercent}%</Typography>
                                    <Typography variant="h6">Tip: ${this.roundedTipAmount().toFixed(2)}</Typography>
                                    <Typography variant="h6">Total: ${totalWithTipRounded.toFixed(2)}</Typography>
                                </Grid>
                            </Grid>
                            <Grid
                                item xs={1}
                                className={classes.buttonBackground}>
                                <Button
                                    className={classes.adjustedButton}
                                    variant="contained"
                                    onClick={() => this.handleChangeFinalTotal(1)}>
                                    +</Button>

                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TipCalculator);