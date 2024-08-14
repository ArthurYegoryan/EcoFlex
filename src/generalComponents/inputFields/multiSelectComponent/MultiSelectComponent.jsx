import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { colors } from '../../../assets/styles/colors';

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

function getStyles(item, value, theme) {
  return {
    fontWeight:
      value.indexOf(item) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function MultipleSelect({
    label,
    dataForMultiSelecting = [],
    defaultValue = [],
    size = "small",
    width = 300,
    marginTop,
    existsError,
    errorText,
    onChangeHandler,
}) {
  const theme = useTheme();
  const [value, setValue] = React.useState([]);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(
      typeof value === 'string' ? value.split(',') : value,
    );
    onChangeHandler(value);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: width, margin: "none", marginTop: marginTop }}
                   size={size}
                   error={existsError}
      >
        <InputLabel id="demo-multiple-chip-label" >
          {label}
        </InputLabel>
        <Select
          labelId="demo-multiple-chip-label"
          id="demo-multiple-chip"
          multiple
          value={value.length ? value : defaultValue}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label={label} />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {dataForMultiSelecting.map((item) => (
            <MenuItem
              key={item}
              value={item}
              style={getStyles(item, value, theme)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: colors.originalBgColor
                },
                '&.Mui-selected:hover': {
                  backgroundColor: colors.originalHoverColor
                }
              }}
            >
              {item}
            </MenuItem>
          ))}
        </Select>
        {existsError &&
            <FormHelperText>{errorText}</FormHelperText>
        }
      </FormControl>
    </div>
  );
}