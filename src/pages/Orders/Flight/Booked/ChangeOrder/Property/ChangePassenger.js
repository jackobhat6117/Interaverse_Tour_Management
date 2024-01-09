import React, { useState } from "react";
import Button1 from "../../../../../../components/form/Button1";
import ContentInfo from "../../../../../../components/DIsplay/ContentInfo";
import ConfirmChangeModal from "./ConfirmChangeModal";
import TextInput from "../../../../../../components/form/TextInput";

export default function ChangePassenger({ passenger, callback, submit }) {
  const [data, setData] = useState({
    firstName: passenger?.name?.firstName,
    lastName: passenger?.name?.lastName,
  });

  const [open, setOpen] = useState(false);

  async function handleSubmit() {
    submit && submit(data);
    callback && callback()
  }

  return (
    <div className="flex flex-col gap-6">
      <ContentInfo>
        Use all given names and surnames exactly as they appear in your
        passport/ID to avoid boarding complications
      </ContentInfo>
      <form
        action={() => {
          setOpen(true);
        }}
        className="flex flex-col gap-6"
      >
        <div className="flex gap-4 flex-wrap">
          {/* <div>
            <SelectInput label="Title">
              <MenuItem value={"Mr"}>Mr</MenuItem>
              <MenuItem value={"Ms"}>Ms</MenuItem>
              <MenuItem value={"Mrs"}>Mrs</MenuItem>
            </SelectInput>
          </div> */}
          <div>
            <TextInput
              label={"First Name"}
              value={data.firstName}
              onChange={(ev) =>
                setData({ ...data, firstName: ev.target.value })
              }
            />
          </div>
          <div>
            <TextInput
              label={"Last Name"}
              value={data.lastName}
              onChange={(ev) => setData({ ...data, lastName: ev.target.value })}
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button className="px-6">Cancel</button>
          <Button1 onClick={() => setOpen(true)}>Confirm</Button1>
        </div>
      </form>
      <ConfirmChangeModal
        callback={handleSubmit}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}
