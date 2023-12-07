import React, { useEffect, useState } from "react";
import TextInput from "../../../components/form/TextInput";
import { FormControlLabel, MenuItem } from "@mui/material";
import Button1 from "../../../components/form/Button1";
import IOSSwitch from "../../../components/form/IOSSwitch";
import getBanks from "../../../controllers/settings/finance/getBanks";
import checkBankInfo from "../../../controllers/settings/finance/checkBankInfo";
import addBankAccount from "../../../controllers/settings/finance/addBankAccount";
import { useSnackbar } from "notistack";
import getBankAccounts from "../../../controllers/settings/finance/getBankAccounts";
import BankAccounts from "./BankAccounts";

export default function PayoutMethods() {
  const [ownBankAccounts, setOwnBankAccounts] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const [showAdd,setShowAdd] = useState(false);
  const [banks, setBanks] = useState([]);
  const [accountName, setAccountName] = useState();
  const [loading, setLoading] = useState(true);
  const [bankForm, setBankForm] = useState({
    bankCode: undefined,
    accountNumber: undefined,
  });

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);

    const savedAccount = await getBankAccounts();
    const res = await getBanks();
    if (res.return) {
      const data = res.data || [];
      try {
        const bankList = [];
        data?.forEach((bank) => {
          bankList.push({
            value: bank?.code,
            label: bank?.name,
          });
        });
        setBanks(bankList);
      } catch (ex) {}
    }

    if (savedAccount.return) {
      const data = savedAccount.data?.data || [];
      setOwnBankAccounts(data);
    }
    setLoading(false);
  }

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

    setLoading(true);
    const res = await addBankAccount(bankForm);
    setLoading(false);
    if (res.return) {
      enqueueSnackbar("Successful", { variant: "success" });
    } else enqueueSnackbar(res.msg, { variant: "error" });
  }

  console.log(ownBankAccounts)

  return (
    <div
      className={`flex flex-col gap-4 ${
        !ownBankAccounts.length ? "bg-emptypage" : ""
      } h-full flex-1`}
    >
      {/* <div className="flex gap-2 flex-wrap">
        <Link to="?page=payout" className={`${page === 'payout' || !page ? 'btn':'btn-theme-light'}`}>
          Payout
        </Link>
        <Link to="?page=methods" className={`${page === 'methods' ? 'btn':'btn-theme-light'}`}>
          Payout Methods
        </Link>
      </div>
      <hr /> */}
      <div className="flex flex-col gap-4 content-max-w">
        {showAdd ? 
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-4 content-max-w"
          >
            <h5>Bank Information</h5>
            <TextInput
              select
              label={"Select bank"}
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
        :null}
        <hr />
        <div className="flex gap-4 justify-between items-center">
          <h5>Saved Accounts</h5>
          <div>
            {!showAdd ? 
              <Button1 onClick={() => setShowAdd(!showAdd)}>
                Add Account
              </Button1>
            : null}
          </div>
        </div>
        <BankAccounts banks={banks} data={ownBankAccounts} loading={loading} />
        <div>
          <h5>Payout settings</h5>
          <p>Set how you want to recieve your payouts</p>
        </div>
        <div className="self-start flex flex-col gap-4">
          <div className="flex justify-between items-start gap-6">
            <p>Automatically process payout to my account</p>
            <span>
              <FormControlLabel control={<IOSSwitch defaultChecked />} />
            </span>
          </div>
          <div className="flex justify-between items-start gap-6">
            <p>Set payout time</p>
            <span>
              <TextInput select size="small" label={""}>
                <MenuItem>Daily</MenuItem>
                <MenuItem>Weekly</MenuItem>
                <MenuItem>Monthly</MenuItem>
              </TextInput>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
