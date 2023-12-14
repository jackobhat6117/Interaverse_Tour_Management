import React, { useEffect, useState } from "react";
import TextInput from "../../../components/form/TextInput";
import { FormControlLabel, MenuItem } from "@mui/material";
import Button1 from "../../../components/form/Button1";
import IOSSwitch from "../../../components/form/IOSSwitch";
import getBanks from "../../../controllers/settings/finance/getBanks";
import getBankAccounts from "../../../controllers/settings/finance/getBankAccounts";
import BankAccounts from "./BankAccounts";
import { AddBankForm } from "./AddBankForm";
import Modal1 from "../../../components/DIsplay/Modal/Modal1";

export default function PayoutMethods() {
  const [ownBankAccounts, setOwnBankAccounts] = useState([]);
  const [showAdd,setShowAdd] = useState(false);
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);

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
        <Modal1 open={showAdd} setOpen={setShowAdd}>
          <div className="p-6">
            <AddBankForm banks={banks} reload={load} />
          </div>
        </Modal1>
        <div className="flex gap-4 justify-between items-center">
          <h5>Saved Accounts</h5>
          <div>
            <Button1 onClick={() => setShowAdd(!showAdd)}>
              Add Account
            </Button1>
          </div>
        </div>
        <BankAccounts reload={load} banks={banks} data={ownBankAccounts} loading={loading} />
        <br />
        <div className="flex flex-col gap-2">
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
