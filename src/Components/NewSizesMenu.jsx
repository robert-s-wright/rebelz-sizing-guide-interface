import React from "react";

import {
  Collapse,
  Stack,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const NewSizesMenu = ({
  model,

  modelIdToAddSizesTo,
  setModelIdToAddSizesTo,
  addingMeasurement,
  sizes,

  modelSizes,
  setModelSizes,
}) => {
  const handleCheckNewSizeForModel = (e, modelId, sizeId) => {
    if (e.target.checked === false) {
      setModelSizes(
        modelSizes.filter((modelSize) => {
          if (modelSize.modelId === modelId) {
            if (modelSize.sizeId === sizeId) {
              return false;
            } else return true;
          } else return true;
        })
      );
    } else if (e.target.checked === true) {
      setModelSizes((state) => [
        ...state,
        { id: null, modelId, sizeId, measId: null },
      ]);
    }
  };

  const handleSelectAllSizes = (modelId) => {
    setModelSizes((state) => [
      ...state,
      ...sizes.map((size) => ({
        id: null,
        modelId,
        sizeId: size.id,
        measId: null,
      })),
    ]);
  };

  const handleDeselectAllSizes = (modelId) => {
    setModelSizes(modelSizes.filter((modelSize) => modelSize.id !== null));
  };

  //separating sizes into male, female, kids
  const adultSizes = sizes.filter((size) =>
    size.sizeName.toUpperCase().startsWith("A")
  );
  const femaleSizes = sizes.filter((size) =>
    size.sizeName.toUpperCase().startsWith("F")
  );
  const kidSizes = sizes.filter(
    (size) =>
      size.sizeName.toUpperCase().startsWith("M") ||
      size.sizeName.toUpperCase().startsWith("J")
  );
  return (
    <Collapse
      in={modelIdToAddSizesTo === model.id && addingMeasurement !== model.id}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        <Button onClick={() => handleSelectAllSizes(model.id)}>
          Select All
        </Button>
        <Button onClick={() => handleDeselectAllSizes(model.id)}>
          Deselect All
        </Button>
      </Stack>
      <Stack gap={1}>
        {/* Adult Sizes */}
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Adult Sizes</Typography>
          <Stack
            direction="row"
            spacing={0}
            flexWrap="wrap"
            // sx={{ maxHeight: "50vh" }}
          >
            {adultSizes.map((size) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={modelSizes.some(
                        (modelSize) =>
                          modelSize.modelId === model.id &&
                          modelSize.sizeId === size.id
                      )}
                      onChange={(e) =>
                        handleCheckNewSizeForModel(e, model.id, size.id)
                      }
                      color={
                        modelSizes.find(
                          (modelSize) =>
                            modelSize.sizeId === size.id &&
                            modelSize.modelId === model.id
                        ) === undefined
                          ? "default"
                          : modelSizes.find(
                              (modelSize) =>
                                modelSize.sizeId === size.id &&
                                modelSize.modelId === model.id
                            ).id === null
                          ? "warning"
                          : "success"
                      }
                    />
                  }
                  label={size.sizeName}
                />
              );
            })}
          </Stack>
        </Paper>

        {/* Female Sizes */}
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Female Sizes</Typography>
          <Stack
            direction="row"
            spacing={0}
            flexWrap="wrap"
            // sx={{ maxHeight: "50vh" }}
          >
            {femaleSizes.map((size) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={modelSizes.some(
                        (modelSize) =>
                          modelSize.modelId === model.id &&
                          modelSize.sizeId === size.id
                      )}
                      onChange={(e) =>
                        handleCheckNewSizeForModel(e, model.id, size.id)
                      }
                      color={
                        modelSizes.find(
                          (modelSize) =>
                            modelSize.sizeId === size.id &&
                            modelSize.modelId === model.id
                        ) === undefined
                          ? "default"
                          : modelSizes.find(
                              (modelSize) =>
                                modelSize.sizeId === size.id &&
                                modelSize.modelId === model.id
                            ).id === null
                          ? "warning"
                          : "success"
                      }
                    />
                  }
                  label={size.sizeName}
                />
              );
            })}
          </Stack>
        </Paper>

        {/* Kid Sizes */}
        <Paper sx={{ padding: 2 }}>
          <Typography variant="h6">Kid Sizes</Typography>
          <Stack
            direction="row"
            spacing={0}
            flexWrap="wrap"
            // sx={{ maxHeight: "50vh" }}
          >
            {kidSizes.map((size) => {
              return (
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={modelSizes.some(
                        (modelSize) =>
                          modelSize.modelId === model.id &&
                          modelSize.sizeId === size.id
                      )}
                      onChange={(e) =>
                        handleCheckNewSizeForModel(e, model.id, size.id)
                      }
                      color={
                        modelSizes.find(
                          (modelSize) =>
                            modelSize.sizeId === size.id &&
                            modelSize.modelId === model.id
                        ) === undefined
                          ? "default"
                          : modelSizes.find(
                              (modelSize) =>
                                modelSize.sizeId === size.id &&
                                modelSize.modelId === model.id
                            ).id === null
                          ? "warning"
                          : "success"
                      }
                    />
                  }
                  label={size.sizeName}
                />
              );
            })}
            {/* </FormGroup> */}
          </Stack>
        </Paper>
        <Button
          sx={{ alignSelf: "center" }}
          color="success"
          onClick={() => setModelIdToAddSizesTo(null)}
        >
          Done
        </Button>
      </Stack>
    </Collapse>
  );
};

export default NewSizesMenu;
