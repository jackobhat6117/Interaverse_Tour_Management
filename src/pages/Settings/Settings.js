import React, { useEffect, useState } from "react";
import TextInput from "../../components/form/TextInput";
import Button1 from "../../components/form/Button1";
import { ProfilePicture } from "../../components/form/ProfilePicture";
import { useSnackbar } from "notistack";
import addCustomKey from "../../controllers/settings/paystack/addCustomKey";
import updateProfile from "../../controllers/user/updateProfile";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/reducers/userSlice";
import getCustomKeys from "../../controllers/settings/paystack/getCustomKey";
import PasswordInput from "../../components/form/PasswordInput";

export default function Settings() {
  const { user } = useSelector((state) => state.user.userData);
  const [data, setData] = useState({
    agencyLogo: user?.detail?.agencyLogo || "",
    registeredBusinessName: user?.detail?.registeredBusinessName || "",
    agencyURL: user?.detail?.agencyURL || "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function handleSubmit(ev) {
    ev.preventDefault();

    const formData = new FormData();
    Object.entries(data).map(([key, val]) => formData.append(key, val));

    setLoading(true);
    const res = await updateProfile(formData);
    setLoading(false);
    if (res.return) {
      enqueueSnackbar("Profile Updated", { variant: "success" });
      // console.log(res.data);
      if (res?.data?.data) dispatch(setUser(res.data.data));
    } else enqueueSnackbar(res.msg || "Error", { variant: "error" });
    // for (let [key, value] of formData.entries()) {
    //   console.log(`${key}: ${value}`);
    // }
  }
  return (
    <div className="flex flex-col gap-4">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-[700px]"
      >
        <div className="flex gap-4">
          <ProfilePicture
            value={data.agencyLogo}
            onChange={(value) => {
              setData({ ...data, agencyLogo: value });
            }}
          />
          <div className="flex flex-col justify-center">
            <h4>Logo</h4>
            <p>
              Pick a logo for your agency. The upload file size limit is 1MB.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <TextInput
            label={"Agency Name"}
            placeholder={"xyz team"}
            value={data.registeredBusinessName}
            onChange={(ev) =>
              setData({ ...data, registeredBusinessName: ev.target.value })
            }
          />
          <div>
            <TextInput
              value={data.agencyURL}
              onChange={(ev) =>
                setData({ ...data, agencyURL: ev.target.value })
              }
              label={"Agency URL"}
              placeholder={"app.miles.com/agencyname"}
            />
            <div className="tooltip">
              This is a unique identifier for your team. It must contain only
              URL-friendly characters.
            </div>
          </div>
        </div>
        <div className="flex sm:justify-end">
          <Button1
            loading={loading}
            type="submit"
            className="!self-end !text-base sm:!w-auto !px-4 !capitalize"
          >
            Save Changes
          </Button1>
        </div>
      </form>
    </div>
  );
}