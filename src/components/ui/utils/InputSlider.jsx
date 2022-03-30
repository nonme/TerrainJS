import React from "react";
import Grid from "@material-ui/core/Grid";
import Slider from "@material-ui/core/Slider";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";

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
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    let value = Number(event.target.value);
    setValue(value);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={12}>
        <TextField
          label={params.name}
          fullWidth
          variant="outlined"
          size="small"
          value={value}
          onChange={handleInputChange}
          inputProps={{
            "aria-labelledby": "input-slider",
            style: { textAlign: "center" }
          }}
        />
      </Grid>
      <Grid item xs={12} sm={12}>
        <Slider
          value={typeof value === "number" ? value : 0}
          onChange={handleSliderChange}
          aria-labelledby="input-slider"
          min={params.min}
          max={params.max}
          valueLabelDisplay="auto"
          marks={params.marks}
          step={params.step}
          track={false}
        />
      </Grid>
    </Grid>
  );
}
