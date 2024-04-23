import { Button } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Button1(props) {
  const { label, children, loading, disabled, tooltip, ...buttonProps } = props;
  const [showtip, setShowtip] = useState(false);

  const navigate = useNavigate();

  function handleLink() {
    if (buttonProps.to) navigate(buttonProps.to);
  }

  return (
    <Button
      variant="contained"
      type="button"
      onClick={handleLink}
      {...buttonProps}
      sx={{ textTransform: "none" }}
      disabled={disabled || loading}
      onMouseEnter={() => setShowtip(true)}
      onMouseOut={() => setShowtip(false)}
      className={
        "w-full relative !shadow-none  !rounded-lg !min-w-[80px] !px-4 !py-[7px] " +
        (disabled ? " !cursor-not-allowed " : props.className) +
        " " +
        (props.size === "small" ? " !px-3 !rounded-sm !py-0 sm:!py-0 " : "")
      }
    >
      {loading ? "Please Wait..." : label || children}
      {tooltip ? (
        <div
          className={`absolute top-full left-0 my-1  bg-primary text-secondary rounded p-2 text-xs ${
            showtip ? "" : "hidden"
          }`}
        >
          {tooltip}
        </div>
      ) : null}
    </Button>
  );
}

export default Button1;
