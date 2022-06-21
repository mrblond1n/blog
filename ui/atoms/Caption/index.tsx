import React from 'react';
import {Typography} from '@mui/material';

export const Caption = React.memo(({children}) => <Typography variant="body1">{children}</Typography>);
