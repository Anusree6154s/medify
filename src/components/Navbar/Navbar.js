import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'
import MenuIcon from '@mui/icons-material/Menu';
import { Drawer, useMediaQuery } from '@mui/material';

export default function Navbar() {
    const navigate = useNavigate()
    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const isTab = useMediaQuery('(max-width:985px)')

    return (
        <nav>
            <span onClick={() => navigate('/')}>
                <img src="/images/nav/logo.svg" alt="logo" />
            </span>
            {!isTab
                ? <div className='nav-inner'>
                    <span onClick={() => navigate('/find-doctors')}>Find Doctors</span>
                    <span>Hospitals</span>
                    <span>Medicines</span>
                    <span>Surgeries</span>
                    <span>Software for Provider</span>
                    <span>Facilities</span>
                    <button onClick={() => navigate('/my-bookings')}>My Bookings</button>
                </div>
                : <MenuIcon onClick={toggleDrawer(true)} />
            }
            <Drawer anchor='right' open={open} onClose={toggleDrawer(false)} className='nav-inner'>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', padding: '15px' }}>
                    <button onClick={() => navigate('/my-bookings')}>My Bookings</button>
                    <span onClick={() => navigate('/find-doctors')}>Find Doctors</span>
                    <span>Hospitals</span>
                    <span>Medicines</span>
                    <span>Surgeries</span>
                    <span>Software for Provider</span>
                    <span>Facilities</span>
                </div>


            </Drawer>
        </nav>
    )
}
