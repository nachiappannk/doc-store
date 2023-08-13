import React from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";

export const BasicSelect = (props) => {
  return (
    <>
      <FormControl variant="standard" fullWidth sx={{ mt: 1}}>
        <Select
          labelId="select-outlined-label"
          id={props.Id}
          value={props.value}
          onChange={props.setDropdownValue}
          variant="standard"
          disableUnderline={true}
          readOnly={props.disabled}
          disabled={props.disabled}
          sx={{
            backgroundColor: "#ffffff",
            border: "2px solid #f0f0f0 ",
            borderRadius: 2,
            px: 2,
            height: "1.9rem"
          }}
        >
          {props.lists.map((item) => (
            <MenuItem key={item.id} value={item}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
