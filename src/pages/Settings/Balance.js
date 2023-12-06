import React, { useEffect, useState } from "react";
import Button1 from "../../components/form/Button1";
import { FileDownloadOutlined } from "@mui/icons-material";
import CustomTable from "../../components/Table/CustomTable";
import { alertType } from "../../data/constants";
import Modal1 from "../../components/DIsplay/Modal/Modal1";
import TextInput from "../../components/form/TextInput";
import FilterCalendar from "../../components/form/FilterCalendar";
import getWallet from "../../controllers/settings/wallet/getWallet";
import { useSnackbar } from "notistack";
import setLowBalanceThreshold from "../../controllers/settings/wallet/setLowBalanceThreshold";
import getWalletTransactions from "../../controllers/settings/wallet/getWalletTransactions";
import moment from "moment";
import PaystackButton from "../../components/Paystack/PaystackButton";
import { generateRef } from "../../utils/generateRef";
import { useSelector } from "react-redux";
import topUpWalletUsingModal from "../../controllers/settings/wallet/topUpwalletUsingModal";

export default function BalanceSetting() {
  const columns = [
    { field: "transactionRef", headerName: "Transaction Ref", flex: 1 },
    { field: "amount", headerName: "Amount (NGN)", flex: 1 },
    {
      field: "status",
      headerName: "Status",
      flex: 1,
      renderCell: (params) => (
        <div className={`${alertType[params.value]}`}>{params.value}</div>
      ),
    },
    {
      field: "isCredit",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => (
        <div className={`${params.value ? "success" : "error"}`}>
          {params.value ? "Credit" : "Debit"}
        </div>
      ),
    },
    {
      field: "createdAt",
      headerName: "Date Created",
      flex: 1,
      renderCell: (params) => new Date(params.value).toDateString(),
    },
  ];

  const [balanceData, setBalanceData] = useState({ balance: 0 });
  const [walletTransactions, setWalletTransactions] = useState([]);
  const [dateFilter, setDateFilter] = useState({
    range: "week",
    date: new Date().toLocaleDateString(),
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadTransaction() {
      let range = undefined;
      const date =
        dateFilter?.range !== "All"
          ? moment(dateFilter?.date)
              .subtract(1, dateFilter?.range)
              .format("MM/D/YYYY")
          : undefined;
      if (date) {
        range = date + "," + dateFilter?.date;
      }
      setLoading(true);
      const transactions = await getWalletTransactions(range);
      setLoading(false);
      if (transactions.return) {
        setWalletTransactions(transactions.data?.data);
      }
    }
    loadTransaction();
    load();
  }, [dateFilter?.date, dateFilter?.range]);

  async function load() {
    const res = await getWallet();
    if (res.return) {
      setBalanceData(res?.data);
    }
  }
  return (
    <div className="flex flex-col gap-4 !text-primary/60 ">
      <div className="flex justify-between items-center gap-4 flex-wrap">
        <div className="w-full sm:w-auto">
          <SetupThreshold reload={load} />
        </div>
        <div className="w-full sm:w-auto flex justify-end">
          <div className="flex gap-5 items-center">
            <FilterCalendar
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
            <FileDownloadOutlined color="primary" className="cursor-pointer" />
          </div>
        </div>
      </div>
      <hr />
      <div className="flex justify-between flex-wrap">
        <div className="flex flex-col gap-3 mb-4">
          <div className="inline-block self-start">
            <TopUpBalance reload={load} />
          </div>
          <div className="tooltip">
            In test mode your balance is unlimited. It is topped-off
            automatically as you spend it.
          </div>
          {balanceData?.lowBalanceThreshold > balanceData.balance && (
            <div className="tooltip error">
              You are running low on funds. To avoid service disruption, please
              top-up.
            </div>
          )}
        </div>
        <div>
          <div className="card p-4 rounded-lg text-right">
            <h5>
              Current Balance <span className="text-primary/50">(NGN)</span>
            </h5>
            <h4 className="text-theme1">{balanceData.balance}</h4>
          </div>
        </div>
      </div>
      <CustomTable
        rows={walletTransactions}
        columns={columns}
        loading={loading}
      />
    </div>
  );
}

function TopUpBalance({ reload }) {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({ amount: 0 });
  const { user } = useSelector((state) => state.user.userData);

  const handleTopUp = async (reference) => {
    await topUpWalletUsingModal(reference);
  };

  return (
    <div>
      <Button1 onClick={() => setOpen(true)}>Top-up Balance</Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <div className="p-4 flex flex-col gap-6 max-w-[800px]">
          <h4>Top-up balance</h4>
          <TextInput
            label="Amount"
            type="number"
            value={data.amount || 0}
            onChange={(ev) => setData({ ...data, amount: ev.target.value })}
            InputProps={{
              endAdornment: "NGN",
            }}
          />
        </div>
        <div className="flex gap-2 p-4">
          <Button1 className="btn-theme-light" onClick={() => setOpen(false)}>
            Cancel
          </Button1>
          <PaystackButton
            config={{
              amount: data.amount * 100,
              reference: generateRef("WTR-"),
              email: user?.email,
            }}
            onSuccess={(reference) => {
              handleTopUp(reference?.reference);
              setOpen(false);
              reload();
            }}
          >
            <Button1>Save Changes</Button1>
          </PaystackButton>
        </div>
      </Modal1>
    </div>
  );
}

function SetupThreshold({ reload }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState();
  const { enqueueSnackbar } = useSnackbar();

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await setLowBalanceThreshold({ amount });
    if (res.return) {
      enqueueSnackbar("Successful", { variant: "success" });
      setOpen(false);
      reload && reload();
    } else enqueueSnackbar(res.msg, { variant: "error" });
    setLoading(false);
  }
  return (
    <div>
      <Button1
        onClick={() => setOpen(true)}
        className="!light-bg sm:!bg-secondary !w-full sm:!w-auto !shadow-none !text-none !text-gray-500"
      >
        Set-up low balance threshold
      </Button1>
      <Modal1 open={open} setOpen={setOpen}>
        <form
          onSubmit={handleSubmit}
          className="p-4 flex flex-col gap-6 max-w-[800px]"
        >
          <h4>Set-Up low balance threshold</h4>
          <TextInput
            label="Low balance threshold (ngn)"
            value={amount}
            onChange={(ev) => setAmount(ev.target.value)}
            tooltip="When your Miles balance reaches this value or below, all administrators in your organization will receive a low balance email. You should configure a threshold that will allow you to top up your balance on time."
            InputProps={{
              endAdornment: "NGN",
            }}
          />
          <div className="flex gap-2 p-4">
            <Button1 className="btn-theme-light" onClick={() => setOpen(false)}>
              Cancel
            </Button1>
            <Button1 loading={loading} type="submit">
              Save Changes
            </Button1>
          </div>
        </form>
      </Modal1>
    </div>
  );
}
