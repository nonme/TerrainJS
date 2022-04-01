import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import InputSlider from "./utils/InputSlider.jsx";
import ToggleButton from "@mui/material/ToggleButton";
import Slider from "@mui/material/Slider";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

function handleSubmit(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const formattedData = {
    width: Number(data.get("width")),
    height: Number(data.get("height")),
    frequency: Number(data.get("frequency")),
    amplitude: Number(data.get("amplitude")),
    octaves: Number(data.get("octaves")),
  };
  const restartEvent = new CustomEvent("restart", { detail: formattedData });
  window.dispatchEvent(restartEvent);
}

function handleElevationChange(name, value) {
  const updateEvent = new CustomEvent("elevation_update", {
    detail: { [name]: value },
  });
  window.dispatchEvent(updateEvent);
}

function handleMoisureChange(name, value) {
  const updateEvent = new CustomEvent("moisure_update", {
    detail: { [name]: value },
  });
  window.dispatchEvent(updateEvent);
}

function handleTempChange(name, value) {
  const updateEvent = new CustomEvent("temp_update", {
    detail: { [name]: value },
  });
  window.dispatchEvent(updateEvent);
}

function NoisePanel() {
  const [climateAlignment, setClimateAlignment] = React.useState("moisure");
  
  let equatorTemperature = 70;
  let polesTemperature = 20;

  const handleClimatToggleChange = (event, newClimateAlignment) => {
    setClimateAlignment(newClimateAlignment);
  };

  const onTempChange = (event, newValue) => {
    let name = event.target.name;
    let oldValue = (name == "equator" ? equatorTemperature : polesTemperature);

    if (Math.abs(newValue - oldValue) >= 10) {
      name == "equator" ? equatorTemperature = newValue : polesTemperature = newValue;
      handleTempChange(name, newValue);
    }
  };

  return (
    <Container>
      <Box
        sx={{
          marginTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          TerrainJS
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Width"
                name="width"
                defaultValue="30"
                variant="outlined"
                fullWidth
                size="small"
                inputProps={{
                  style: { textAlign: "center" },
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Height"
                name="height"
                defaultValue="20"
                variant="outlined"
                fullWidth
                size="small"
                inputProps={{
                  style: { textAlign: "center" },
                  inputMode: "numeric",
                  pattern: "[0-9]*",
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h6"
                style={{ textAlign: "center" }}
              >
                PERLIN NOISE
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <InputSlider
                params={{
                  name: "Frequency",
                  value: 5,
                  min: 1,
                  max: 12,
                  step: 1,
                  marks: true,
                  onChange: handleElevationChange,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputSlider
                params={{
                  name: "Amplitude",
                  value: 1,
                  min: 0,
                  max: 10,
                  step: 0.5,
                  marks: true,
                  onChange: handleElevationChange,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <InputSlider
                params={{
                  name: "Octaves",
                  value: 1,
                  min: 1,
                  max: 7,
                  step: 1,
                  marks: true,
                  onChange: handleElevationChange,
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <Typography
                component="h1"
                variant="h6"
                style={{ textAlign: "center" }}
              >
                CLIMATE
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <ToggleButtonGroup
                  color="primary"
                  value={climateAlignment}
                  exclusive
                  onChange={handleClimatToggleChange}
                  size="small"
                >
                  <ToggleButton value="temp">Temp</ToggleButton>
                  <ToggleButton value="moisure">Moisure</ToggleButton>
                  <ToggleButton value="pressure" disabled>
                    ATM Pressure
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Grid>
            {climateAlignment == "moisure" && (
              <React.Fragment>
                <Grid item xs={12}>
                  <InputSlider
                    params={{
                      name: "Frequency",
                      value: 5,
                      min: 1,
                      max: 12,
                      step: 1,
                      marks: true,
                      onChange: handleMoisureChange,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputSlider
                    params={{
                      name: "Amplitude",
                      value: 1,
                      min: 0,
                      max: 10,
                      step: 0.5,
                      marks: true,
                      onChange: handleMoisureChange,
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <InputSlider
                    params={{
                      name: "Octaves",
                      value: 1,
                      min: 1,
                      max: 7,
                      step: 1,
                      marks: true,
                      onChange: handleMoisureChange,
                    }}
                  />
                </Grid>
              </React.Fragment>
            )}
            {climateAlignment == "temp" && (
              <Grid item container spacing={0} justifyContent="space-between">
                <Grid item xs={3} sx={{ mt: 0.5, textAlign: "center" }}>
                  <Typography
                    id="equator-temperature-slider"
                    variant="overline"
                  >
                    Equator
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    defaultValue={equatorTemperature}
                    onChange={onTempChange
                  }
                    name="equator"
                    marks={[
                      {
                        value: 0,
                        label: "Cold",
                      },
                      {
                        value: 100,
                        label: "Hot",
                      },
                    ]}
                    track={false}
                    aria-labelledby="equator-temperature-slider"
                  />
                </Grid>
                <Grid item xs={3} sx={{ mt: 0.5, textAlign: "center" }}>
                  <Typography id="poles-temperature-slider" variant="overline">
                    Poles
                  </Typography>
                </Grid>
                <Grid item xs={8}>
                  <Slider
                    defaultValue={polesTemperature}
                    name="poles"
                    onChange={onTempChange
                  }
                    marks={[
                      {
                        value: 0,
                        label: "Cold",
                      },
                      {
                        value: 100,
                        label: "Hot",
                      },
                    ]}
                    track={false}
                    aria-labelledby="poles-temperature-slider"
                  />
                </Grid>
              </Grid>
            )}
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                size="large"
              >
                Restart
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default NoisePanel;
