import { useState } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

export default function CheckBoxLabels({
    label,
    defaultChecked = false,
    onChangeHandler
}) {
    const [ isAlreadyChecked, setIsAlreadyChecked ] = useState(false);
    const [ checked, setChecked ] = useState(defaultChecked);

    return (
        <>
            {isAlreadyChecked ?
                <FormControlLabel 
                    control={
                        <Checkbox checked={checked} 
                            onChange={(evt) => {
                                setChecked(!checked);
                                onChangeHandler(evt, label);
                            }} 
                            />} 
                    label={label} /> :
                <FormControlLabel 
                    control={
                        <Checkbox checked={defaultChecked} 
                            onChange={(evt) => {
                                setIsAlreadyChecked(!isAlreadyChecked);
                                setChecked(!checked);
                                onChangeHandler(evt, label);
                            }} />} 
                    label={label} />
            }
        </>
    );
};