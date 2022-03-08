import React, { Fragment, useState, useCallback } from "react";
import PropTypes from "prop-types";
import {
  Typography,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  FormControl,
  Select,
  OutlinedInput,
  MenuItem,
  Box,
  withStyles,
  TextField
} from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import Bordered from "../../../shared/components/Bordered";
import ImageCropperDialog from "../../../shared/components/ImageCropperDialog";

const styles = (theme) => ({
  floatButtonWrapper: {
    position: "absolute",
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1000,
  },
  inputRoot: {
    width: 190,
    "@media (max-width:  400px)": {
      width: 160,
    },
    "@media (max-width:  360px)": {
      width: 140,
    },
    "@media (max-width:  340px)": {
      width: 120,
    },
  },
  uploadIcon: {
    fontSize: 48,
    transition: theme.transitions.create(["color", "box-shadow", "border"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  imgWrapper: { position: "relative" },
  img: {
    width: "100%",
    border: "1px solid rgba(0, 0, 0, 0.23)",
    borderRadius: theme.shape.borderRadius,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
  },
  uploadText: {
    transition: theme.transitions.create(["color", "box-shadow", "border"], {
      duration: theme.transitions.duration.short,
      easing: theme.transitions.easing.easeInOut,
    }),
  },
  numberInput: {
    right: theme.spacing(2),
  },
  numberInputInput: {
    padding: "9px 34px 9px 14.5px",
  },
  emojiTextArea: {
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    marginRight: -1,
  },
  dNone: {
    display: "none",
  },
});

const inputOptions = ["None", "Slow", "Normal", "Fast"];

function CalculatorOptions(props) {
  const {
    Dropzone,
    classes,
    files,
    deleteItem,
    onDrop,
    EmojiTextArea,
    ImageCropper,
    DateTimePicker,
    cropperFile,
    onCrop,
    onCropperClose,
    uploadAt,
    onChangeUploadAt,
    setAnswers,
    answers
  } = props;
  const [peopleInHouse, setPeopleInHouse] = useState(0);
  const [electricBillCost, setElectricBillCost] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [commuteMiles, setCommuteMiles] = useState(0);
  const [workDays, setWorkDays] = useState(0);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      switch (name) {
        case "peopleInHouse":
          setPeopleInHouse(value < 0 ? 0 : value);
          break;
        case "electricBillCost":
          setElectricBillCost(value < 0 ? 0 : value);
          break;
        case "flightCount":
          setFlightCount(value < 0 ? 0 : value);
          break;
        case "commuteMiles":
          setCommuteMiles(value < 0 ? 0 : value);
          break;
        case "workDays":
          setWorkDays(value < 0 ? 0 : value);
          break;
        default:
          throw new Error("No branch selected in switch-statement.");
      }
      console.log(answers);
      setAnswers([peopleInHouse, electricBillCost, flightCount, commuteMiles, workDays])
    },
    [setPeopleInHouse, setElectricBillCost, setFlightCount, setCommuteMiles, setWorkDays, setAnswers]
  );

  const inputs = 
    [
      {
        state: peopleInHouse,
        label: "How many people are in your household?",
        stateName: "peopleInHouse",
      },
      {
        state: electricBillCost,
        label: "What is the cost of your electric bill in dollars monthly?",
        stateName: "electricBillCost",
      },
      {
        state: flightCount,
        label: "How many flights do you take in a year?",
        stateName: "flightCount",
      },
      {
        state: commuteMiles,
        label: "How many miles do you travel to get to work each day?",
        stateName: "commuteMiles",
      },
      {
        state: workDays,
        label: "How many days did you work in the last year?",
        stateName: "workDays",
      },
    ];
  
  return (
    <Fragment>
      {/* {ImageCropper && (
        <ImageCropperDialog
          open={cropperFile ? true : false}
          ImageCropper={ImageCropper}
          src={cropperFile ? cropperFile.preview : ""}
          onCrop={onCrop}
          onClose={onCropperClose}
          aspectRatio={4 / 3}
        />
      )}
      <Typography paragraph variant="h6">
        Upload Image
      </Typography>
      <Box mb={2}>
        {EmojiTextArea && (
          <EmojiTextArea
            inputClassName={classes.emojiTextArea}
            maxCharacters={2200}
            rightContent={printFile()}
            emojiSet="google"
          />
        )}
      </Box> */}
      <Typography paragraph variant="h6">
        Questions
      </Typography>
      <List disablePadding>
        <Bordered disableVerticalPadding disableBorderRadius>
          {/* <ListItem divider disableGutters className="listItemLeftPadding">
            <ListItemText>
              <Typography variant="body2">Upload at</Typography>
            </ListItemText>
            <ListItemSecondaryAction>
              {DateTimePicker && (
                <DateTimePicker
                  value={uploadAt}
                  format="yyyy/MM/dd hh:mm a"
                  onChange={onChangeUploadAt}
                  disablePast
                />
              )}
            </ListItemSecondaryAction>
          </ListItem> */}
          {inputs.map((element, index) => (
            <ListItem
              className="listItemLeftPadding"
              disableGutters
              divider={index !== inputs.length - 1}
              key={index}
            >
              <ListItemText>
                <Typography variant="body2">{element.label}</Typography>
              </ListItemText>
              <FormControl variant="outlined">
                <ListItemText>
                  <TextField
                    name={element.stateName}
                    value={element.state}
                    onChange={handleChange}
                    type="number"
                    InputProps={{ inputProps: { min: 0} }}
                    MenuProps={{ disableScrollLock: true }}
                    variant="outlined"
                    className={classes.numberInput}
                  />
                </ListItemText>
              </FormControl>
            </ListItem>
          ))}
        </Bordered>
      </List>
    </Fragment>
  );
}

CalculatorOptions.propTypes = {
  onEmojiTextareaChange: PropTypes.func,
  DateTimePicker: PropTypes.elementType,
  EmojiTextArea: PropTypes.elementType,
  Dropzone: PropTypes.elementType,
  ImageCropper: PropTypes.elementType,
  classes: PropTypes.object,
  cropperFile: PropTypes.object,
  onCrop: PropTypes.func,
  onCropperClose: PropTypes.func,
  files: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteItem: PropTypes.func,
  onDrop: PropTypes.func,
  value: PropTypes.string,
  characters: PropTypes.number,
  uploadAt: PropTypes.instanceOf(Date),
  onChangeUploadAt: PropTypes.func,
};

export default withStyles(styles, { withTheme: true })(CalculatorOptions);
