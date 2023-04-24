import React, { useState, useEffect } from "react";

import {
  TextField,
  Stack,
  Autocomplete,
  Collapse,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  InputAdornment,
  Alert,
} from "@mui/material";

import { TransitionGroup } from "react-transition-group";

import { Help } from "@mui/icons-material";

import styles from "./Dashboard.module.css";

import {
  requestBrandsModelsSizes,
  patchUser,
  postUserModels,
  getUserModels,
} from "../requests";

const Dashboard = React.forwardRef((props, ref) => {
  const { setUser, user, blankUser, ...rest } = props;

  const blankUserModel = {
    id: null,
    userId: user.id,
    userMeasurementId: null,
    brandId: null,
    modelId: null,
    sizeId: null,
    comments: null,
  };

  const selectedIndex = user.userMeasurements.length - 1;

  const inputFields = [
    "Arm",
    "Shoulders",
    "Chest",
    "Belly",
    "Waist",
    "Seat",
    "Thigh",
  ];

  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modelSizes, setModelSizes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [measurements, setMeasurements] = useState([]);
  const [submit, setSubmitted] = useState(false);

  const [userModels, setUserModels] = useState([]);

  const handleBrandChange = (value, index) => {
    setUserModels((state) => {
      return state.map((obj, ind) => {
        if (index === ind) {
          return {
            ...obj,
            brandId: value !== null ? parseInt(value.id) : null,

            modelId: null,
            sizeId: null,
          };
        } else {
          return obj;
        }
      });
    });
  };

  const handleModelChange = (value, index) => {
    setUserModels((state) => {
      return state.map((obj, ind) => {
        if (index === ind) {
          return {
            ...obj,

            modelId: value !== null ? value.id : null,
          };
        } else {
          return obj;
        }
      });
    });
  };

  const handleSizeChange = (value, index) => {
    setUserModels((state) => {
      return state.map((obj, ind) => {
        if (index === ind) {
          return { ...obj, sizeId: value !== null ? value.id : null };
        } else {
          return obj;
        }
      });
    });
  };

  const handleComments = (value, index) => {
    setUserModels((state) => {
      return state.map((obj, ind) => {
        if (index === ind) {
          return { ...obj, comments: value !== "" ? value : null };
        } else {
          return obj;
        }
      });
    });
  };

  const handleRemoveEntry = (index) => {
    setUserModels((state) =>
      state.filter((item) => state.indexOf(item) !== index)
    );
  };

  const handleSubmit = async () => {
    const userOutput = await patchUser(user);

    const userModelOutput = await postUserModels({
      user: user,
      userModels: userModels,
    });

    if (userModelOutput.status === 200) {
      setUser(userModelOutput.data.user);
      setUserModels(userModelOutput.data.userModels);
      setSubmitted(true);
    }
  };

  //retrieve brand and model data
  useEffect(() => {
    const brandModelSizeData = async () => {
      const output = await requestBrandsModelsSizes();

      setBrands(output.brands);
      setModels(output.models);
      setModelSizes(output.model_Sizes);
      setSizes(output.sizes);
      setMeasurements(output.measurements);
    };

    const userSubmissions = async () => {
      const output = await getUserModels(user);

      if (output.status === 200) {
        setUserModels(output.data);
      } else {
        return;
      }
    };

    brandModelSizeData();
    userSubmissions();
  }, []);

  useEffect(() => {
    console.log(user);
  }, [user]);

  // useEffect(() => {
  //   console.log(userModels);
  // }, [userModels]);

  const handleUserMeasurementChange = (value, field) => {
    setUser((state) => ({
      ...state,
      userMeasurements: state.userMeasurements.map((obj, ind) => {
        if (obj.id === null) {
          return {
            ...state.userMeasurements[ind],
            [field]: parseInt(value),
          };
        } else return obj;
      }),
    }));
  };

  return (
    <div
      {...rest}
      ref={ref}
      className={styles.container}
    >
      {submit ? (
        <Alert>Thanks for your submission {user.name}!</Alert>
      ) : (
        <>
          <div className={styles.userName}>
            <TextField
              label="Name"
              name="name"
              type="text"
              value={user.name ? user.name : ""}
              size="small"
              onChange={(e) =>
                setUser((state) => ({
                  ...state,
                  name: e.target.value,
                }))
              }
            />
          </div>
          <div className={styles.userInfo}>
            <TextField
              label="Height (cm)"
              name="height"
              type="number"
              value={
                user.userMeasurements.find((item) => item.id === null) !==
                  undefined &&
                user.userMeasurements.find((item) => item.id === null).height
                  ? user.userMeasurements.find((item) => item.id === null)
                      .height
                  : ""
              }
              size="small"
              onChange={(e) =>
                handleUserMeasurementChange(e.target.value, "height")
              }
            />
            <TextField
              label="Weight (kg)"
              name="weight"
              type="number"
              value={
                user.userMeasurements.find((item) => item.id === null) !==
                  undefined &&
                user.userMeasurements.find((item) => item.id === null).weight
                  ? user.userMeasurements.find((item) => item.id === null)
                      .weight
                  : ""
              }
              size="small"
              onChange={(e) =>
                handleUserMeasurementChange(e.target.value, "weight")
              }
            />
            {inputFields.map((item) => (
              <TextField
                key={item}
                label={`${item} (cm)`}
                name={item.toLowerCase()}
                type="number"
                value={
                  user.userMeasurements.find((item) => item.id === null) !==
                    undefined &&
                  user.userMeasurements.find((item) => item.id === null)[
                    item.toLowerCase()
                  ]
                    ? user.userMeasurements.find((item) => item.id === null)[
                        item.toLowerCase()
                      ]
                    : ""
                }
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Help />
                    </InputAdornment>
                  ),
                }}
                size="small"
                onChange={(e) =>
                  handleUserMeasurementChange(
                    e.target.value,
                    item.toLowerCase()
                  )
                }
              />
            ))}
          </div>

          <div className={styles.infoContainer}>
            <TransitionGroup className={styles.giContainer}>
              {userModels.map((entry, index) => {
                if (entry.id === null) {
                  return (
                    <Collapse
                      key={index}
                      unmountOnExit
                      mountOnEnter
                      appear={false}
                      in={entry.id === null}
                    >
                      <Stack
                        spacing={1}
                        sx={{
                          minWidth: 300,
                          maxWidth: 430,
                          padding: "10px",
                        }}
                      >
                        <Autocomplete
                          options={brands}
                          value={
                            entry.brandId !== null
                              ? brands.find(
                                  (brand) => brand.id === entry.brandId
                                )
                              : ""
                          }
                          isOptionEqualToValue={(option, value) =>
                            option.id === value.id || value === ""
                          }
                          getOptionLabel={(option) =>
                            option.brandName ? option.brandName : ""
                          }
                          onChange={(e, value) =>
                            handleBrandChange(value, index)
                          }
                          renderOption={(props, option) => {
                            return (
                              <li
                                {...props}
                                key={option.id}
                              >
                                {option.brandName}
                              </li>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Brand"
                              size="small"
                            />
                          )}
                        />
                        <Autocomplete
                          options={
                            entry.brandId !== null
                              ? models.filter(
                                  (model) => model.brandId === entry.brandId
                                )
                              : []
                          }
                          renderOption={(props, option) => {
                            return (
                              <li
                                {...props}
                                key={option.id}
                              >
                                {option.modelName}
                              </li>
                            );
                          }}
                          getOptionLabel={(option) =>
                            option.modelName ? option.modelName : ""
                          }
                          isOptionEqualToValue={(option, value) =>
                            value === "" || option.modelName === value.modelName
                          }
                          value={
                            entry.modelId !== null
                              ? models.find(
                                  (model) => model.id === entry.modelId
                                )
                              : ""
                          }
                          disabled={!entry.brandId}
                          onChange={(e, value) =>
                            handleModelChange(value, index)
                          }
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Model"
                              size="small"
                            />
                          )}
                        />

                        <Autocomplete
                          options={
                            entry.modelId
                              ? sizes.filter((size) =>
                                  modelSizes
                                    .filter(
                                      (modelSize) =>
                                        modelSize.modelId === entry.modelId
                                    )
                                    .some((model) => size.id === model.sizeId)
                                )
                              : []
                          }
                          isOptionEqualToValue={(option, value) =>
                            value === "" || option.sizeName === value.sizeName
                          }
                          getOptionLabel={(option) =>
                            option.sizeName ? option.sizeName : ""
                          }
                          value={
                            entry.sizeId !== null
                              ? sizes.find((size) => size.id === entry.sizeId)
                              : ""
                          }
                          disabled={!entry.modelId}
                          onChange={(e, value) =>
                            handleSizeChange(value, index)
                          }
                          renderOption={(props, option) => {
                            return (
                              <li
                                {...props}
                                key={option.id}
                              >
                                {option.sizeName}
                              </li>
                            );
                          }}
                          renderInput={(params) => (
                            <TextField
                              {...params}
                              label="Size"
                              size="small"
                            />
                          )}
                        />
                        <TextField
                          label="Comments"
                          value={entry.comments !== null ? entry.comments : ""}
                          multiline
                          size="small"
                          onChange={(e) =>
                            handleComments(e.target.value, index)
                          }
                          helperText="Please give a description of how the gi fits. Is it tight/loose? Do the legs or arms feel long or short compared to other gis you have tried?"
                        />

                        <Button onClick={() => handleRemoveEntry(index)}>
                          Remove
                        </Button>
                      </Stack>
                    </Collapse>
                  );
                } else return null;
              })}
            </TransitionGroup>
            <Button
              onClick={() =>
                setUserModels((state) => [...state, blankUserModel])
              }
              color="success"
              variant="outlined"
            >
              Add Another Gi
            </Button>
          </div>

          <div className={styles.buttonContainer}>
            <Button
              variant="outlined"
              color="error"
            >
              Clear All
            </Button>
            <Button
              variant="outlined"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </div>
        </>
      )}
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                colSpan={6}
                align="center"
                sx={{ fontWeight: "bold" }}
              >
                Previous Submissions
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>Brand</TableCell>
              <TableCell>Model</TableCell>
              <TableCell>Size</TableCell>
              <TableCell>Comments</TableCell>
              <TableCell>Weight</TableCell>
              <TableCell>Date</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userModels
              .filter((entry) => entry.id !== null)
              .map((item) => {
                const date = new Date(
                  user.userMeasurements.find(
                    (meas) => meas.id === item.userMeasurementId
                  ).date
                );

                return (
                  <TableRow key={item.id}>
                    <TableCell size="small">
                      {
                        brands.find((brand) => brand.id === item.brandId)
                          .brandName
                      }
                    </TableCell>
                    <TableCell size="small">
                      {
                        models.find((model) => model.id === item.modelId)
                          .modelName
                      }
                    </TableCell>
                    <TableCell size="small">
                      {sizes.find((size) => size.id === item.sizeId).sizeName}
                    </TableCell>
                    <TableCell size="small">{item.comments}</TableCell>
                    <TableCell size="small">
                      {
                        user.userMeasurements.find(
                          (meas) => meas.id === item.userMeasurementId
                        ).weight
                      }{" "}
                      Kg
                    </TableCell>
                    <TableCell size="small">{`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`}</TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default Dashboard;
