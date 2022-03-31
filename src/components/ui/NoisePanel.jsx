import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import InputSlider from "./utils/InputSlider.jsx";

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

function handleChange(name, value) {
  const updateEvent = new CustomEvent("update", {detail: {[name]: value}});
  window.dispatchEvent(updateEvent);
}

function NoisePanel() {
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
                Perlin Noise
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
                  onChange: handleChange
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
                  onChange: handleChange
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
                  onChange: handleChange
                }}
              />
            </Grid>
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
