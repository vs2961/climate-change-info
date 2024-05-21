import React from "react";
import PropTypes from "prop-types";
import { OutlinedInput, withStyles } from "@material-ui/core";
import currencyPrettyPrint from "../../../shared/functions/currencyPrettyPrint";
import { textAlign } from "@material-ui/system";

const styles = {
  input: { padding: "0px 9px", cursor: "pointer" },
  outlinedInput: {
    height: 40,
    cursor: "pointer",
    textAlign: "center"
  },
  wrapper: {
    display: "flex",
    alignItems: "center"
  }
};

function Balance(props) {
  const { balance, classes, openAddBalanceDialog } = props;
  const width = String(Math.round(balance[0].footprint)).length * 9.5 + 110;
  console.log(width);
  return (
    <div className={classes.wrapper}>
      <OutlinedInput
        value={balance === null ? "" : Math.round(balance[0].footprint) + " kg CO2/year"}
        className={classes.outlinedInput}
        classes={{ input: classes.input }}
        style={{width: width}}
        readOnly
        labelWidth={0}
        // onClick={openAddBalanceDialog}
      />
    </div>
  );
}

Balance.propTypes = {
  balance: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  openAddBalanceDialog: PropTypes.func.isRequired
};

export default withStyles(styles)(Balance);
