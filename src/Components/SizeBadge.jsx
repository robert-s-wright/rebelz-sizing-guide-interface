import React, { useState } from "react";

import {
  Badge,
  Tooltip,
  Chip,
  Popover,
  Card,
  Stack,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@mui/material";

import { CheckCircle, Error } from "@mui/icons-material";

const SizeBadge = ({ modelSize, activeSize, activeMeasurement }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  return (
    <>
      <Tooltip
        title={"Needs Measurements"}
        placement="top"
        disableHoverListener={activeMeasurement}
      >
        <Badge
          badgeContent={
            modelSize.measId ? (
              <CheckCircle
                sx={{
                  fontSize: "15px !important",
                  color: "green",
                }}
              />
            ) : (
              <Error
                sx={{
                  fontSize: "15px !important",
                  color: "red",
                }}
              />
            )
          }
        >
          <Chip
            id={activeSize.id}
            label={activeSize.sizeName}
            size="small"
            onMouseEnter={(e) => setAnchorEl(e.currentTarget)}
            onMouseLeave={() => setAnchorEl(null)}
            aria-owns={Boolean(anchorEl) ? "mouse-over-popover" : undefined}
            aria-haspopup="true"
            color={modelSize.id === null ? "info" : "default"}
          />
        </Badge>
      </Tooltip>
      {activeMeasurement ? (
        <Popover
          sx={{ pointerEvents: "none" }}
          id="mouse-over-popover"
          anchorEl={anchorEl}
          open={
            anchorEl !== null ? parseInt(anchorEl.id) === activeSize.id : false
          }
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
        >
          <Card padding={2}>
            <Stack
              align="center"
              margin={2}
            >
              <Typography variant="h6">
                Measurements for size {activeSize.sizeName}
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Wing Span</TableCell>
                    <TableCell>Jacket Height</TableCell>
                    <TableCell>Jacket Width</TableCell>
                    <TableCell>Wrist</TableCell>
                    <TableCell>Waist</TableCell>
                    <TableCell>Crotch</TableCell>
                    <TableCell>Pants Length Back</TableCell>
                    <TableCell>Pants Length Front</TableCell>
                    <TableCell>Ankle</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell align="center">
                      {activeMeasurement.wingspan}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.jacketHeight}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.jacketWidth}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.jacketWrist}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.pantsWaist}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.pantsCrotch}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.pantsLengthBack}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.pantsLengthFront}
                    </TableCell>
                    <TableCell align="center">
                      {activeMeasurement.pantsAnkle}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Stack>
          </Card>
        </Popover>
      ) : null}
    </>
  );
};

export default SizeBadge;
