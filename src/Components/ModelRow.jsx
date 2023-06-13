import React, { useState, createContext, useContext } from "react";

import {
  Collapse,
  Stack,
  Button,
  Paper,
  Typography,
  TableRow,
  TableCell,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem,
  Alert,
  Table,
  TextField,
  InputAdornment,
  tableCellClasses,
} from "@mui/material";

import SizeBadge from "./SizeBadge";
import SizesMenu from "./SizesMenu";

import { PropContext } from "./AdminPanel";
import MeasurementsMenu from "./MeasurementsMenu";

const ModelRow = ({
  model,
  models,
  modelIdToAddSizesTo,
  setModelIdToAddSizesTo,
  editingBrand,
  sizes,
  modelSizes,
  setModelSizes,
  // measurements,
}) => {
  const [sizesToCopy, setSizesToCopy] = useState(null);
  const [copyingSizes, setCopyingSizes] = useState(null);
  const [copyError, setCopyError] = useState(null);
  const [showCopyError, setShowCopyError] = useState(false);
  const [addingMeasurement, setAddingMeasurement] = useState(null);

  const measurements = useContext(PropContext);

  //copy size handlers
  const handleCopySizes = (id) => {
    setCopyingSizes(id);
  };

  const handleSaveCopySizes = (newModelId) => {
    if (sizesToCopy !== null) {
      const modelSizesToCopy = modelSizes
        .filter((modelSize) => modelSize.modelId === sizesToCopy)
        .map((modelSize) => ({
          ...modelSize,
          modelId: newModelId,
          id: null,
        }));

      setModelSizes((state) => [...state, ...modelSizesToCopy]);
      setCopyingSizes(null);
      setSizesToCopy(null);
    } else {
      setCopyError("Please select a model to copy from");
      setShowCopyError(true);

      setTimeout(() => {
        setShowCopyError(false);
      }, 3000);
      setTimeout(() => {
        setCopyError(null);
      }, 3500);
    }
  };

  const handleCancelCopySizes = () => {
    setCopyingSizes(null);
    setTimeout(() => {
      setSizesToCopy(null);
    }, 500);
  };

  //add measurements to sizes

  const handleAddMeasurements = (modelId) => {
    setAddingMeasurement(modelId);
  };

  const handleMeasurementChange = (e, modelSizeId, key) => {};

  const matchingModelSizes = modelSizes.filter(
    (modelSize) => modelSize.modelId === model.id
  );

  const measurementMenuProps = {
    addingMeasurement,
    model,
    matchingModelSizes,
    sizes,
    measurements,
    handleMeasurementChange,
    setAddingMeasurement,
  };

  return (
    <TableRow
      key={model.id}
      sx={{
        "&:last-child td": { borderBottom: "none" },
      }}
    >
      <TableCell
        align="center"
        size="small"
      >
        <Collapse
          in
          appear
        >
          <Typography>{model.modelName}</Typography>
        </Collapse>
      </TableCell>
      <TableCell size="small">
        <Collapse
          in
          appear
        >
          <Stack
            align="center"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction="row"
              flexWrap="wrap"
              gap={1}
              alignContent="center"
              justifyContent="center"
              marginBottom={1}
              marginTop={1}
            >
              {matchingModelSizes.map((modelSize, index) => {
                const activeSize = sizes.find(
                  (size) => size.id === modelSize.sizeId
                );

                const activeMeasurement = measurements.find(
                  (measurement) => measurement.id === modelSize.measId
                );

                return (
                  <SizeBadge
                    modelSize={modelSize}
                    activeSize={activeSize}
                    activeMeasurement={activeMeasurement}
                  />
                );
              })}
            </Stack>

            {/* No Sizes Notification */}
            <Collapse
              in={
                matchingModelSizes.length === 0 &&
                modelIdToAddSizesTo !== model.id &&
                addingMeasurement === null
              }
            >
              <Typography textAlign="center">No Sizes</Typography>
            </Collapse>

            {/* New Sizes Menu */}
            <SizesMenu
              model={model}
              modelIdToAddSizesTo={modelIdToAddSizesTo}
              setModelIdToAddSizesTo={setModelIdToAddSizesTo}
              addingMeasurement={addingMeasurement}
              sizes={sizes}
              modelSizes={modelSizes}
              setModelSizes={setModelSizes}
            />

            {/* Edit Measurements Menu */}
            <MeasurementsMenu {...measurementMenuProps} />

            {/* Command Buttons */}

            <Stack
              direction="row"
              align="center"
              justifyContent="center"
              gap={1}
            >
              <Button
                onClick={() => setModelIdToAddSizesTo(model.id)}
                color="success"
                size="small"
              >
                Edit Sizes
              </Button>
              <Button
                onClick={() => handleCopySizes(model.id)}
                color="success"
                size="small"
              >
                Copy Sizes From Model
              </Button>
              <Button
                onClick={() => handleAddMeasurements(model.id)}
                color="success"
                size="small"
              >
                Edit Measurements
              </Button>
            </Stack>

            {/* Copy Sizes Menu */}
            <Collapse
              in={
                copyingSizes === model.id &&
                modelIdToAddSizesTo !== model.id &&
                addingMeasurement !== model.id
              }
            >
              <Stack
                alignItems="center"
                gap={1}
              >
                <Stack
                  direction="row"
                  align="center"
                  justifyContent="center"
                >
                  <FormControl sx={{ width: 300 }}>
                    <InputLabel id="select-chip-label">
                      Select a model to copy from
                    </InputLabel>
                    <Select
                      id="select-chip"
                      labelId="select-chip-label"
                      input={
                        <OutlinedInput label="Select a model to copy from" />
                      }
                      onChange={(e) => setSizesToCopy(e.target.value)}
                      defaultValue={null}
                    >
                      <MenuItem value={null}>No Selection</MenuItem>
                      {models
                        .filter(
                          (mod) =>
                            mod.brandId === editingBrand &&
                            model.id !== mod.id &&
                            modelSizes.some(
                              (modelSize) => modelSize.modelId === mod.id
                            )
                        )
                        .map((model) => {
                          return (
                            <MenuItem
                              value={model.id}
                              key={model.id}
                            >
                              {model.modelName}
                            </MenuItem>
                          );
                        })}
                    </Select>
                  </FormControl>
                  <Button
                    color="success"
                    onClick={() => handleSaveCopySizes(model.id)}
                  >
                    Save
                  </Button>
                  <Button
                    color="warning"
                    onClick={() => handleCancelCopySizes()}
                  >
                    Cancel
                  </Button>
                </Stack>
                <Collapse
                  in={showCopyError}
                  unmountOnExit
                >
                  <Alert severity="warning">{copyError}</Alert>
                </Collapse>
              </Stack>
            </Collapse>
          </Stack>
        </Collapse>
      </TableCell>
    </TableRow>
    // </Collapse>
  );
};

export default ModelRow;
