import { TextField, IconButton } from "@mui/material";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { Search } from "@mui/icons-material";
import { alertType } from "../../data/constants";
import { getTestLevel } from "../../utils/testLevel";
import { SearchHandle } from "../search/SearchHandle";
import { SearchExampleHandle } from "../search/SearchExampleHandle";

SearchInput.propTypes = {
  label: PropTypes.string,
  placeHolder: PropTypes.string,
  exampleview: PropTypes.bool,
  searchview: PropTypes.bool,
  value: PropTypes.any,
  onChange: PropTypes.func,
  handleClick: PropTypes.func,
};
export default function SearchInput(props) {
  const { exampleview, searchview, handleClick } = props;
  const [exampleOpen, setExampleOpen] = useState(false);
  const [resultOpen, setResultOpen] = useState(false);
  const [value, setValue] = useState(props.value || "");

  function handleChange(ev) {
    let val = ev.target.value;
    setValue(val);
    props.onChange && props.onChange(val);

    if (val?.length === 0) {
      setResultOpen(false);
      setExampleOpen(true);
    } else {
      setExampleOpen(false);
      setResultOpen(true);
    }
  }

  function handleBlur() {
    setExampleOpen(false);
    setResultOpen(false);
  }

  function handleExample(ev) {
    let val = ev.target.value;
    if (val?.length === 0) setExampleOpen(true);
    else setExampleOpen(false);
  }

  return (
    <div className={`w-full relative`}>
      <TextField
        size="small"
        // label={<div className='font-bold' >
        //     {props.label || 'Search'}
        // </div>}
        value={value}
        placeholder="Search"
        {...props}
        InputProps={{
          endAdornment: (
            <IconButton
              onClick={(e) => {
                handleClick && handleClick(value);
              }}
            >
              <Search />
            </IconButton>
          ),
          ...props.InputProps,
        }}
        className={`w-full bg-secondary rounded-md ${props.className} ${getTestLevel() > getTestLevel('dev') ? 'invisible' : ''}`}
        onFocus={handleExample}
        onChange={handleChange}
        onBlur={handleBlur}
        // InputLabelProps={{
        //   shrink: true,
        // }}
      />
      {exampleview ? <SearchExampleHandle open={exampleOpen} /> : null}
      {searchview ? <SearchHandle value={value} open={resultOpen} /> : null}
    </div>
  );
}