import React, { ReactElement } from "react";
import FormControl from "@mui/material/FormControl/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";

export const BasicSelect = (props) => {
  return (
    <>
      <FormControl variant="standard" fullWidth>
        <Select
          labelId="select-outlined-label"
          id={props.Id}
          value={props.value}
          onChange={props.setDropdownValue}
          variant="standard"
          disableUnderline={true}
          sx={{
            backgroundColor: "#ffffff",
            border: "2px solid #f0f0f0 ",
            borderRadius: 2,
            px: 2
          }}
        >
          {props.lists.map((item) => (
            <MenuItem key={item.id} value={item.name}>
              {item.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </>
  );
};
