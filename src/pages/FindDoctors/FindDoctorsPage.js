import './FindDoctorsPage.css';

import { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import Footer from '../../components/Footer/Footer';
import { StateContext } from '../../contexts/stateContext';
import { CityContext } from '../../contexts/cityContext';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

import { useSnackbar } from 'notistack';

export default function FindDoctorsPage() {
    const [data, setData] = useState([]);
    const [openDropdown, setOpenDropdown] = useState(null);
    const { state } = useContext(StateContext);
    const { city } = useContext(CityContext);
    const [slots, setSlots] = useState({
        morning: ['09:00 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
        afternoon: ['12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '02:30 PM'],
        evening: ['05:00 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
    })
    const [days, setDays] = useState([])
    const [day, setDay] = useState({ date: new Date() })
    const [hospital, setHospital] = useState(null)

    const [bookedSlots, setBookedSlots] = useLocalStorage('bookedSlots', {})
    const [numberOfSlots, setNumberOfSlots] = useState({})

    const { enqueueSnackbar } = useSnackbar();


    useEffect(() => {
        setDay({ date: new Date() })
        setHospital(null)
        setOpenDropdown(false)
    }, [state, city])

    const handleData = async () => {
        try {
            let res = await fetch(`https://meddata-backend.onrender.com/data?state=${state}&city=${city}`);
            let data = await res.json();
            setData(data);
        } catch (error) {
            console.error(error);
        }
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handleFilterSlots = () => {
        let filteredSlots
        const initialSlots = {
            morning: ['09:00 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM'],
            afternoon: ['12:00 PM', '12:30 PM', '01:00 PM', '02:00 PM', '02:30 PM'],
            evening: ['05:00 PM', '06:00 PM', '06:30 PM', '07:00 PM', '07:30 PM'],
        }
        const today = new Date()
        if (day.date.getDate() === today.getDate()) {
            const currentHour = new Date().getHours();

            const convertTo24HourFormat = (time12h) => {
                const [time, modifier] = time12h.split(' ');
                let [hours, minutes] = time.split(':');
                if (hours === '12') hours = '00';
                if (modifier === 'PM') hours = parseInt(hours, 10) + 12;
                return `${hours}:${minutes}`;
            };

            filteredSlots = {
                morning: initialSlots.morning.filter(slot => {
                    const slotHour = new Date(`1970-01-01T${convertTo24HourFormat(slot)}`).getHours();
                    return slotHour > currentHour;
                }),
                afternoon: initialSlots.afternoon.filter(slot => {
                    const slotHour = new Date(`1970-01-01T${convertTo24HourFormat(slot)}`).getHours();
                    return slotHour > currentHour;
                }),
                evening: initialSlots.evening.filter(slot => {
                    const slotHour = new Date(`1970-01-01T${convertTo24HourFormat(slot)}`).getHours();
                    return slotHour > currentHour;
                }),
            }
        }

        if (bookedSlots?.[state]?.[city]?.[hospital?.['Provider ID']]?.[day.date.toDateString()]) {
            filteredSlots = {
                morning: filteredSlots.morning.filter(slot => !bookedSlots[state][city][hospital['Provider ID']][day.date.toDateString()]?.[slot]),
                afternoon: filteredSlots.afternoon.filter(slot => !bookedSlots[state][city][hospital['Provider ID']][day.date.toDateString()]?.[slot]),
                evening: filteredSlots.evening.filter(slot => !bookedSlots[state][city][hospital['Provider ID']][day.date.toDateString()]?.[slot]),
            }
        }

        if (filteredSlots) setSlots(filteredSlots)
        else setSlots(initialSlots)
    }

    useEffect(() => {
        const generateDays = () => {
            const days = [];
            const today = new Date();

            for (let i = 0; i < 7; i++) {
                const day = new Date();
                day.setDate(today.getDate() + i);
                days.push({
                    label: day.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
                    date: day,
                });
            }

            setDays(days)
        };

        generateDays();
    }, [])


    const handleBookSlot = (hospital, time) => {
        const providerId = hospital['Provider ID'],
            hospitalName = hospital['Hospital Name'],
            rating = hospital['Hospital overall rating']

        const newBookedSlots = {
            ...bookedSlots,
            [state]: {
                ...bookedSlots[state],
                [city]: {
                    ...bookedSlots[state]?.[city],
                    [providerId]: {
                        ...bookedSlots[state]?.[city]?.[providerId],
                        hospital: hospitalName,
                        rating,
                        [day.date.toDateString()]: {
                            ...bookedSlots[state]?.[city]?.[providerId]?.[day.date.toDateString()],
                            [time]: time,
                        },
                    },
                },
            },
        }
        setBookedSlots(newBookedSlots);
        enqueueSnackbar('Appointment booked', {
            variant: 'success',
            anchorOrigin: {
                vertical: 'top',
                horizontal: 'center',
            },
            autoHideDuration: 3000,
        });
    }

    useEffect(() => {
        handleFilterSlots()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [bookedSlots, day])


    useEffect(() => {
        let slots = {};
        const hourToSlotsMapping = {};

        // Fill slots for 0 to 8
        for (let hour = 0; hour <= 8; hour++) {
            hourToSlotsMapping[hour] = 0;
        }

        // Define specific slots for hours 9, 10, 11, 12, 13, 17, 18
        hourToSlotsMapping[9] = 1;
        hourToSlotsMapping[10] = 3;
        hourToSlotsMapping[11] = 5;
        hourToSlotsMapping[12] = 7;
        hourToSlotsMapping[13] = 8;
        hourToSlotsMapping[17] = 11;
        hourToSlotsMapping[18] = 13;

        // Fill slots for hours 14 to 16
        for (let hour = 14; hour <= 16; hour++) {
            hourToSlotsMapping[hour] = 10;
        }

        // Fill slots for hours 19 to 24
        for (let hour = 19; hour <= 24; hour++) {
            hourToSlotsMapping[hour] = 15;
        }

        if (state) {
            slots[state] = {};

            if (city) {
                slots[state][city] = {};

                if (hospital) {
                    const providerId = hospital['Provider ID'];
                    slots[state][city][providerId] = {};

                    days.forEach(day => {
                        const dateString = day.date.toDateString();
                        if (dateString === new Date().toDateString()) {
                            console.log(day.date.getHours())
                            const slotsToSubtract = hourToSlotsMapping[day.date.getHours()] || 0
                            slots[state][city][providerId][dateString] = 15 - slotsToSubtract
                        } else {
                            slots[state][city][providerId][dateString] = 15;
                        }
                    });

                    if (bookedSlots[state]?.[city]?.[providerId]) {
                        days.forEach(day => {
                            const dateString = day.date.toDateString();
                            const bookedSlotsForDate = bookedSlots[state]?.[city]?.[providerId]?.[dateString];

                            const availableSlots = bookedSlotsForDate ?
                                slots[state][city][providerId][dateString] - Object.keys(bookedSlotsForDate).length
                                : slots[state][city][providerId][dateString];

                            slots[state][city][providerId][dateString] = availableSlots;
                        });
                    }
                }
            }
        }

        setNumberOfSlots(slots);

    }, [hospital, bookedSlots, state, city, days]);


    return (
        <div className='FindDoctorsPage' >
            <header>
                The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
            </header>

            <div className='variable-main-section'>
                <Navbar />
                <div className='navbar-background'>
                    <div className='white-part'></div>
                    <div className='blue-part'></div>
                </div>
                <div className='search-section'>
                    <Searchbar handleData={handleData} />
                </div>
            </div>

            {data.length !== 0 &&
                <div className='hospitals-section'>

                    <div className='content'>
                        <p className='title'>{data.length} medical centers available in {state}</p>
                        <p className='subtitle'><img src="/images/hospitals-section/gray-tick.svg" alt="gray-tick" /> Book appointments with minimum wait-time & verified doctor details</p>

                        <div className='card-section'>
                            {data.map((hospital, index) => (
                                <div key={index} className='hospital-card'>

                                    <div className='card'>
                                        <img src="/images/hospitals-section/icon.svg" alt="icon" className='icon' />
                                        <div className='details'>
                                            <p className='name'>{hospital['Hospital Name']}</p>
                                            <p className='place'>{hospital.Address}, {hospital.City}</p>
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
                                                {hospital['Hospital overall rating']}
                                            </div>
                                        </div>
                                        <div className='action'>
                                            <p>Available Today</p>
                                            <button className='book' onClick={() => { setDay({ date: new Date() }); setHospital(hospital); setOpenDropdown(hospital['Provider ID']) }}>Book FREE Center Visit</button>
                                        </div>
                                    </div>

                                    {openDropdown === hospital['Provider ID'] && (
                                        <div className='slots'>

                                            <div className='divider'></div>

                                            <div className='days-section'>
                                                <img
                                                    src="/images/hospitals-section/left-arrow.svg"
                                                    alt="left-arrow"
                                                    className="custom-prev"
                                                />
                                                <Swiper
                                                    modules={[Navigation]}
                                                    navigation={{
                                                        nextEl: '.custom-next',
                                                        prevEl: '.custom-prev',
                                                    }}
                                                    spaceBetween={50}
                                                    slidesPerView={3}
                                                    className='days'
                                                >
                                                    {days.map((day, i) => {
                                                        let slotsAvaialable = numberOfSlots[state]?.[city]?.[hospital?.['Provider ID']]?.[day.date.toDateString()]
                                                        return <SwiperSlide className='day' onClick={() => setDay(day)} key={i}>
                                                            <p>
                                                                {day.date.getDate() === new Date().getDate()
                                                                    ? 'Today'
                                                                    : day.date.getDate() === new Date().getDate() + 1
                                                                        ? 'Tomorrow'
                                                                        : day.label}
                                                            </p>
                                                            <span>{slotsAvaialable} Slots Avaliable</span>

                                                        </SwiperSlide>
                                                    })}
                                                </Swiper>
                                                <img
                                                    src="/images/hospitals-section/right-arrow.svg"
                                                    alt="right-arrow"
                                                    className="custom-next"
                                                />
                                            </div>

                                            <div className='times-section'>
                                                <div className='periods'>
                                                    <p>Morning</p>
                                                    {slots.morning.length !== 0 ? <div className='times'>
                                                        {slots.morning.map((time, i) => (
                                                            <span key={i} className='time-slot'
                                                                onClick={() => handleBookSlot(hospital, time)}
                                                            >{time}</span>
                                                        ))}
                                                    </div> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'red' }}>No slots available</span>
                                                    }
                                                </div>
                                                <div className='periods'>
                                                    <p>Afternoon</p>
                                                    {slots.afternoon.length !== 0 ? <div className='times'>
                                                        {slots.afternoon.map((time, i) => (
                                                            <span key={i} className='time-slot' onClick={() => handleBookSlot(hospital, time)}>{time}</span>
                                                        ))}
                                                    </div> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'red' }}>No slots available</span>
                                                    }
                                                </div>
                                                <div className='periods'>
                                                    <p>Evening</p>
                                                    {slots.evening.length !== 0 ? <div className='times'>
                                                        {slots.evening.map((time, i) => (
                                                            <span key={i} className='time-slot' onClick={() => handleBookSlot(hospital, time)}>{time}</span>
                                                        ))}
                                                    </div> : <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', color: 'red' }}>No slots available</span>
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className='ad-image'>
                        <img src="/images/hospitals-section/img.svg" alt="ad-img" />
                    </div>
                </div>
            }

            <div className='fixed-main-section'>
                <Footer />
            </div>
        </div>
    );
}

export const useLocalStorage = (key, initialValue) => {

    const [state, setState] = useState(() => {
        const storedValue = localStorage.getItem(key);
        return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    })

    useEffect(() => {
        localStorage.setItem(key, JSON.stringify(state))
    }, [key, state])

    return [state, setState]
}
