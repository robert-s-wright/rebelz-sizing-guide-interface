import React, { useState, useEffect } from "react";

import {
  Card,
  Collapse,
  TextField,
  Button,
  Table,
  TableContainer,
  TableCell,
  TableBody,
  TableRow,
  TableHead,
  Stack,
  Chip,
  Modal,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";

import { styled } from "@mui/material/styles";

import { AddCircle, Cancel, Edit } from "@mui/icons-material";

import Header from "./Header";

import BrandModal from "./BrandModal";

import { motion } from "framer-motion";

import { animation } from "./motion";

import styles from "./AdminPanel.module.css";

import { logout, requestBrandsModelsSizes, postBrand } from "../requests";

const AdminPanel = ({ navigate, setIsAuthenticated }) => {
  //db data
  const [brands, setBrands] = useState([]);
  const [addingBrand, setAddingBrand] = useState(false);

  const [editingBrand, setEditingBrand] = useState(null);

  const [models, setModels] = useState([]);
  const [modelSizes, setModelSizes] = useState([]);

  const [sizes, setSizes] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  //commands

  const handleLogout = async () => {
    await logout().then((response) => {
      if (response.status === 200) {
        setIsAuthenticated(false);
        navigate("/login");
      }
    });
  };

  const handleAddNewBrand = async () => {
    const output = await postBrand(
      brands.find((brand) => brand.id === null)
    ).then((data) => data);

    if (output.status === 200) {
      setBrands(() => {
        return brands.map((brand) => {
          if (brand.id === null) {
            return output.data;
          } else {
            return brand;
          }
        });
      });
    } else {
      return;
    }
  };

  const handleCancelAddNewBrand = () => {
    setAddingBrand(false);

    setBrands(brands.filter((brand) => brand.id !== null));
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

    brandModelSizeData();
  }, []);

  const modalProps = {
    editingBrand,
    brands,
    models,
    modelSizes,
    setModelSizes,
    sizes,
    measurements,
    setModels,
    setEditingBrand,
  };

  return (
    <motion.div
      initial={animation.initial}
      animate={animation.animate}
      exit={animation.exit}
      transition={animation.transition}
      className={styles.wrapper}
    >
      <Card>
        <Header location="Admin Panel" />
        <div className={styles.container}>
          <div className={styles.buttonContainer}>
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleLogout()}
            >
              Log out
            </Button>
          </div>

          <TableContainer className={styles.tableContainer}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell
                    colSpan={6}
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Data
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Brands
                  </TableCell>

                  <TableCell
                    align="center"
                    sx={{ fontWeight: "bold" }}
                  >
                    Models
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brands
                  .filter((brand) => brand.id !== null)
                  .map((brand) => {
                    return (
                      <>
                        <TableRow key={brand.id}>
                          <TableCell
                            size="small"
                            align="right"
                          >
                            <Button
                              endIcon={<Edit />}
                              size="small"
                              sx={{ whiteSpace: "nowrap", minWidth: "auto" }}
                              onClick={() => {
                                // editingBrand.current = brand.id;
                                setEditingBrand(brand.id);
                              }}
                            >
                              {brand.brandName}
                            </Button>
                          </TableCell>
                          <TableCell>
                            <Stack
                              direction="row"
                              flexWrap="wrap"
                              useFlexGap
                              gap={1}
                              alignItems="flex-start"
                              justifyContent="flex-start"
                            >
                              {models
                                .filter((model) => model.modelName !== null)
                                .sort((a, b) =>
                                  a.modelName.localeCompare(b.modelName)
                                )
                                .map((model, index) => {
                                  if (model.brandId === brand.id) {
                                    return (
                                      <Collapse in={model.id !== null}>
                                        <Chip
                                          size="small"
                                          label={model.modelName}
                                        />
                                      </Collapse>
                                    );
                                  }
                                })}
                            </Stack>
                          </TableCell>
                        </TableRow>
                      </>
                    );
                  })}
              </TableBody>
            </Table>
            <Button
              color="success"
              onClick={() => {
                setAddingBrand(true);
                // addingBrand = true;
              }}
            >
              Add New Brand
            </Button>
          </TableContainer>
        </div>
      </Card>
      <Modal open={addingBrand}>
        <Card
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Stack
            direction="row"
            spacing={1}
            padding={2}
          >
            <Stack spacing={1}>
              <Stack
                spacing={1}
                direction="row"
              >
                <TextField
                  label="New Brand Name"
                  onChange={(e) => {
                    const index = brands.findIndex(
                      (brand) => brand.id === null
                    );

                    setBrands((state) => {
                      if (index >= 0) {
                        return brands.map((brand, ind) => {
                          if (ind === index) {
                            return { ...brand, brandName: e.target.value };
                          } else {
                            return brand;
                          }
                        });
                      } else {
                        return [
                          ...state,
                          { id: null, brandName: e.target.value },
                        ];
                      }
                    });
                  }}
                  value={
                    brands.findIndex((brand) => brand.id === null) >= 0
                      ? brands.find((brand) => brand.id === null).brandName
                      : ""
                  }
                />
                <Button onClick={() => handleAddNewBrand()}>Save Brand</Button>
                <Button onClick={() => handleCancelAddNewBrand()}>
                  Cancel
                </Button>
              </Stack>
            </Stack>
            <Collapse
              in={false}
              unmountOnExit
            >
              <Stack>
                <FormGroup row>
                  {sizes.map((size) => {
                    return (
                      <FormControlLabel
                        label={size.sizeName}
                        control={<Checkbox />}
                      />
                    );
                  })}
                </FormGroup>
              </Stack>
            </Collapse>
          </Stack>
        </Card>
      </Modal>
      <BrandModal {...modalProps} />
    </motion.div>
  );
};

export default AdminPanel;
