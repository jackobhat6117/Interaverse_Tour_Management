import React, { useEffect, useState } from "react";
import { ReactComponent as Astraunant } from "../../../assets/images/astronaut-launch-with-rocket.svg";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { profileSurveyData } from "../../../data/user/profileSurvey";
import updateProfile from "../../../controllers/user/updateProfile";
import { setUser } from "../../../redux/reducers/userSlice";
import BusinessDetail from "./BusinessDetail";
import LegalEntity from "./LegalEntity";
import KeyContact from "./KeyContact";
import { Step, Stepper } from "@mui/material";
import Icon from "../../HOC/Icon";
import { Link, useLocation, useNavigate } from "react-router-dom";
import checkProfileComplete from "../../../features/profile/checkProfileComplete";
import Button1 from "../../form/Button1";
import Logo from "../../Logo/Logo";
import verifyBusiness from "../../../controllers/user/verifyBusiness";
import verifyBusinessRemove from "../../../controllers/user/verifyBusinessRemove";
import BusinessDocument from "./BusinessDocument";

export const profileSteps = [
  { label: "Business Detail", elem: <BusinessDetail /> },
  { label: "Legal Entity", elem: <LegalEntity /> },
  { label: "Key Contact", elem: <KeyContact /> },
  // {label: 'Training',elem: <Training />}
];
const steps = profileSteps;
const CurComp = (props) => {
  return React.cloneElement(props.component || <></>, props);
};
export default function ProfileSurvey() {
  const { user } = useSelector((state) => state.user.userData);
  const [data, setData] = useState({
    ...profileSurveyData,
    ...(user?.detail || {}),
  });
  const { enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const stepq = query.get("step");
  const edit = query.get("edit");
  const completedSteps = checkProfileComplete(user);
  const completed = completedSteps.every((obj) => obj.complete);
  const [activated, setActivated] = useState(false);
  const [step, setStep] = useState(() => {
    let cur = 0;
    let stop = false;

    console.log(completedSteps)

    completedSteps.map((obj) => {
      if (!stop) obj.complete ? cur++ : (stop = true);

      return true;
    });
    console.log(cur,stop)

    cur = stepq ? Math.max(0, Math.min(cur,Number(stepq) - 1)) : cur;
    // if(user?.detail?.interestedIn.length)
    //   cur = 1;
    // if(user?.detail?.sizeOfOrganization)
    //   cur = 2;
    // if(user?.detail?.registeredBusinessName && user?.detail?.typeOfBusiness)
    //   cur = 3;

    return cur;
  });

  useEffect(() => {
    let cur = 0;
    if (!completed && !completedSteps[step]?.complete) {
      completedSteps.map((obj, i) => {
        if (obj.complete) cur = i;
        return true;
      });
      
      if(edit) {
        setStep(Math.min(edit-1,cur))
      } else if (step > cur + 1) setStep(cur + 1);
    }
    //eslint-disable-next-linex
  }, [step, completedSteps, completed, edit]);

  async function sendProfile(data) {
    let modData = { ...data };
    // modData['interestedIn'] = data?.interestedIn?.join(',');
    // console.log('modData: ',data,{...profileSurveyData,...(user.detail || {})})
    // if(JSON.stringify(data) === JSON.stringify({...profileSurveyData,...(user.detail || {})}))
    //   return setStep(step => step < steps.length-1 ? step+1 : step && setOpen(false))

    setLoading(true);
    const res = await updateProfile(modData);
    setLoading(false);
    if (res.return) {
      if (step < steps.length - 1) {
        // setStep(step => step+1)
      } else {
        enqueueSnackbar("Profile Completed", { variant: "success" });
        navigate({
          search: 'step=5'
        })
        // dispatch(setUser(res?.data?.data))
      }
      res?.data && dispatch(setUser(res?.data));
      return true;
    } else enqueueSnackbar(res.msg, { variant: "error" });

    return false;
  }

  const stepNext = () => {
    // if(step < steps.length-1 )
    if (edit) {
      navigate("/profile?step=5&edit=" + edit);
      setStep(5);
    } else setStep((step) => step + 1);
    // else
    //   sendProfile(data);
  };

  const stepBack = () => {
    if (edit) {
      navigate("/profile?step=5&edit=" + edit);
      setStep(5);
    } else setStep((step) => (step > 0 ? step - 1 : 0));
  };

  function handleSetStep(n) {
    let cur = 0;
    let stop = false;

    completedSteps.map((obj) => {
      if (!stop) obj.complete ? cur++ : (stop = true);

      return true;
    });

    cur = Math.max(0, Math.min(cur,Number(n)));

    setStep(cur)
  }

  // function skip() {
  //   setOpen(false);
  //   sessionStorage.setItem('profileSurvey','skip')
  // }

  // const handleChange = useCallback((updatedData) => {
  //   setData((prevData) => ({...prevData,...updatedData}));
  // },[])

  return !activated ? (
    <div className="flex min-h-screen h-screen max-w-full overflow-hidden">
      <div className="hidden md:flex flex-col justify-between w-[30%] max-w-[300px] bg-[#B3DBFF]">
        <div className="w-full p-3 px-5 flex gap-2 justify-center sm:justify-start">
          <Logo />
        </div>
        <div className="relative h-[400px] ">
          <Astraunant className=" w-full h-auto bottom-0 translate-x-8 absolute " />
        </div>
      </div>
      <div className="overflow-y-auto max-h-full flex-1 max-w-full">
        <div className="flex flex-col items-center justify-center flex-1 p-4 max-w-full">
          <div className="md:hidden">
            <Logo />
          </div>
          <Link
            to="/welcome/"
            className="flex items-center justify-end gap-1 w-full px-6 my-2 py-2 text-gray-500 font-bold"
          >
            <Icon icon="lucide:home" className="!h-4" /> Home
          </Link>
          {!completed || step < steps.length ? (
            <div className="flex flex-col gap-5 w-[600px] min-h-[85%] max-w-full">
              {!edit ? (
                <div>
                  <ProfileStepperNav
                    activeStep={step}
                    steps={steps}
                    setStep={handleSetStep}
                  />
                </div>
              ) : null}

              <div className="flex-1 flex flex-col gap-5 justify-center">
                {!user?.detail?.requestedVerification ? 
                  <CurComp
                  data={data}
                  setData={setData}
                    key={"editor"}
                    user={user}
                    component={steps[step]?.elem}
                    updateProfile={sendProfile}
                    back={stepBack}
                    next={stepNext}
                    loading={loading}
                    />
                :
                  <div className="flex flex-col items-center">
                    <h5>Your request is under review!</h5>
                    <p>You'll be able to update after confirmaion </p>
                  </div>
                }
                <Link
                  to="/welcome/"
                  className="flex items-center justify-center gap-1 w-full px-6 my-2 py-2 text-gray-500 font-bold"
                >
                  Close and continue later
                </Link>
              </div>
            </div>
          ) : step >= steps.length || completed ? (
            <ReviewBusinessProfile
              userId={user?._id}
              completed={completed}
              setStep={setStep}
              activate={() => setActivated(true)}
            />
          ) : null}


        </div>
      </div>
    </div>
  ) : (
    <Congradulations />
  );
}

export function ReviewBusinessProfile({ setStep, activate, completed, user, callback }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const edit = searchParams.get("edit");
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  function handleContinue() {
    navigate("/profile?step=5&edit=" + (Number(edit) + 1));
  }
  async function activateBusiness() {
    setLoading(true);
    const res = await updateProfile({ requestedVerification: true });
    if (res.return) {
      activate && activate();
      dispatch(setUser(res?.data));
    } else
      enqueueSnackbar("Failed requesting activation. Please contact support", {
        variant: "error",
      });
    setLoading(false);
  }

  async function handleVerify() {
    setLoading(true);
    const res = await verifyBusiness(user?._id)
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Bussiness Approved',{variant: 'success'})
    } else 
      enqueueSnackbar(res.msg,{variant: 'error'})

    callback && callback(res.return)
  }

  async function handleRemoveVerify() {
    setLoading(true);
    const res = await verifyBusinessRemove(user?._id)
    setLoading(false);
    if(res.return) {
      enqueueSnackbar('Bussiness Approved',{variant: 'success'})
    } else 
      enqueueSnackbar(res.msg,{variant: 'error'})

    callback && callback(res.return)
  }

  const EditDetail = ({ n }) => (
    false
    // <button className="p-1 text-theme1 bg-theme1/5" onClick={() => setStep(n)}>
    //   Edit Details
    // </button>
  );
  return (
    <div className="flex flex-col gap-5 w-[600px] min-h-[85%] max-w-full py-10">
      <div className="w-full p-3 px-5 flex md:hidden gap-2 justify-center md:justify-start">
        <Logo />
      </div>
      {!edit || Number(edit) === 1 || Number(edit) > 4 ? (
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-primary/10">Business Detail</div>
          <div>
            <BusinessDetail user={user} review={<EditDetail n={0} />} />
          </div>
        </div>
      ) : null}
      {!edit || Number(edit) === 2 || Number(edit) > 4 ? (
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-primary/10">Legal Entity</div>
          <div>
            <LegalEntity user={user} review={<EditDetail n={1} />} />
          </div>
        </div>
      ) : null}
      {!edit || Number(edit) === 3 || Number(edit) > 4 ? (
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-primary/10">Key Contact</div>
          <div>
            <KeyContact user={user} review={<EditDetail n={2} />} />
          </div>
        </div>
      ) : null}
      {!edit || Number(edit) === 4 || Number(edit) > 4 ? (
        <div className="flex flex-col gap-5">
          <div className="p-4 bg-primary/10">Upload Documents</div>
          <div>
            <BusinessDocument user={user} review={<EditDetail n={3} />} />
          </div>
        </div>
      ) : null}

      <div>
        {user?.detail?.isVerified ? 
          <Button1 loading={loading} className='!bg-red-500 !text-white' onClick={handleRemoveVerify}>Remove Business Verification</Button1>
        :
          <Button1 loading={loading} onClick={handleVerify}>Verify Business</Button1>
        }
      </div>

      {edit && Number(edit) <= steps.length ? (
        <div>
          <Button1 onClick={() => handleContinue()}>Continue</Button1>
        </div>
      ) : completed ? (
        <div>
          <Button1 onClick={activateBusiness} loading={loading}>
            {!edit ? "Submit for review" : "Resubmit for review"}
          </Button1>
        </div>
      ) : null}
    </div>
  );
}

