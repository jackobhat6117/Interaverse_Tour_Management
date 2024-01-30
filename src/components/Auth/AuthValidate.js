import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet } from 'react-router-dom';
import Auth from './Auth';
import getAccount from '../../controllers/user/getAccount';
import { setUser } from '../../redux/reducers/userSlice';
import LoadingBar from '../animation/LoadingBar';
import Logo from '../Logo/Logo';
import updateProfile from '../../controllers/user/updateProfile';


export default function AuthValidate() {
  const {userData} = useSelector(state => state.user)
  const {loggedIn,user} = userData;

  const dispatch = useDispatch();
  
  useEffect(() => {
    loadUser();
    // eslint-disable-next-line

    const script = document.createElement('script');

    try {

      script.type = 'text/javascript';
      script.textContent = `
        // We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/mqb9wn1p'
        (function(){
          var w=window;
          var ic=w.Intercom;
          if(typeof ic==="function"){
            ic('reattach_activator');
            ic('update',w.intercomSettings);
          }else{
            var d=document;
            var i=function(){i.c(arguments);};
            i.q=[];
            i.c=function(args){i.q.push(args);};
            w.Intercom=i;
            var l=function(){
              var s=d.createElement('script');
              s.type='text/javascript';
              s.async=true;
              s.src='https://widget.intercom.io/widget/mqb9wn1p';
              var x=d.getElementsByTagName('script')[0];
              x.parentNode.insertBefore(s,x);
            };
            if(document.readyState==='complete'){
              l();
            }else if(w.attachEvent){
              w.attachEvent('onload',l);
            }else{
              w.addEventListener('load',l,false);
            }
          }          
        })();
      `;

      document.body.appendChild(script);

      window?.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        app_id: "mqb9wn1p",
        name: `${user.firstName} ${user.lastName}`, // Full name
        email: `${user.email}`, // the email for your user
        created_at: `${user.createdAt}`, // Signup date as a Unix timestamp
      });

    } catch(ex) {}

    return () => {
      document.body.removeChild(script);
    }

    // eslint-disable-next-line
  },[])

  async function loadUser() {
    const res = await getAccount();
    if(res.return) {
      // if(!res?.data?.account?.detail) {
      //   const updRes = await updateProfile({userType: 'Agent'})
      //   if(updRes.return) {
      //     return dispatch(setUser(updRes?.data))
      //   } 
      // }

      dispatch(setUser(res?.data?.account))
    }
  }
  

  return (
    <div className='flex justify-center'>
      <div className='max-w-full w-[1500px]'>
        {loggedIn ? (
          user?._id ?
            <Outlet />
          : 
          <div className='flex flex-col gap-2 justify-center items-center h-screen w-full'>
            <Logo />
            <LoadingBar />
          </div>
        ):<Auth />}
      </div>
    </div>
  )
}
