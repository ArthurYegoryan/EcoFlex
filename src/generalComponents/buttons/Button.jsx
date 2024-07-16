import * as React from 'react';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function ButtonComponent({
    type = "button",
    label = "Button",
    startIcon,
    endIcon,
    size = "small",
    backgroundColor = "blue",
    color = "white",
    width,
    height,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    borderRadius,
    onClickHandler,
    isDisabled = false
}) {
    return (
        <Stack direction="row" 
               spacing={2} 
               sx={{
                   marginRight: marginRight, 
                   marginLeft: marginLeft,
                   marginTop: marginTop,
                   marginBottom: marginBottom
               }}
        >
            <Button variant="contained"
                    type={type}
                    startIcon={startIcon}
                    endIcon={endIcon} 
                    size={size} 
                    disabled={isDisabled}
                    sx={{
                        width: width,
                        height: height,
                        backgroundColor: backgroundColor,
                        color: color,
                        borderRadius: borderRadius
                    }}
                    onClick={onClickHandler}
            >
                {label}
            </Button>
        </Stack>
    );
}