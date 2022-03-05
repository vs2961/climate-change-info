import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Grid,
  TablePagination,
  Divider,
  Toolbar,
  Typography,
  Button,
  Paper,
  Box,
  withStyles,
} from "@material-ui/core";
import SubscriptionTable from "../subscription/SubscriptionTable";

const styles = {
  dBlock: { display: "block" },
  dNone: { display: "none" },
  toolbar: {
    justifyContent: "space-between",
  },
};

const rowsPerPage = 25;

function Transactions(props) {
  const {
    openAddPostModal,
    classes,
    transactions
  } = props;
  const [page, setPage] = useState(0);

  return (
    <Paper>
      <Toolbar className={classes.toolbar}>
        <Typography variant="h6">Recent Actions</Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={openAddPostModal}
          disableElevation
        >
          Update Footprint
        </Button>
      </Toolbar>
      <SubscriptionTable transactions={transactions}/>
    </Paper>
  );
}

Transactions.propTypes = {
  openAddPostModal: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  setPosts: PropTypes.func.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withStyles(styles)(Transactions);
