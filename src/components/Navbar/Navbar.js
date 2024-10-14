import React from 'react'
import { useNavigate } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
    const navigate = useNavigate()

    return (
        <nav>
            <span onClick={() => navigate('/')}>
                <img src="/images/nav/logo.svg" alt="logo" />
            </span>
            <div className='nav-inner'>
                <span onClick={() => navigate('/find-doctors')}>Find Doctors</span>
                <span>Hospitals</span>
                <span>Medicines</span>
                <span>Surgeries</span>
                <span>Software for Provider</span>
                <span>Facilities</span>
                <button onClick={()=>navigate('/my-bookings')}>My Bookings</button>
            </div>
        </nav>
    )
}
