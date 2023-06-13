import React, { useEffect } from "react";

import {
  Modal,
  Card,
  Stack,
  Collapse,
  Badge,
  Chip,
  Typography,
  AppBar,
  Button,
  TextField,
  InputAdornment,
  IconButton,
} from "@mui/material";

import { Close } from "@mui/icons-material";

import { postSizes } from "../requests";

const NewSizesMenu = ({ updatingSizes, setUpdatingSizes, sizes, setSizes }) => {
  const handleClose = () => {
    setUpdatingSizes(false);
    setSizes(sizes.filter((size) => size.id !== null));
  };

  const handleNewSize = (value, ind) => {
    setSizes(
      sizes.map((size, index) => {
        if (ind === index) {
          return { ...size, sizeName: value.toUpperCase() };
        } else {
          return size;
        }
      })
    );
  };

  const handleRemoveNewSize = (ind) => {
    setSizes(sizes.filter((size, index) => index !== ind));
  };

  const handleSaveSizes = async () => {
    const output = await postSizes(sizes.filter((size) => size.id === null));

    if (output.status === 200) {
      setSizes([...sizes.filter((size) => size.id !== null), ...output.data]);
    } else {
      return;
    }
  };

  //separating sizes into male, female, kids
  const adultSizes = sizes
    .filter((size) => size.id !== null)
    .filter((size) => size.sizeName.toUpperCase().startsWith("A"));
  const femaleSizes = sizes
    .filter((size) => size.id !== null)
    .filter((size) => size.sizeName.toUpperCase().startsWith("F"));
  const kidSizes = sizes
    .filter((size) => size.id !== null)
    .filter(
      (size) =>
        size.sizeName.toUpperCase().startsWith("M") ||
        size.sizeName.toUpperCase().startsWith("J")
    );

  useEffect(() => {
    console.log(sizes);
  }, [sizes]);

  return (
    <Modal
      open={updatingSizes}
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
            <Typography variant="h6">Sizes Menu</Typography>
            <Button
              sx={{ alignSelf: "center" }}
              color="success"
              variant="contained"
              onClick={() => setUpdatingSizes(false)}
            >
              Done
            </Button>
          </Stack>
        </AppBar>
        <Stack
          alignItems="center"
          gap={2}
        >
          <Typography variant="h6">Adult Sizes</Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            maxWidth="50vw"
            alignItems="center"
            justifyContent="center"
          >
            {adultSizes.map((size) => {
              return (
                <Collapse
                  in
                  appear
                  unmountOnExit
                >
                  <Chip
                    label={size.sizeName}
                    color="default"
                  />
                </Collapse>
              );
            })}
          </Stack>
          <Typography variant="h6">Female Sizes</Typography>

          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            maxWidth="50vw"
            alignItems="center"
            justifyContent="center"
          >
            {femaleSizes.map((size) => {
              return (
                <Collapse
                  in
                  appear
                >
                  <Chip
                    label={size.sizeName}
                    color="default"
                  />
                </Collapse>
              );
            })}
          </Stack>
          <Typography variant="h6">Child Sizes</Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={1}
            maxWidth="50vw"
            alignItems="center"
            justifyContent="center"
          >
            {kidSizes.map((size) => {
              return (
                <Collapse
                  in
                  appear
                >
                  <Chip
                    label={size.sizeName}
                    color="default"
                  />
                </Collapse>
              );
            })}
          </Stack>
          <Collapse
            in={sizes.filter((size) => size.id === null).length === 0}
            timeout={{ enter: 300, exit: 150 }}
          >
            <Button
              variant="contained"
              onClick={() =>
                setSizes((state) => [...state, { id: null, sizeName: null }])
              }
            >
              Add New Size(s)
            </Button>
          </Collapse>
          <Collapse
            in={sizes.filter((size) => size.id === null).length > 0}
            timeout={{ enter: 300, exit: 150 }}
          >
            <Stack
              gap={1}
              alignItems="center"
            >
              {sizes
                .filter((size) => size.id === null)
                .map((size) => {
                  const ind = sizes.findIndex((obj) => size === obj);

                  return (
                    <TextField
                      label="New Size Name"
                      value={size.sizeName ? size.sizeName : ""}
                      onChange={(e) => handleNewSize(e.target.value, ind)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              color="error"
                              onClick={() => handleRemoveNewSize(ind)}
                            >
                              <Close />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  );
                })}
              <Button
                variant="contained"
                onClick={() =>
                  setSizes((state) => [...state, { id: null, sizeName: null }])
                }
              >
                Add Another Size
              </Button>
              <Stack
                direction="row"
                gap={1}
              >
                <Button
                  variant="contained"
                  onClick={() => handleSaveSizes()}
                >
                  Save New Sizes
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    setSizes(sizes.filter((size) => size.id !== null))
                  }
                >
                  Cancel
                </Button>
              </Stack>
            </Stack>
          </Collapse>
        </Stack>
      </Card>
    </Modal>
  );
};

export default NewSizesMenu;
