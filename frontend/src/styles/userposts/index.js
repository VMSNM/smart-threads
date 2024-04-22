import styled from "@emotion/styled";
import { Colors } from "../theme";
import { Box, IconButton, List, Typography } from "@mui/material";

export const PostImageContainer = styled('img')(({ theme }) => ({
    width: '100%', 
    height: 'auto', 
    display: 'block', 
    border: `1px solid ${Colors.dim_grey}`, 
    borderRadius: '3px', 
    marginTop: '10px'
}))