import React from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
import QuestionMark from "@material-ui/icons/HelpOutline";
/*
    params:
        name: String  -- name to label input field
        value: Number -- default value for slider and input field
        min: Number
        max: Number   -- limits
        marks         -- marks
        onChange: Callback
*/
export default function InputSlider(props) {
  const params = props.params;

  const [value, setValue] = React.useState(params.value);

  const handleSliderChange = (event, newValue) => {
    if (newValue != value && "onChange" in params) 
      params.onChange(params.name.toLowerCase(), newValue);
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    let value = Number(event.target.value);
    setValue(value);
  };

  return (
    <Grid container spacing={0} justifyContent="center">
      <Grid item xs={12} sm={12}>
        <TextField
          label={params.name}
          name={params.name.toLowerCase()}
          fullWidth
          variant="outlined"
          size="small"
          value={value}
          onChange={handleInputChange}
          inputProps={{
            "aria-labelledby": "input-slider",
            style: { textAlign: "center" },
          }}
        />
      </Grid>
      <Grid item xs={12} sm={10}>
        <Slider
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={params.min}
          max={params.max}
          valueLabelDisplay="off"
          step={params.step}
          track={false}
        />
      </Grid>
    </Grid>
  );
}
