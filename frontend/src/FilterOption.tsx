import * as React from 'react';

import {useState} from "react";

import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

var arr = "1";


export default function BasicSelect() {
  const [chartData, setChartData] = React.useState('');


  const handleChange = (event: SelectChangeEvent) => {
    setChartData(event.target.value as string);

    arr = chartData;
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl sx={{ minWidth: 200 }}>
        <InputLabel id="demo-simple-select-label">Area of Study</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={chartData}
          label="ChartData"
          onChange={handleChange}
        >
          <MenuItem value={1}>All</MenuItem>
          <MenuItem value={2}>Engine</MenuItem>
          <MenuItem value={3}>Business</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

export { arr };