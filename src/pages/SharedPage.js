import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Sidebar from "../components/SideBar"
import { Stack } from "@mui/material"

const SharedPage = () => {
    return(
        <>
        <Navbar />
        <Stack direction="row" spacing={1} justifyContent="flex-start" style={{ backgroundColor: "#f0f4f8" }} sx={{ borderTopColor: '#d9e2ec', borderTopStyle: 'solid', borderTopWidth: '0.1em' }}>
        <Sidebar/>
        <div className='pages'>
        <Outlet />
        </div>
        </Stack>
        </>
    )
}

export default SharedPage