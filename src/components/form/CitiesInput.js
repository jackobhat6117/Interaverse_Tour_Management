import React, { useEffect, useState } from "react";
import { Autocomplete, InputAdornment, TextField } from "@mui/material";
import getCityCodes from "../../controllers/Flight/getCityCodes";
import axios from "axios";


var cancelTokenSource = null;

export default function CitiesInput({
  value,
  onChange,
  label,
  icon,
  className,
  required,
  optionLabel = "iata",
  ...restProps
}) {
  // countries.all.filter((country) => country.status === 'assigned');
  const [option, setOption] = useState([]);
  const [loading, setLoading] = useState(false);

  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    load();
    //eslint-disable-next-line
  }, [value]);
  
  async function load() {
    if (!value) return setOption([]);
    if (value?.icao) return false;
    
    if(cancelTokenSource) {
      cancelTokenSource.cancel('Request canceled.')
    }
    cancelTokenSource = axios.CancelToken.source();
    
    setLoading(true);
    const res = await getCityCodes(value,cancelTokenSource?.token);
    setLoading(false);
    if (res.return) {
      let data = res?.data?.data;
      if (optionLabel) data = data?.filter((obj) => obj[optionLabel]);
      setOption(data);
    }

  }

  function handleChange(newVal,fromKey) {
    if (!fromKey && (restProps.lockUpdate && newVal.length > 4)) return false;

    if (onChange) onChange(newVal);
  }
  return (
    <Autocomplete
      className={"min-w-[200px] " + className}
      {...restProps}
      open={isFocused && !restProps.lockUpdate}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
      loading={loading}
      noOptionsText="No data"
      disableClearable
      freeSolo
      options={option}
      getOptionLabel={(option) =>
        typeof option === "string"
          ? option
          : option.city + ` (${option[optionLabel]})`
      }
      value={value}
      onChange={(ev, newVal) => {
        handleChange(newVal);
        setIsFocused(false);
      }}
      onInputChange={(ev, newVal) => {
        handleChange(newVal,ev?.type === 'keydown' || ev?.type === 'keyup' || ev?.type === 'keypress');
        setIsFocused(true);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={restProps.placeholder}
          required={required}
          value="test"
          label={label || "Nationality"}
          InputProps={{
            ...params.InputProps,
            type: "search",
            startAdornment: (
              <InputAdornment position="start">{icon}</InputAdornment>
            ),
          }}
          InputLabelProps={{
            shrink: true,
          }}
        />
      )}
      renderOption={(props, opt) => {
        return (
          <div
            {...props}
            className="flex items-center overflow-hidden justify-between !p-2 !cursor-pointer border-b"
            style={{ padding: 10, cursor: "pointer" }}
          >
            <div className="flex flex-col flex-1 overflow-hidden">
              <h6>{opt.city}</h6>
              <small
                className="!whitespace-nowrap overflow-hidden max-s-full !overflow-ellipsis !block"
                title={opt.name}
              >
                {opt.name}
              </small>
            </div>
            <small className="min-w-[20px] pl-2">{opt[optionLabel]}</small>
          </div>
        );
      }}
    />
  );
}
