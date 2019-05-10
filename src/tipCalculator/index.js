import React, { Component } from 'react';
import {
    Grid,
    Paper,
    TextField,
    Typography,
    withStyles
} from '@material-ui/core'
import styles from './styles'

class TipCalculator extends Component {
    state = {
        subTotal: '',
        total: '',
        tipPercent: 20,
    }

    moneyRegex = /^[0-9]{0,5}\.?([0-9]{1,2})?$/g;

    onSubTotalChange = (event) => {
        const value = event.target.value;
        this.moneyRegex.lastIndex = 0;

        if (this.moneyRegex.test(value)) {
            this.setState({ subTotal: value });
        }
    }

    onTotalChange = (event) => {
        const value = event.target.value;
        this.moneyRegex.lastIndex = 0;

        if (this.moneyRegex.test(value)) {
            this.setState({ total: value });
        }
    }

    render() {

        const { total, tipPercent } = this.state;
        const tipAmount = Math.ceil(+total * (+tipPercent / 100) * 100) / 100;
        const totalWithTip = +total + tipAmount;
        const totalWithTipRounded = Math.ceil(totalWithTip);
        const roundedTipAmount = totalWithTipRounded - +total;
        const roundedTotalTipPercentage = Math.ceil((totalWithTipRounded / +total - 1) * 10000) / 100;

        return (
            <Grid
                container
                alignItems="center"
                justify="center">
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <Paper style={{ padding: 20 }}>
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
                        <Typography variant="h6">Percentage: {roundedTotalTipPercentage}%</Typography>
                        <Typography variant="h6">Tip: ${roundedTipAmount.toFixed(2)}</Typography>
                        <Typography variant="h6">Total: ${totalWithTipRounded.toFixed(2)}</Typography>
                    </Paper>
                </Grid>
            </Grid>
        )
    }
}

export default withStyles(styles)(TipCalculator);