function Congradulations() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 4000);
  }, []);
  return (
    <div className="flex flex-col min-h-screen">
      {loading ? (
        <div className="flex flex-col flex-1 justify-center items-center ">
          <div className="w-full  px-5 flex gap-2 justify-center ">
            <Logo />
          </div>
          <img
            src={"/gifs/loading-bar.gif"}
            alt="Preloader"
            className="h-[150px] -translate-y-10"
          />
        </div>
      ) : (
        <div className="flex flex-1 flex-col items-center justify-center text-center w-full gap-10 p-4">
          <h4>We have received your activation request</h4>
          <div className="flex flex-col items-center gap-4">
            {/* <h4 className='max-w-[500px]'>Your business has been registered with us</h4> */}
            <div className="max-w-[500px]">
              <p>
                Our team will process your request and setup your selling
                platform.
              </p>
              <p>Once your platform is ready, we will notify you via email.</p>
              {/* <p>
                Training will begin on the 21st November 2023, Please if you need any information or assistance before then, do well to contact us on 09030002629. Thank you.
              </p> */}
            </div>
          </div>
          <Link
            to="/"
            className="btn-theme rounded-md w-full justify-center max-w-[500px]"
          >
            Continue
          </Link>
        </div>
      )}
    </div>
  );
}

function ProfileStepperNav({ activeStep, steps, setStep }) {
  const CustomConnector = () => (
    <div className="flex justify-center items-center text-primary/20 flex-1">
      <hr className="w-3" />
      <Icon icon={"ri:plane-line"} className="w-4 h-4 rotate-90" />
    </div>
  );
  return (
    <div className="p-4 bg-[#eef4fd] rounded-md max-w-full overflow-x-auto">
      <Stepper activeStep={activeStep} connector={<CustomConnector />}>
        {steps.map((obj, i) => {
          return (
            <Step key={i} onClick={() => setStep(i)}>
              <div className="flex flex-col gap-1 items-center justify-between cursor-pointer">
                <div
                  className={`flex justify-center  items-center p-2 w-7 h-7 rounded-full text-secondary ${
                    activeStep === i ? "bg-theme1" : "bg-primary/40"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`cursor-pointer text-center flex-1 ${
                    activeStep === i ? "text-theme1" : "text-primary/50"
                  }`}
                >
                  {obj.label}
                </span>
              </div>
            </Step>
          );
        })}
      </Stepper>
    </div>
  );
}
