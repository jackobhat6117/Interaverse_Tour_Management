import React, { useState } from "react";
import CustomTable from "../../../components/Table/CustomTable";
import Button1 from "../../../components/form/Button1";
import Icon from "../../../components/HOC/Icon";
import setDefaultBank from "../../../controllers/settings/finance/setDefaultBank";

function ActionCol({ params, reload }) {
  const [loading, setLoading] = useState(false);
  const handleDefault = async () => {
    setLoading(true);
    const resp = await setDefaultBank(params?._id);
    setLoading(false);
    if (resp.return) {
      reload();
    }
  };

  return (
    <div className="flex items-center gap-4 w-full text-gray-600">
      <Button1
        className={`flex-1 ${
          params?.isDefault
            ? "!bg-theme1/20 !text-theme1"
            : "!text-gray-600 !bg-gray-200"
        }`}
        onClick={handleDefault}
        disabled={loading}
      >
        {params?.isDefault ? "Default Account" : "Set as default"}
      </Button1>
      <span className="p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer ">
        <Icon icon="tabler:edit" />
      </span>
      <span className="p-2 rounded-md !bg-gray-200 flex items-center justify-center cursor-pointer ">
        <Icon icon="material-symbols:delete-outline" className="text-red-500" />
      </span>
    </div>
  );
}
export default function BankAccounts({ data, loading, banks, reload }) {
  let modData = data?.map((obj) => ({
    ...obj,
    bankName: getBankName(obj.bankCode),
  }));

  function getBankName(code) {
    let bank = banks?.find((obj) => obj.value === code);
    return bank?.label;
  }

  let columns = [
    {
      field: "bankName",
      headerName: "Bank",
    },
    { field: "accountNumber", headerName: "Account Number" },
    { field: "accountName", headerName: "Account Name" },
    {
      field: "status",
      headerName: "Action",
      flex: 1,
      minWidth: 300,
      renderCell: ({ row }) => (
        <ActionCol
          params={row}
          reload={reload}
        />
      ),
    },
  ];
  return (
    <div className=" text-primary">
      <CustomTable rows={modData} columns={columns} loading={loading} />
    </div>
  );
}
