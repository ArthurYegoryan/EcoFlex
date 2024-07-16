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
    hoverColor,
    activeColor,
    width,
    height,
    marginLeft,
    marginTop,
    marginRight,
    marginBottom,
    borderRadius,
    fontSize,
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
                        borderRadius: borderRadius,
                        fontSize: fontSize,
                        '&:hover': {
                            backgroundColor: hoverColor,
                        },
                        '&:active': {
                            backgroundColor: activeColor,
                        }
                    }}
                    onClick={onClickHandler}
            >
                {label}
            </Button>
        </Stack>
    );
}