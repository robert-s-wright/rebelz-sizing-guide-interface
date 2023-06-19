import React, { useState, useEffect, createContext } from "react";

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
} from "@mui/material";

import { styled } from "@mui/material/styles";

import { AddCircle, Cancel, Edit } from "@mui/icons-material";

import Header from "./Header";

import BrandModal from "./BrandModal";

import { motion } from "framer-motion";

import { animation } from "./motion";

import styles from "./AdminPanel.module.css";

import { logout, requestBrandsModelsSizes, postBrand } from "../requests";
import NewSizesMenu from "./NewSizesMenu";

export const PropContext = createContext(null);

const AdminPanel = ({ navigate, setIsAuthenticated }) => {
  //db data
  const [brands, setBrands] = useState([]);
  const [models, setModels] = useState([]);
  const [modelSizes, setModelSizes] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  const [updatingSizes, setUpdatingSizes] = useState(false);

  const [addingBrand, setAddingBrand] = useState(false);
  const [editingBrand, setEditingBrand] = useState(null);
  //commands

  const handleLogout = async () => {
    // await logout().then((response) => {
    //   if (response.status === 200) {
    setIsAuthenticated(false);
    navigate("/admin");
    //   }
    // });
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
          <Stack
            direction="row"
            justifyContent="flex-start"
            gap={1}
          >
            <Button
              variant="outlined"
              color="error"
              onClick={() => handleLogout()}
            >
              Log out
            </Button>
            <Button
              variant="outlined"
              onClick={() => setUpdatingSizes(true)}
            >
              Add New Size Names
            </Button>
          </Stack>

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
                                .filter((model) => model.id !== null)
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
              }}
            >
              Add New Brand
            </Button>
          </TableContainer>
        </div>
      </Card>
      <PropContext.Provider value={measurements}>
        <BrandModal {...modalProps} />
      </PropContext.Provider>
      <NewSizesMenu
        updatingSizes={updatingSizes}
        setUpdatingSizes={setUpdatingSizes}
        sizes={sizes}
        setSizes={setSizes}
      />
    </motion.div>
  );
};

export default AdminPanel;
