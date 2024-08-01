import { Outlet } from "react-router-dom"
export const LandingLayout = () => {
  return (
	<div className="min-h-screen h-full w-full">
		<Outlet/>
	</div>
  )
}

