import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function SelectUser() {
  const [users, setUsers] = React.useState([] as string[]);
  const [recipient, setRecipient] = React.useState('');
  React.useEffect(() => {
    setUsers(["mentor"])
  }, [])

  const handleChange = (event: any) => {
    setRecipient(event.target.value as string);
  };

  return (
    <div style={{zIndex: "400", position: "relative"}}>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={recipient}
          onChange={handleChange}
          label="chat user"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {users.map((recipient) => <MenuItem value={recipient} >{recipient}</MenuItem>)}
        </Select>
      </FormControl>
    </div>
  );
}
