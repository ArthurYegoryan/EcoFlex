import * as React from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
// import Input from '@mui/material/Input';
// import FilledInput from '@mui/material/FilledInput';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormHelperText from '@mui/material/FormHelperText';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

export default function TextInput({
    label,
    size = "small",
    defaultValue,
    isPassword = false,
    onChangeHandler,
    marginTop,
    existsError,
    errorText,
    width = "25ch",
    height = "40px"
}) {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <>
            {!isPassword ?
                <Box
                    sx={{
                        '& > :not(style)': { m: 0, width: width },
                        marginTop: marginTop,
                    }}
                    noValidate
                    autoComplete="off"
                    onChange={onChangeHandler}
                >
                    <TextField id="outlined-basic" 
                            label={label} 
                            variant="outlined"
                            size={size}
                            defaultValue={defaultValue}
                            error={existsError}
                            helperText={existsError && errorText} />
                </Box> :
                <Box sx={{ display: 'flex', flexWrap: 'wrap', marginTop: marginTop }}>
                    <FormControl sx={{ width: {width} }} variant="outlined" size={size} onChange={onChangeHandler}>
                        <InputLabel htmlFor="outlined-adornment-password " sx={{ 
                            backgroundColor: "white", 
                            paddingRight: "5px",
                        }}>
                            {label}
                        </InputLabel>
                        <OutlinedInput
                            sx={{ height: height }}
                            id="outlined-adornment-password"
                            error={existsError}
                            type={showPassword ? 'text' : 'password'}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                            label="Password"
                        />
                        {existsError &&
                            <FormHelperText error id="outlined-adornment-password">
                                {errorText}
                            </FormHelperText>
                        }
                    </FormControl>
              </Box>
            }
        </>        
    );
};