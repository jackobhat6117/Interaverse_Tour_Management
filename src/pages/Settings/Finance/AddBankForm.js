import checkBankInfo from "../../../controllers/settings/finance/checkBankInfo";
import addBankAccount from "../../../controllers/settings/finance/addBankAccount";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import TextInput from "../../../components/form/TextInput";
import { MenuItem } from "@mui/material";
import Button1 from "../../../components/form/Button1";

export function AddBankForm({ banks, reload, updateCallback, data }) {
  const { enqueueSnackbar } = useSnackbar();
  const [accountName, setAccountName] = useState();
  const [bankForm, setBankForm] = useState({
    bankCode: data?.bankCode,
    accountNumber: data?.accountNumber,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data)
      setBankForm({
        bankCode: data?.bankCode,
        accountNumber: data?.accountNumber,
      });
  }, [data]);

  const checkBankAccountName = async (accountNumber) => {
    const bankInfo = await checkBankInfo({
      accountNumber,
      bankCode: String(bankForm.bankCode),
    });
    if (bankInfo.return) {
      setAccountName(bankInfo.data?.account_name);
    } else {
      setAccountName("No Account Found!");
    }
  };

  async function handleSubmit(ev) {
    ev.preventDefault();

    if (updateCallback) return updateCallback(data?._id, bankForm);

    setLoading(true);
    const res = await addBankAccount(bankForm);
    setLoading(false);
    if (res.return) {
      enqueueSnackbar("Successful", { variant: "success" });
      reload && reload();
    } else enqueueSnackbar(res.msg, { variant: "error" });
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 content-max-w">
      <h5>{updateCallback ? "Edit" : ""} Bank Information</h5>
      <TextInput
        select
        label={"Select bank"}
        value={bankForm.bankCode || ""}
        onChange={(e) => {
          setBankForm({
            ...bankForm,
            bankCode: e.target.value,
          });
        }}
      >
        {Array.isArray(banks) &&
          banks?.map((bank) => (
            <MenuItem value={bank.value}>{bank.label}</MenuItem>
          ))}
      </TextInput>
      <TextInput
        label={"Enter account number"}
        placeholder={"e.g 0047159973"}
        value={bankForm.accountNumber}
        onChange={(e) => {
          setBankForm({ ...bankForm, accountNumber: e.target.value });
          setAccountName();
          if (e.target.value && e?.target?.value?.length > 9) {
            setAccountName("Checking...");
            checkBankAccountName(e.target.value);
          }
        }}
        tooltip={accountName}
      />
      <span className="self-start">
        <Button1 type="submit" loading={loading}>
          Save bank details
        </Button1>
      </span>
    </form>
  );
}
