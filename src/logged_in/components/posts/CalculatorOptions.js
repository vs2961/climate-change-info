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
  overwriteListItemLeftPadding: {
    paddingTop: theme.spacing(1.75),
    paddingBottom: theme.spacing(1.75),
    paddingLeft: theme.spacing(4),
    [theme.breakpoints.down("sm")]: {
      paddingLeft: theme.spacing(4)
    },
    "@media (max-width:  420px)": {
      paddingLeft: theme.spacing(1)
    }
  },
  ListInput: {
    width: 195,
    height: 50
  },
  ListInputInput: {
    padding: "9px 34px 9px 14.5px",
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
    updateCarbonFootprint
  } = props;
  const [peopleInHouse, setPeopleInHouse] = useState(1);
  const [electricBillCost, setElectricBillCost] = useState(0);
  const [flightCount, setFlightCount] = useState(0);
  const [commuteMiles, setCommuteMiles] = useState(0);
  const [workDays, setWorkDays] = useState(0);
  const [isPublicTransport, setPublicTransport] = useState("Yes");
  const [recycleAmount, setRecycleAmount] = useState(0);

  const handleChange = useCallback(
    (event) => {
      const { name, value } = event.target;
      switch (name) {
        case "peopleInHouse":
          setPeopleInHouse(parseInt(value));
          break;
        case "electricBillCost":
          setElectricBillCost(parseInt(value));
          break;
        case "flightCount":
          setFlightCount(parseInt(value));
          break;
        case "commuteMiles":
          setCommuteMiles(parseInt(value));
          break;
        case "workDays":
          setWorkDays(parseInt(value));
          break;
        case "isPublicTransport":
          setPublicTransport(value);
          break;
        case "recycleAmount":
          setRecycleAmount(parseInt(value));
          break;
        default:
          throw new Error("No branch selected in switch-statement.");
      }
      updateCarbonFootprint([peopleInHouse, 
                             electricBillCost, 
                             flightCount, 
                             commuteMiles, 
                             workDays,
                             isPublicTransport,
                             recycleAmount,
                            ]);
    },
    [peopleInHouse, electricBillCost, flightCount, commuteMiles, workDays, 
     isPublicTransport, recycleAmount,
    ]
  );

  const inputs = 
    [
      {
        state: peopleInHouse,
        label: "How many people are in your household?",
        stateName: "peopleInHouse",
        min: 1,
      },
      {
        state: electricBillCost,
        label: "What is the cost of your electric bill in dollars monthly?",
        stateName: "electricBillCost",
        min: 0
      },
      {
        state: flightCount,
        label: "How many flights do you take in a year?",
        stateName: "flightCount",
        min: 0,
      },
      {
        state: commuteMiles,
        label: "How many miles do you travel to get to work each day?",
        stateName: "commuteMiles",
        min: 0
      },
      {
        state: workDays,
        label: "How many days did you work in the last year?",
        stateName: "workDays",
        min: 0
      },
      {
        state: isPublicTransport,
        label: "Do you take public transportation to get to work?",
        stateName: "isPublicTransport",
        options: ["Yes", "Sometimes", "No"]
      },
      {
        state: recycleAmount,
        label: "How many pounds of recyclables do you recycle in a year?",
        stateName: "recycleAmount",
        min: 0
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
              style={{height: "80px"}}
            >
              <ListItemText>
                <Typography variant="body2">{element.label}</Typography>
              </ListItemText>
              <FormControl variant="outlined">
                {element.options == null ?
                <ListItemText>
                  <TextField
                    name={element.stateName}
                    value={element.state}
                    onChange={handleChange}
                    type="number"
                    InputProps={{ inputProps: { min: element.min} }}
                    MenuProps={{ disableScrollLock: true }}
                    variant="outlined"
                    className={classes.numberInput}
                  />
                </ListItemText>:
                <ListItemSecondaryAction>
                <Select
                  value={element.state}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      name={element.stateName}
                      labelWidth={0}
                      className={classes.ListInput}
                      classes={{ input: classes.ListInputInput }}
                    />
                  }
                  MenuProps={{ disableScrollLock: true }}
                >
                  {element.options.map((innerElement) => (
                    <MenuItem value={innerElement} key={innerElement}>
                      {innerElement}
                    </MenuItem>
                  ))}
                </Select>
              </ListItemSecondaryAction>}
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
