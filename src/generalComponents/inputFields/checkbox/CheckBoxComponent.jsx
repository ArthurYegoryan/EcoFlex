import * as React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckBoxLabels({
    label,
    defaultChecked = false,
    onChangeHandler
}) {
    return (
        <FormControlLabel control={
                              <Checkbox defaultChecked={defaultChecked} 
                                        onChange={onChangeHandler} />} 
                          label={label} />
    );
};