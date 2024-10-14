import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar/Navbar'
import './MyBookingsPage.css'
import { useLocalStorage } from '../FindDoctors/FindDoctorsPage'

export default function MyBookingsPage() {
    const [bookedSlots, setBookedSlots] = useLocalStorage('bookedSlots', {})
    const [hospitalNames, setHospitalnames] = useState([])
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredData, setFilteredData] = useState([])




    useEffect(() => {
        const getAllHospitalNames = () => {
            const hospitalNames = [];
            Object.values(bookedSlots).forEach((cities) => {
                Object.values(cities).forEach((hospitals) => {
                    Object.entries(hospitals).forEach(([providerId, bookingInfo]) => {
                        hospitalNames.push(bookingInfo.hospital);
                    });
                });
            });

            setHospitalnames(hospitalNames)
        };
        getAllHospitalNames()
        handleFilterData()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookedSlots])

    const handleFilterData = () => {
        const filteredData = Object.entries(bookedSlots)
            .flatMap(([state, cities]) =>
                Object.entries(cities).flatMap(([city, hospitals]) =>
                    Object.entries(hospitals).flatMap(([providerId, bookingInfo]) => {
                        const { hospital } = bookingInfo;

                        return hospital.toLowerCase().includes(searchQuery.toLowerCase())
                            ? { state, city, providerId, bookingInfo }
                            : [];
                    })
                )
            );
        setFilteredData(filteredData)
    }

    console.log(filteredData)
    console.log(bookedSlots)


    return (
        <div className='MyBookingsPage'>
            <header>
                The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
            </header>

            <Navbar />

            <div className='navbar-background'>
                <div className='white-part'></div>
                <div className='blue-part'>
                    <span>My Bookings</span>

                    <div className='booking-search-section'>
                        <select name="serarch" id="search" onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery}>
                            <option value="" default>Search By Hospital</option>
                            {hospitalNames && hospitalNames.map(hospital =>
                                <option value={hospital}>{hospital}</option>
                            )}
                        </select>
                        <button onClick={handleFilterData}>  <img src="/images/search-section/Search-button.svg" alt="search" />Search</button>
                    </div>
                </div>
            </div>

            <div className='hospitals-section'>
                <div className='content'>
                    {filteredData.length !== 0 && (
                        <div className="booking-cards-container">
                            {filteredData.map((booking, index) => {
                                const { state, city, providerId, bookingInfo } = booking;
                                const { hospital, rating, ...dates } = bookingInfo; // Destructure to get the hospital and rating

                                return Object.entries(dates).map(([date, times]) => {
                                    const options = { day: 'numeric', month: 'long', year: 'numeric' };
                                    let formattedDate = new Date(date).toLocaleDateString('en-GB', options)

                                    return Object.entries(times).map(([bookingTime]) => (
                                        <div className='card' key={`${providerId}-${date}-${bookingTime}`}>
                                            <img src="/images/hospitals-section/icon.svg" alt="icon" className='icon' />
                                            <div className='details'>
                                                <p className='name'>{hospital}</p>
                                                <p className='place'>{city}, {state}</p>
                                                <div className='services'>
                                                    Smilessence Center for Advanced Dentistry + 1 more
                                                </div>
                                                <p className='price'>
                                                    <span>FREE</span>
                                                    <span>$500</span>
                                                    <span>Consultation fee at clinic</span>
                                                </p>
                                                <div className='rating'>
                                                    <img src="/images/hospitals-section/thumbs-up.svg" alt="thumbs-up" />
                                                    {rating}
                                                </div>
                                            </div>
                                            <div className='action'>
                                                <span className='time'>{bookingTime}</span>
                                                <span className='date'>{formattedDate}</span>
                                            </div>
                                        </div>
                                    ));
                                });
                            })}
                        </div>
                    )}
                </div>
                <div className='ad-image'>
                    <img src="/images/hospitals-section/img.svg" alt="ad-img" />
                </div>
            </div>


            <div className='action-section'>
                <img src="/images/action-section/action-img.svg" alt="action-img.svg" />
            </div>

            <div className='footer'>
                <div className='content'>
                    <div className='socials'>
                        <img src="/images/nav/logo.svg" alt="logo" />
                        <div>
                            <img src="/images/footer/facebook-icon.svg" alt="facebook-icon" />
                            <img src="/images/footer/pinterest-icon.svg" alt="pinterest-icon" />
                            <img src="/images/footer/twitter-icon.svg" alt="twitter-icon" />
                            <img src="/images/footer/youtube-icon.svg" alt="youtube-icon" />
                        </div>
                    </div>
                    <div className='links'>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>About Us</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Our Pricing</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Our Gallery</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Appointment</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Privacy Policy</span>
                        </p>

                    </div>
                    <div className='links'>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Orthology</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Neurology</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Dental Care</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Opthalmology</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Cardiology</span>
                        </p>

                    </div>
                    <div className='links'>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>About Us</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Our Pricing</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Our Gallery</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Appointment</span>
                        </p>
                        <p>
                            <img src="/images/footer/arrow.svg" alt="arrow" />
                            <span>Privacy Policy</span>
                        </p>

                    </div>
                </div>

                <p className='copyright'>Copyright ©2023 Surya Nursing Home.com. All Rights Reserved</p>
            </div>
        </div>
    )
}
