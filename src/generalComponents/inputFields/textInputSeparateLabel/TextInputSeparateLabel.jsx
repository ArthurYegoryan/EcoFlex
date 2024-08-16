import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

export default function TextInputSeparateLabel({
    label,
    size = "small",
    defaultValue = "",
    componentWidth = "480px",
    textInputWidth = "200px",
    componentTopMargin,
    componentBottomMargin = "10px",
    labelMarginLeft,
    textInputMarginRight,
}) {
  return (
    <div style={{ 
            display: "flex",
            justifyContent: "center",
            width: componentWidth,
            marginTop: componentTopMargin,
            marginBottom: componentBottomMargin
         }} 
         className="text-input-separate-label-div"
    >
        <div style={{ 
                display: "inline-block",
                width: "85%",
                marginLeft: labelMarginLeft
             }} 
             className="text-input-separate-label-typography"
        >
            <Typography variant="h7" 
                        component="h4"
                        className="text-input-separate-label-text"
                        sx={{
                          marginTop: "8px"
                        }}
            >
                {label}
            </Typography>
        </div>
        <div style={{
                marginRight: textInputMarginRight
             }}
             className="text-input-separate-label-textField">
            <TextField
                hiddenLabel
                id="filled-hidden-label-small"
                defaultValue={defaultValue}
                variant="filled"
                size={size}
                sx={{
                  width: textInputWidth
                }}
            />
        </div>        
    </div>
  );
}