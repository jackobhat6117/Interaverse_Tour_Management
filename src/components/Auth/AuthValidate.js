import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet, useLocation } from 'react-router-dom';
import Auth from './Auth';
import getAccount from '../../controllers/user/getAccount';
import { setUser, setUserData } from '../../redux/reducers/userSlice';
import LoadingBar from '../animation/LoadingBar';
import Logo from '../Logo/Logo';
import updateUserType from '../../controllers/user/updateUserType';
import getAgentByName from '../../controllers/user/getAgentByName';
import { getsubDomain } from '../../utils/getsubDomain';
import { getTestLevel } from '../../utils/testLevel';
import { def } from '../../config';


export default function AuthValidate() {
  const {userData} = useSelector(state => state.user)
  const {loggedIn,user} = userData;  
  const [loading,setLoading] = useState(true);

  // sub domain test code
  // window.location.hostname.includes('.') ? window.location.hostname.split('.')[0] : null
  const [agencyName,setAgencyName] = useState(getsubDomain(window.location.href));

  if(agencyName) {
    document.title = agencyName;
    const favicon = document.getElementById('favicon');
    if (favicon && userData?.agent?.detail?.agencyLogo) {
      favicon.href = userData?.agent?.detail?.agencyLogo;
    }
  }
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hash = queryParams.get('accept');

  const devStage = getTestLevel(def?.devStatus);


  const dispatch = useDispatch();
  
  useEffect(() => {
    if(agencyName)
      loadAgent();
    else
      loadUser();
    // eslint-disable-next-line

    const script = document.createElement('script');
    const script2 = document.createElement('script');

    try {

      script.type = 'text/javascript';
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
      if(devStage === 3)
        script2.textContent = script2Content

      document.body.appendChild(script);
      if(devStage === 3)
        document.body.appendChild(script2);

      window?.Intercom("boot", {
        api_base: "https://api-iam.intercom.io",
        custom_launcher_selector: '.intercomButton',
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
  },[user?.email,userData?.accessToken])

  
  async function loadUser() {
    setLoading(false);
    if(!userData.accessToken)
      return null;

    const res = await getAccount();
    if(res.return) {
      if(!res?.data?.account?.userType) {
        const updRes = await updateUserType({userType: 'Agent'})
        if(updRes.return) {
          return dispatch(setUser(updRes?.data))
        } 
      }

      dispatch(setUser(res?.data?.account))
    }
  }
  async function loadAgent() {
    setLoading(true);
    const res = await getAgentByName(agencyName);
    setLoading(false);
    if(res.return) {
      if(!userData?.loggedIn || !userData?.agent)
        dispatch(setUserData({...userData,agent: {...res?.data,hash}}))
      // console.log(' --> ',userData)
    } else setAgencyName(agencyName+'.')
  }

  const site = window.location.protocol+ '//' + window.location.host.replace(agencyName?.replaceAll('.','')+'.', '');
  // console.log(userData.loggedIn,userData?.agent?.hash,userData?.user)
  // console.log(site,agencyName)

  return !loading && (
    <div className='flex justify-center'>
      {agencyName?.includes('.') ? 
        <div className='flex flex-col items-center justify-center gap-4 h-screen w-screen'>
          <h2>Agency not found on the system</h2>
          <h5><a href={site} className='underline' >Sign in</a> to register with Intraverse.</h5>
        </div>
      :
        <div className='max-w-full w-[1500px]'>
          {loggedIn ? (
            user?._id ?
              <Outlet />
            : 
            <div className='flex flex-col gap-2 justify-center items-center h-screen w-full'>
              <Logo />
              <LoadingBar />
            </div>
          ):<Auth agency={agencyName} />}
        </div>
      }
    </div>
  )
}

const script2Content = `
  !function(){var i="analytics",analytics=window[i]=window[i]||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","screen","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware","register"];analytics.factory=function(e){return function(){if(window[i].initialized)return window[i][e].apply(window[i],arguments);var n=Array.prototype.slice.call(arguments);if(["track","screen","alias","group","page","identify"].indexOf(e)>-1){var c=document.querySelector("link[rel='canonical']");n.push({__t:"bpc",c:c&&c.getAttribute("href")||void 0,p:location.pathname,u:location.href,s:location.search,t:document.title,r:document.referrer})}n.unshift(e);analytics.push(n);return analytics}};for(var n=0;n<analytics.methods.length;n++){var key=analytics.methods[n];analytics[key]=analytics.factory(key)}analytics.load=function(key,n){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.setAttribute("data-global-segment-analytics-key",i);t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var r=document.getElementsByTagName("script")[0];r.parentNode.insertBefore(t,r);analytics._loadOptions=n};analytics._writeKey="xmUlhOmT4jHXpLCBJ5Uhw9cu2VQwTqeK";;analytics.SNIPPET_VERSION="5.2.0";
  analytics.load("xmUlhOmT4jHXpLCBJ5Uhw9cu2VQwTqeK");
  analytics.page();
  }}();
`