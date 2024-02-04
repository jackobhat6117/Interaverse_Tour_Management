import React, { useEffect, useState } from 'react'
import Button1 from '../../../components/form/Button1'
import { useSnackbar } from 'notistack';
import getCustomKeys from '../../../controllers/settings/paystack/getCustomKey';
import addCustomKey from '../../../controllers/settings/paystack/addCustomKey';
import PasswordInput from '../../../components/form/PasswordInput';
import TextInput from '../../../components/form/TextInput';
import Icon from '../../../components/HOC/Icon';

export default function PaymentGateway() {
  const [data, setData] = useState({
    clientId: "",
    clientSecret: "",
    webhook: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [editable,setEditable] = useState(false);

  useEffect(() => {
    load();
  }, []);

  async function load() {
    setLoading(true);
    const res = await getCustomKeys();
    setLoading(false);
    if (res.return) {
      let datas = res.data?.data || [];
      try {
        setData({
          clientId: datas[0].clientId,
          clientSecret: datas[0].clientSecret,
          webhook: datas[0].webhook || "",
        });
      } catch (ex) {}
    }
  }

  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    const res = await addCustomKey(data);
    setLoading(false);
    if (res.return) {
      enqueueSnackbar("Successfull", { variant: "success" });
    } else enqueueSnackbar(res.msg, { variant: "error" });
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 max-w-[700px] py-6"
    >
      <div className="flex flex-col gap-3">
        <h5>Payment Gateway</h5>
        <p>
          Use your own payment gateway by providing your Paystack key details.
        </p>
      </div>
      <div className='flex justify-end'>
        {!loading?
          <Icon icon={!editable ? 'tabler:edit' : 'material-symbols:edit-off'} className='cursor-pointer' onClick={() => setEditable(!editable)} />
        :null}
      </div>
      <div className="flex flex-col gap-6">
        <PasswordInput disabled={!editable}
          noValidation
          label={"Paystack Secret Key"}
          required
          value={data.clientSecret}
          onChange={(ev) => setData({ ...data, clientSecret: ev.target.value })}
          placeholder={"Sk_2909320932"}
        />
        <TextInput disabled={!editable}
          label={"Paystack Public Key"}
          required
          value={data.clientId}
          onChange={(ev) => setData({ ...data, clientId: ev.target.value })}
          placeholder={"Pk_2909320932"}
        />
        <TextInput disabled={!editable}
          label={"webhook"}
          value={data.webhook}
          onChange={(ev) => setData({ ...data, webhook: ev.target.value })}
        />
      </div>
      <div className="flex sm:justify-end">
        <Button1
          type="submit"
          loading={loading}
          className="sm:!self-end !text-base sm:!w-auto !px-4 !capitalize"
        >
          Save Changes
        </Button1>
      </div>
    </form>
  );
}
