import React, { useState } from "react";
import { useTheme, ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Box,
  OutlinedInput,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  Chip,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material/";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const stores = ["Alta", "Elit Electronics", "Zoomer", "Adashop", "test1"];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
const MultipleSelectChip = ({ sendSearchResult, onCheckBoxChange }) => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [storeFilter, setStoreFilter] = useState([]);
  const [checked, setChecked] = useState(true);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setStoreFilter(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    sendSearchResult(value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <div className='a'>
      <ThemeProvider theme={darkTheme}>
        <Button onClick={handleClickOpen} className='checktest'>
          Filters
        </Button>
        <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
          <DialogTitle>Filters</DialogTitle>
          <DialogContent>
            <Box
              component='form'
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <FormControl
                className='checktest'
                sx={{ m: 1, minWidth: 120, maxWidth: 300 }}
              >
                <InputLabel id='demo-multiple-chip-label'>Stores</InputLabel>
                <Select
                  labelId='demo-multiple-chip-label'
                  id='demo-multiple-chip'
                  multiple
                  value={storeFilter}
                  onChange={handleChange}
                  input={
                    <OutlinedInput id='select-multiple-chip' label='Chip' />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip key={value} label={value} />
                      ))}
                    </Box>
                  )}
                  MenuProps={MenuProps}
                >
                  {stores.map((name) => (
                    <MenuItem
                      key={name}
                      value={name}
                      style={getStyles(name, storeFilter, theme)}
                      id='filter-list'
                    >
                      {name}
                    </MenuItem>
                  ))}
                </Select>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={checked}
                      onChange={(event) => {
                        setChecked(event.target.checked);
                        onCheckBoxChange(event.target.checked);
                      }}
                    />
                  }
                  label='Increased Accuracy (ADA)'
                  sx={{ color: "lightgrey" }}
                />
              </FormGroup>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} sx={{ color: "error.main" }}>
              Cancel
            </Button>
            <Button onClick={handleClose} sx={{ color: "success.main" }}>
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </ThemeProvider>
    </div>
  );
};
export default MultipleSelectChip;
