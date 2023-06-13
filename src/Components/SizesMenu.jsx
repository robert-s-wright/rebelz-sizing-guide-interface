import React from "react";

import {
  Collapse,
  Stack,
  Button,
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  Modal,
  Card,
  AppBar,
} from "@mui/material";

const SizesMenu = ({
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
    // <>
    <Modal
      open={modelIdToAddSizesTo === model.id && addingMeasurement !== model.id}
    >
      <Card
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "auto",
          maxWidth: "max(80vw, 2000px)",
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 10,
          p: 4,
          overflowY: "auto",
          maxHeight: "80vh",
          height: "auto",
        }}
      >
        <AppBar position="sticky">
          <Stack
            direction="row"
            justifyContent="space-between"
            p={2}
            sx={{ backgroundColor: "black" }}
          >
            <Typography variant="h6">
              Editing {model.modelName} Sizes
            </Typography>
            <Stack
              direction="row"
              justifyContent="center"
              alignItems="center"
              gap={1}
            >
              <Button
                onClick={() => handleSelectAllSizes(model.id)}
                variant="contained"
              >
                Select All
              </Button>
              <Button
                onClick={() => handleDeselectAllSizes(model.id)}
                variant="contained"
              >
                Deselect All
              </Button>
              <Button
                sx={{ alignSelf: "center" }}
                color="success"
                onClick={() => setModelIdToAddSizesTo(null)}
                variant="contained"
              >
                Done
              </Button>
            </Stack>
          </Stack>
        </AppBar>

        <Stack
          gap={1}
          padding={2}
        >
          {/* Adult Sizes */}

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

          {/* Female Sizes */}

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

          {/* Kid Sizes */}

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
        </Stack>
      </Card>
    </Modal>
    // </>
  );
};

export default SizesMenu;
