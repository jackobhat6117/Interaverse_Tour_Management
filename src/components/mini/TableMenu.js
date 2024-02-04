import { Popper } from "@mui/base";
import { ClickAwayListener } from "@mui/material";

export default function TableMenu(props) {
  const {open,setOpen,anchorEl} = props;
  return (
    <Popper open={open} anchorEl={anchorEl} placement='bottom-end'>
      <ClickAwayListener onClickAway={() => setOpen(false)}>
      <div className='bg-seconday p-4 flex my-2 flex-col gap-1 bg-secondary rounded-md shadow'>
        {props.children}
      </div>
      </ClickAwayListener>
    </Popper>

  )
}