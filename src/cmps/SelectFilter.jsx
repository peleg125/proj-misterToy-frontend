import * as React from 'react'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'

export function SelectFilter({ labels, selectedLabels, onLabelChange }) {
  return (
    <Autocomplete
      disablePortal
      id='combo-box-demo'
      options={labels}
      value={selectedLabels}
      onChange={(event, newValue) => onLabelChange(newValue)}
      multiple
      sx={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label='FilterBy' />}
    />
  )
}
