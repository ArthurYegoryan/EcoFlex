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
    // chooseDataValue,
    fields, 
    changeFieldName, 
    setField, 
    width,
    marginTop,
    marginLeft,
    existsError,
    errorText,
    onChooseHandler
}) {
    const [ value, setValue ] = React.useState(defaultValue ?? "");
    
    const handleChange = (event) => {
        onChooseHandler && onChooseHandler(event.target.value);
        setValue(event.target.value);
        fields ? setField({ ...fields, [changeFieldName]: event.target.value }) 
               : setField(value);
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
                        // chooseData.map((data) => {
                        //     if (typeof data === "string") {
                        //         return (
                        //             <MenuItem value={data.toLowerCase()}>{data}</MenuItem>
                        //         );
                        //     } else {
                        //         return (
                        //             <MenuItem value={data[chooseDataValue]}>{data[chooseDataValue] === "Sale" ? t("trxTypes.sale") : t("trxTypes.cancel")}</MenuItem>
                        //         );
                        //     }                            
                        // })
                    }
                </Select>
                {existsError &&
                    <FormHelperText>{errorText}</FormHelperText>
                }                
            </FormControl>
        </Box>
    );
}