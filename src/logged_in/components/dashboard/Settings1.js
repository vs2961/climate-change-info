import React, { useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  List,
  ListItem,
  ListItemSecondaryAction,
  Button,
  Accordion,
  AccordionSummary,
  Typography,
  ListItemText,
  OutlinedInput,
  AccordionDetails,
  MenuItem,
  FormControl,
  Select,
  Box,
  withStyles,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import withWidth from "@material-ui/core/withWidth";
import Bordered from "../../../shared/components/Bordered";
import ButtonCircularProgress from "../../../shared/components/ButtonCircularProgress";

const styles = (theme) => ({
  numberInput: {
    width: 110,
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  dBlock: { display: "block" },
  listItemLeftPadding: {
    paddingRight: theme.spacing(3),
  },
  accordionDetails: {
    paddintTop: theme.spacing(0),
    justifyContent: "flex-end",
  },
});
const inputOptions = ["None", "Slow", "Normal", "Fast"];

function Settings1(props) {
  const { classes, pushMessageToSnackbar } = props;
  const [isSaveLoading, setIsSaveLoading] = useState(false);
  const [isDefaultLoading, setIsDefaultLoading] = useState(false);
  const [option1, setOption1] = useState("None");
  const [option2, setOption2] = useState("None");
  const [option3, setOption3] = useState("None");
  const [option4, setOption4] = useState("None");
  const [option5, setOption5] = useState("2 Days");
  const [option6, setOption6] = useState(7500);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      if (name === "option6") {
        if (value > 7500 || value < 1000) {
          return;
        }
      }
      switch (name) {
        case "option1": {
          setOption1(value);
          break;
        }
        case "option2": {
          setOption2(value);
          break;
        }
        case "option3": {
          setOption3(value);
          break;
        }
        case "option4": {
          setOption4(value);
          break;
        }
        case "option5": {
          setOption5(value);
          break;
        }
        case "option6": {
          setOption6(value);
          break;
        }
        default:
          throw new Error("No branch selected in switch statement.");
      }
    },
    [setOption1, setOption2, setOption3, setOption4, setOption5, setOption6]
  );

  const resetState = useCallback(() => {
    setIsSaveLoading(false);
    setIsDefaultLoading(false);
    setOption1("None");
    setOption2("None");
    setOption3("None");
    setOption4("None");
    setOption5("2 Days");
    setOption6(7500);
  }, [
    setIsSaveLoading,
    setIsDefaultLoading,
    setOption1,
    setOption2,
    setOption3,
    setOption4,
    setOption5,
    setOption6,
  ]);

  const onSetDefault = useCallback(() => {
    setIsDefaultLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your settings have been reset to default",
      });
      resetState();
    }, 1500);
  }, [pushMessageToSnackbar, resetState]);

  const onSubmit = useCallback(() => {
    setIsSaveLoading(true);
    setTimeout(() => {
      pushMessageToSnackbar({
        text: "Your settings have been saved",
      });
      setIsSaveLoading(false);
    }, 1500);
  }, [setIsSaveLoading, pushMessageToSnackbar]);

  const inputs = [
    {
      state: option1,
      label: "Option 1",
      stateName: "option1",
    },
    {
      state: option2,
      label: "Option 2",
      stateName: "option2",
    },
    {
      state: option3,
      label: "Option 3",
      stateName: "option3",
    },
    {
      state: option4,
      label: "Option 4",
      stateName: "option4",
    },
  ];

  return (
    <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Retake Carbon Footprint Test</Typography>
      </AccordionSummary>
      <AccordionSummary>
        <Typography>
          Doing this will reset all your progress. You will need to 
          answer all the initial questions again to determine your carbon footprint.
          Are you sure?
        </Typography>
      </AccordionSummary>

      <AccordionDetails className={classes.accordionDetails}>
        <Button
          variant="contained"
          color="secondary"
          disabled={isSaveLoading || isDefaultLoading}
          onClick={onSubmit}
        >
          Yes, I'm sure {isSaveLoading && <ButtonCircularProgress />}
        </Button>
      </AccordionDetails>
    </Accordion>
  );
}

Settings1.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  pushMessageToSnackbar: PropTypes.func,
};

export default withWidth()(withStyles(styles, { withTheme: true })(Settings1));
