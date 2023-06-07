import React, { useState, useEffect } from "react";

import {
  Modal,
  Card,
  Stack,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
  Button,
  Collapse,
  Alert,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  OutlinedInput,
  FormControlLabel,
  Checkbox,
  Paper,
  InputAdornment,
} from "@mui/material";

import { TransitionGroup } from "react-transition-group";

import {
  AddCircle,
  Check,
  CheckCircle,
  Close,
  Error,
} from "@mui/icons-material";

import { postModel, postModelSizes } from "../requests";
import SizeBadge from "./SizeBadge";
import NewSizesMenu from "./NewSizesMenu";
import ModelRow from "./ModelRow";

const BrandModal = ({
  editingBrand,
  brands,
  models,
  modelSizes,
  setModelSizes,
  sizes,
  measurements,
  setModels,
  setEditingBrand,
}) => {
  const [alert, setAlert] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  const [modelIdToAddSizesTo, setModelIdToAddSizesTo] = useState(null);

  const [copyToDbAlert, setCopyToDbAlert] = useState(null);
  const [showCopyToDbAlert, setShowCopyToDbAlert] = useState(false);
  const [copyToDbError, setCopyToDbError] = useState(null);
  const [showCopyToDbError, setShowCopyToDbError] = useState(false);

  const [addingMeasurement, setAddingMeasurement] = useState(null);

  //add new model to gui
  const handleAddModel = (brandId, e) => {
    setModels((state) => [...state, { id: null, modelName: null, brandId }]);
  };

  //save new model to db
  const handleSaveModelToDb = async () => {
    const output = await postModel(
      models.find((model) => model.id === null)
    ).then((data) => data);

    if (output.status === 200) {
      setModels(
        models.map((model) => {
          if (model.id === null) {
            return output.data;
          } else {
            return model;
          }
        })
      );
      setAlert(`${output.data.modelName} added to the database`);
      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
      }, 3000);
      setTimeout(() => {
        setAlert(null);
      }, 3500);
    } else {
      setError("Something went wrong, please try again");
      setShowError(true);
      setTimeout(() => {
        setShowError(false);
      }, 3000);
      setTimeout(() => {
        setError(null);
      }, 3500);
    }
  };

  const handleSaveCopiedSizesToDb = async () => {
    const output = await postModelSizes(
      modelSizes.filter((model) => model.id === null)
    );

    if (output.status === 200) {
      setModelSizes([
        ...modelSizes.filter((modelSize) => modelSize.id !== null),
        ...output.data,
      ]);
      setCopyToDbAlert(`${output.data.length} sizes added to the database`);
      setShowCopyToDbAlert(true);
      setTimeout(() => {
        setShowCopyToDbAlert(false);
      }, 3000);
      setTimeout(() => {
        setCopyToDbAlert(null);
      }, 3500);
    } else {
      setCopyToDbError("Something went wrong, please try again");
      setShowCopyToDbError(true);
      setTimeout(() => {
        setShowCopyToDbError(false);
      }, 3000);
      setTimeout(() => {
        setCopyToDbError(null);
      }, 3500);
    }
  };

  const handleCancel = () => {
    setEditingBrand(null);
    setModels(models.filter((model) => model.id !== null));
    setModelSizes(modelSizes.filter((modelSize) => modelSize.id !== null));
    // setCopyingSizes(null);
    // setSizesToCopy(null);
  };

  const handleClose = () => {
    setEditingBrand(null);
    // setCopyingSizes(null);
    // setSizesToCopy(null);
  };

  const handleSaveSizesToModel = async (modelId) => {
    const output = await postModelSizes(
      modelSizes.filter((model) => model.id === modelId)
    );

    if (output.status === 200) {
      setModelSizes([
        ...modelSizes.filter((modelSize) => modelSize.id !== null),
        ...output.data,
      ]);
      setCopyToDbAlert(`${output.data.length} sizes added to the database`);
      setShowCopyToDbAlert(true);
      setTimeout(() => {
        setShowCopyToDbAlert(false);
      }, 3000);
      setTimeout(() => {
        setCopyToDbAlert(null);
      }, 3500);
    } else {
      setCopyToDbError("Something went wrong, please try again");
      setShowCopyToDbError(true);
      setTimeout(() => {
        setShowCopyToDbError(false);
      }, 3000);
      setTimeout(() => {
        setCopyToDbError(null);
      }, 3500);
    }
  };

  const handleCancelAddNewSizesToModels = (modelId) => {
    setModelSizes(
      modelSizes.filter((modelSize) => {
        if (modelSize.modelId === modelId) {
          if (modelSize.id === null) {
            return false;
          } else return true;
        } else return true;
      })
    );
    setModelIdToAddSizesTo(null);
  };

  return (
    <>
      <Modal open={editingBrand !== null}>
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
            overflowY: "scroll",
            height: "80vh",
          }}
        >
          <Stack
            spacing={1}
            direction="column"
            alignItems="center"
            padding={2}
          >
            <Typography variant="h4">
              Editing{" "}
              {editingBrand !== null
                ? brands.find((brand) => brand.id === editingBrand).brandName
                : null}
            </Typography>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Models
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Sizes
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {models
                  .filter(
                    (model) =>
                      model.brandId === editingBrand && model.id !== null
                  )
                  .sort((a, b) => a.modelName.localeCompare(b.modelName))
                  .map((model) => {
                    return (
                      <ModelRow
                        model={model}
                        modelIdToAddSizesTo={modelIdToAddSizesTo}
                        setModelIdToAddSizesTo={setModelIdToAddSizesTo}
                        addingMeasurement={addingMeasurement}
                        sizes={sizes}
                        modelSizes={modelSizes}
                        setModelSizes={setModelSizes}
                        models={models}
                        editingBrand={editingBrand}
                        measurements={measurements}
                      />
                    );
                  })}
              </TableBody>
            </Table>

            <Stack align="center">
              <Collapse
                unmountOnExit
                in={models.filter((model) => model.id === null).length > 0}
              >
                {models
                  .filter(
                    (model) =>
                      model.brandId === editingBrand && model.id === null
                  )
                  .map((model) => {
                    return (
                      <Stack
                        direction="row"
                        key={model.id}
                      >
                        <TextField
                          size="small"
                          label="New Model Name"
                          onChange={(e) =>
                            setModels(() => {
                              return models.map((obj) => {
                                if (obj.id === null) {
                                  return {
                                    ...obj,
                                    modelName: e.target.value,
                                  };
                                } else return obj;
                              });
                            })
                          }
                          value={model.modelName ? model.modelName : ""}
                        />
                        <Button onClick={() => handleSaveModelToDb()}>
                          Save Model
                        </Button>
                        <Button
                          onClick={() =>
                            setModels(
                              models.filter((model) => model.id !== null)
                            )
                          }
                          color="error"
                        >
                          Cancel
                        </Button>
                      </Stack>
                    );
                  })}
              </Collapse>
              <Collapse
                in={showError}
                unmountOnExit
              >
                <Alert
                  children={error}
                  severity="warning"
                />
              </Collapse>
              <Collapse in={showAlert}>
                <Alert
                  children={alert}
                  severity="success"
                />
              </Collapse>
              <Collapse
                in={showCopyToDbError}
                unmountOnExit
              >
                <Alert
                  children={copyToDbError}
                  severity="warning"
                />
              </Collapse>
              <Collapse in={showCopyToDbAlert}>
                <Alert
                  children={copyToDbAlert}
                  severity="success"
                />
              </Collapse>
              <Collapse in={modelIdToAddSizesTo === null}>
                <Stack
                  spacing={1}
                  direction="row"
                >
                  <Collapse
                    unmountOnExit
                    in={
                      models.filter((model) => model.id === null).length ===
                        0 &&
                      !showAlert &&
                      !showError
                    }
                  >
                    <Button
                      onClick={(e) => handleAddModel(editingBrand, e)}
                      color="success"
                    >
                      Add New Model
                    </Button>
                  </Collapse>
                  <Collapse
                    unmountOnExit
                    in={
                      modelSizes.filter((modelSize) => modelSize.id === null)
                        .length > 0
                    }
                    orientation="horizontal"
                  >
                    <Button
                      color="success"
                      onClick={() => handleSaveCopiedSizesToDb()}
                      sx={{ whiteSpace: "nowrap" }}
                    >
                      Save Changes
                    </Button>
                  </Collapse>
                  <Collapse
                    unmountOnExit
                    in={
                      modelSizes.filter((modelSize) => modelSize.id === null)
                        .length > 0
                    }
                    orientation="horizontal"
                  >
                    <Button
                      color="error"
                      onClick={() => handleCancel()}
                    >
                      Cancel
                    </Button>
                  </Collapse>
                  <Collapse
                    unmountOnExit
                    in={
                      modelSizes.filter((modelSize) => modelSize.id === null)
                        .length === 0 &&
                      models.filter((model) => model.id === null).length === 0
                    }
                    orientation="horizontal"
                  >
                    <Button
                      color="warning"
                      onClick={() => handleCancel()}
                    >
                      Close
                    </Button>
                  </Collapse>
                </Stack>
              </Collapse>
            </Stack>
          </Stack>
        </Card>
      </Modal>
    </>
  );
};

export default BrandModal;
