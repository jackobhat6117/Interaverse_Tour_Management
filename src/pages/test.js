import React, { useEffect, useState } from 'react'
import LoadingBar from '../components/animation/LoadingBar'
import getTeamMembers from '../controllers/settings/team/getTeamMembers';

export default function Test() {
	const [loading,setLoading] = useState(true);
	useEffect(() => {
		load();
	},[])

	async function load() {
		setLoading((new Date()).getMilliseconds());
		await getTeamMembers()
		setLoading(false);
	}
  return (
	<div className='flex flex-col justify-center items-center gap-2 min-h-screen'>
		<LoadingBar duration={10} />
	</div>
  )
}
