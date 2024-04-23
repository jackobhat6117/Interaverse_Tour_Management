import React, { useState } from "react";
import Button1 from "../form/Button1";
import { Link, useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import recoverPassword from "../../controllers/Auth/recoverPassword";
import PasswordInput from "../form/PasswordInput";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../../redux/reducers/userSlice";
import resendOTP from "../../controllers/Auth/resendOTP";
import OTPInput from "./OTPInput";
import Logo from "../Logo/Logo";
import staffRecoverPassword from "../../controllers/Auth/staff/recoverPassword";
import staffResendOTP from "../../controllers/Auth/staff/resendOTP";

export default function RecoverPassword() {
  const [data, setData] = useState({ otp: "", password: "" });
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const searchParams = new URLSearchParams(window.location.search);
  const email = searchParams.get("email");
  const {userData: {agent}} = useSelector(state => state.user)


  async function handleSubmit(ev) {
    ev.preventDefault();

    setLoading(true);
    let res = {return: 0,msg: 'Something went wrong on our end! Please contact support 0xRCVPWD'}
    if(agent)
      res = await staffRecoverPassword(data);
    else
      res = await recoverPassword(data);
    setLoading(false);
    if (res.return) {
      enqueueSnackbar(res.msg || "Password Recovered.", { variant: "success" });
      let { token: accessToken, account: user } = res.data;
      dispatch(setUserData({ accessToken, user, loggedIn: true }));

      setTimeout(() => {
        navigate("?view=login");
      }, 2000);
    } else
      enqueueSnackbar(res?.msg || "Failed recovering password!", {
        variant: "error",
      });
  }

  async function handleResendOTP() {
    setLoading(true);
    let res = {return: 0,msg: 'Something went wrong on our end! Please contact support 0xRSTPWD'}
    if(agent)
      res = await staffResendOTP({email})
    else
      res = await resendOTP({ email });
    setLoading(false);
    if (res.return) {
      enqueueSnackbar(res.msg || "OTP has been resent.", {
        variant: "success",
      });
    } else
      enqueueSnackbar(res.msg || "Failed resending OTP!", { variant: "error" });
  }

  return (
    <div className="flex flex-col min-h-screen font-bold">
      <div className="w-full p-3 px-5">
        <Logo />
      </div>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center justify-center flex-1"
      >
        <div className="p-6 sm:card sm:bg-[#00000007] flex flex-col gap-5">
          <h2 className="pb-4">Recover Password</h2>
          <div className="flex flex-col gap-2">
            <p>OTP</p>
            <OTPInput
              required
              label={"OTP"}
              value={data.otp}
              onChange={(val) => setData({ ...data, otp: val })}
            />
          </div>
          <PasswordInput
            required
            label="New Password"
            value={data.password}
            onChange={(ev) => setData({ ...data, password: ev.target.value })}
          />
          {email ? (
            <div className="self-start">
              <Button1
                loading={loading}
                variant="text"
                className="self-end"
                label="Resend OTP"
                onClick={handleResendOTP}
              />
            </div>
          ) : null}
          <Button1
            loading={loading}
            type="submit"
            label={"Recover Password"}
          ></Button1>
          <div className="self-center text-center flex flex-col gap-3 w-full">
            <div className="flex justify-between flex-wrap gap-4 flex-1">
              <div className="">
                <Link className="text-theme1 font-bold" to="?view=login">
                  Login
                </Link>
              </div>
              <div className="flex gap-2 flex-wrap">
                <p className="text-primary/40">Dont have an account?</p>
                <Link className="text-theme1 font-bold" to="?view=register">
                  Sign up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
