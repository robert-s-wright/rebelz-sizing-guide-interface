import React from "react";

import {
  Stack,
  Modal,
  Typography,
  Table,
  TableRow,
  TableCell,
  Button,
  TextField,
  InputAdornment,
  Card,
  AppBar,
  Box,
  Collapse,
  Alert,
} from "@mui/material";

const MeasurementsMenu = ({
  addingMeasurement,
  model,
  matchingModelSizes,
  sizes,
  measurements,
  handleMeasurementChange,
  setAddingMeasurement,
}) => {
  const inputFields = [
    { key: "wingspan", label: "Wingspan" },
    { key: "jacketHeight", label: "Jacket Height" },
    { key: "jacketWidth", label: "Jacket Width" },
    { key: "jacketWrist", label: "Wrist" },
    { key: "pantsWaist", label: "Waist" },
    { key: "pantsLengthFront", label: "Pants Length Front" },
    { key: "pantsLengthBack", label: "Pants Length Back" },
    { key: "pantsAnkle", label: "Ankle" },
    { key: "pantsCrotch", label: "Crotch" },
  ];
  return (
    <Modal
      open={addingMeasurement === model.id}
      sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      <Card
        style={{
          width: "auto",
          minWidth: "1000px",
          maxWidth: "min(90vw, 2500px)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 10,
          p: 4,

          height: "80vh",

          overflowY: "visible",
        }}
      >
        <AppBar position="sticky">
          <Stack
            direction="row"
            justifyContent="space-between"
            p={2}
            sx={{ backgroundColor: "black", color: "white" }}
          >
            <Typography variant="h6">{model.modelName} Measurements</Typography>
            <Button
              sx={{ alignSelf: "center" }}
              color="success"
              variant="contained"
              onClick={() => setAddingMeasurement(null)}
            >
              Done
            </Button>
          </Stack>
        </AppBar>
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ padding: "10px" }}
        >
          <Collapse
            in={matchingModelSizes.length === 0}
            appear
          >
            <Typography variant="h6">
              Add sizes to this model to add measurements
            </Typography>
          </Collapse>
          <Collapse
            in={
              matchingModelSizes.filter((modelSize) => modelSize.id === null)
                .length > 0 &&
              matchingModelSizes.filter((modelSize) => modelSize.id !== null)
                .length === 0
            }
            appear
          >
            <Typography variant="h6">
              You need to save all sizes to a model to add measurements
            </Typography>
          </Collapse>
          <Collapse
            in={
              matchingModelSizes.filter((modelSize) => modelSize.id === null)
                .length > 0 &&
              matchingModelSizes.filter((modelSize) => modelSize.id !== null)
                .length !== 0
            }
          >
            <Alert severity="info">
              {`You have ${
                matchingModelSizes.filter((modelSize) => modelSize.id === null)
                  .length
              } unsaved sizes on this model, you will not be able to add measurements to them until they are saved!`}
            </Alert>
          </Collapse>
          {/* <Stack
          // alignItems="center"
          // justifyContent="center"
          sx={{ overflowY: "auto", margin: 0 }}
        > */}
          <Table>
            {matchingModelSizes.map((modelSize) => {
              if (modelSize.id !== null) {
                return (
                  <TableRow
                    sx={{
                      "&:last-child td": { borderBottom: "none" },
                    }}
                  >
                    <TableCell>
                      {
                        sizes.find((size) => size.id === modelSize.sizeId)
                          .sizeName
                      }
                    </TableCell>
                    <TableCell>
                      <Stack
                        direction="row"
                        gap={2}
                        flexWrap="wrap"
                      >
                        {inputFields.map((inputField) => {
                          return (
                            <TextField
                              size="small"
                              value={
                                measurements.find(
                                  (measurement) =>
                                    measurement.id === modelSize.measId
                                )
                                  ? measurements.find(
                                      (measurement) =>
                                        measurement.id === modelSize.measId
                                    )[inputField.key]
                                  : ""
                              }
                              onChange={(e) =>
                                handleMeasurementChange(
                                  e,
                                  modelSize.id,
                                  inputField.key
                                )
                              }
                              label={inputField.label}
                              InputProps={{
                                endAdornment: (
                                  <InputAdornment>cm</InputAdornment>
                                ),
                              }}
                            />
                          );
                        })}
                      </Stack>
                    </TableCell>
                  </TableRow>
                );
              } else {
                return null;
              }
            })}
          </Table>
          {/* </Stack> */}
        </Stack>
      </Card>
    </Modal>
  );
};

export default MeasurementsMenu;
