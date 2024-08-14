import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectComponent({ 
    label, 
    defaultValue,
    hasFirstRow,
    firstRowLabel,
    firstRowValue,
    chooseData,
    width,
    marginTop,
    marginLeft,
    existsError,
    errorText,
    onChooseHandler
}) {
    const [ value, setValue ] = React.useState(defaultValue ?? "");
    
    const handleChange = (event) => {
        onChooseHandler && onChooseHandler(event);
        setValue(event.target.value);
    };

    return (
        <Box sx={{ minWidth: 120, width: width, marginTop: marginTop, marginLeft: marginLeft }}>
            <FormControl fullWidth size='small' error={existsError}>
                <InputLabel id="demo-simple-select-label">{label}</InputLabel>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={value}
                    label={label}
                    defaultValue={defaultValue}
                    onChange={handleChange}
                >
                    {hasFirstRow &&
                        <MenuItem value={firstRowValue}>{firstRowLabel}</MenuItem>
                    }
                    {
                        chooseData.map((data) => {
                            return (
                                <MenuItem key={data} value={data}>{data}</MenuItem>
                            );                            
                        })
                    }
                </Select>
                {existsError &&
                    <FormHelperText>{errorText}</FormHelperText>
                }                
            </FormControl>
        </Box>
    );
}