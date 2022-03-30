import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import Box from "@material-ui/core/Box";
import Slider from "@material-ui/core/Slider";
import InputSlider from "./utils/InputSlider.jsx";

function handleClick(event) {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const formattedData = {
    width: Number(data.get('width')),
    height: Number(data.get('height')),
    frequency: Number(data.get('frequency')),
    amplitude: Number(data.get('amplitude')),
    octaves: Number(data.get('octaves'))
  };
  const restartEvent = new CustomEvent("restart", formattedData);
  window.dispatchEvent(restartEvent);
}

function NoisePanel() {
  return (
    <Container>
      <Box
        sx={{
          marginTop: 20,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          TerrainJS
        </Typography>
        <Box component="form" noValidate onSubmit={handleClick} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                label="Width"
                name="width"
                value="30"
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
                value="20"
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
              <InputSlider
                params={{
                  name: "Frequency",
                  value: 4,
                  min: 1,
                  max: 12,
                  step: 1,
                  marks: true,
                }}
              />
            </Grid>
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
              }}
            />
          </Grid>
          <Box sx={{ mt: 3, mb: 2 }}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              size="large"
            >
              Restart
            </Button>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default NoisePanel;
