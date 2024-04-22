import { createTheme } from "@mui/material";

export const Colors = {
    primary: '#444',
    secondary: '#000',
    success: '#4CAF50',
    info: '#00a2ff',
    danger: '#FF5722',
    warning: '#FFC107',
    dark: '#161616',
    darkBlue: '#3547ca',
    light: '#b0b0b0',
    muted: '#abafb3',
    border: '#DDDFE1',
    inverse: '#2F3D4A',
    shaft: '#222',
    darkBack: '#121212',
    //////////////
    // Grays
    //////////////
    dim_grey: '#696969',
    dove_gray: '#d5d5d5',
    body_bg: '#f3f6f9',
    light_gray: 'rgb(230, 230, 230)',
    //////////////
    // Solid Color
    //////////////
    white: '#fff',
    black: '#000'
}

const theme = createTheme({
    palette: {
        primary: {
            main: Colors.primary
        },
        secondary: {
            main: Colors.secondary
        }
    },
    typography: {
    /* "fontFamily": `"Roboto", "Helvetica", "Arial", sans-serif`,
    "fontSize": 14,
    "fontWeightLight": 300,
    "fontWeightRegular": 400,
    "fontWeightMedium": 500 */
    },
    components: {
        MuiButton: {
            defaultProps: {
                disableRipple: true,
                disableElevation: true
            }
        },
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    width: '250px',
                    background: Colors.primary,
                    color: Colors.secondary,
                    /* borderRadius: '0 100px 0 0', */
                    borderRight: `1px solid ${Colors.secondary}`
                }
            }
        },
        MuiDivider: {
            styleOverrides: {
                root: {
                    borderColor: Colors.dim_grey
                }
            }
        }
    }
})

export default theme;