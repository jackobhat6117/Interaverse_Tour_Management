import { useSnackbar } from "notistack";
import Icon from "../HOC/Icon";
import { IconButton } from "@mui/material";

const CopyToClipboardButton = ({ textToCopy }) => {
  const { enqueueSnackbar } = useSnackbar();

  const handleCopyToClipboard = () => {
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => {
        enqueueSnackbar("Copied to clipboard!", "info");
      })
      .catch((err) => {
        console.error("Unable to copy to clipboard", err);
      });
  };

  return (
    <IconButton onClick={handleCopyToClipboard}>
      <Icon icon="ci:copy" />
    </IconButton>
  );
};

export default CopyToClipboardButton;
