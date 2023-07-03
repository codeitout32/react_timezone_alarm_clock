import { Autocomplete, TextField } from '@mui/material'
import tzJson from './timezones.json'
import React from 'react'

const TimeZoneSelector = ({setTimeZone}) => {
    // console.log('tzjson', tzJson)
    const handleChange = (o) => {
        console.log("value", o)
        setTimeZone(o)
     }
  return (
    <Autocomplete
        disablePortal
        id="combo-box-demo"
        options={tzJson}
        // sx={{ width: 300 }}
        disableClearable
        getOptionLabel={o => o.text}
        defaultValue={{
            "value": "India Standard Time",
            "abbr": "IST",
            "offset": 5.5,
            "isdst": false,
            "text": "(UTC+05:30) Chennai, Kolkata, Mumbai, New Delhi",
            "utc": [
              "Asia/Kolkata",
              "Asia/Calcutta"
            ]
          }}
        onChange={(e,value)=> handleChange(value)}
        renderInput={(params) => <TextField {...params} label="Timezone" sx={{borderColor: 'white'}} />}
        />
  )
}

export default TimeZoneSelector

