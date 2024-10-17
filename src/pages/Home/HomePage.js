import './HomePage.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import Searchbar from '../../components/Searchbar/Searchbar';
import Footer from '../../components/Footer/Footer';
import { Accordion, AccordionDetails, AccordionSummary, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function HomePage() {
    const navigate = useNavigate()

    const isMobile = useMediaQuery('(max-width:745px)')
    const sm = useMediaQuery('(max-width:425px)')
    return (
        <div className='Home' >
            <header>
                The health and well-being of our patients and their health care team will always be our priority, so we follow the best practices for cleanliness.
            </header>

            <div className='variable-main-section'>
                <Navbar />

                <div className='hero-section'>
                    <div className='hero-tag'>
                        <div className='title'>
                            <p>Skip the travel! Find Online</p>
                            <p>
                                <span>Medical </span>
                                <span>Centers</span>
                            </p>
                        </div>
                        <p className='subtitle'>Connect instantly with a 24x7 specialist or choose to video visit a particular doctor.</p>
                        <button>Find Centers</button>
                    </div>
                    <div className='hero-img'>
                        <img src="/images/hero-section/hero-img.svg" alt="hero-img" className='hero-img' />
                    </div>

                </div>

                <div className='search-section'>

                    <Searchbar />

                    {!isMobile
                        ? <>
                            <p>You may be looking for</p>

                            <div className='card-service'>
                                <div onClick={() => navigate('find-doctors')}>
                                    <img src="/images/search-section/Doctor.svg" alt="Doctor" />
                                    <span>Doctors</span>
                                </div>
                                <div>
                                    <img src="/images/search-section/Drugstore.svg" alt="Drugstore" />
                                    <span>Labs</span>
                                </div>
                                <div>
                                    <img src="/images/search-section/Hospital.svg" alt="Hospital" />
                                    <span>Hospitals</span>
                                </div>
                                <div>
                                    <img src="/images/search-section/Capsule.svg" alt="Capsule" />
                                    <span>Medical Store</span>
                                </div>
                                <div>
                                    <img src="/images/search-section/Ambulance.svg" alt="Ambulance" />
                                    <span>Ambulance</span>
                                </div>
                            </div>
                        </>
                        : <Accordion style={{
                            width: '100%', borderRadius: '8px',
                            background: '#f0f7fc'
                        }}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel2-content"
                                id="panel2-header"
                            >
                                <p style={{ margin: 0, textAlign: 'center' }}>You may be looking for</p>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='card-service'>
                                    <div onClick={() => navigate('find-doctors')}>
                                        <img src="/images/search-section/Doctor.svg" alt="Doctor" />
                                        <span>Doctors</span>
                                    </div>
                                    <div>
                                        <img src="/images/search-section/Drugstore.svg" alt="Drugstore" />
                                        <span>Labs</span>
                                    </div>
                                    <div>
                                        <img src="/images/search-section/Hospital.svg" alt="Hospital" />
                                        <span>Hospitals</span>
                                    </div>
                                    <div>
                                        <img src="/images/search-section/Capsule.svg" alt="Capsule" />
                                        <span>Medical Store</span>
                                    </div>
                                    <div>
                                        <img src="/images/search-section/Ambulance.svg" alt="Ambulance" />
                                        <span>Ambulance</span>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>}
                </div>
            </div>

            <div className='fixed-main-section'>

                <div className='ad-carousel' >
                    <Swiper
                        pagination={{
                            dynamicBullets: true,
                        }}
                        modules={[Autoplay, Pagination]}
                        spaceBetween={30}
                        slidesPerView={!isMobile ? 3 : !sm ? 2 : 1}
                        loop={true}
                        autoplay={{
                            delay: 3000,
                            disableOnInteraction: false
                        }}
                    >
                        <SwiperSlide>
                            <img src="/images/ad-carousel/ad-1.svg" alt="ad-1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/ad-carousel/ad-2.svg" alt="ad-2" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/ad-carousel/ad-1.svg" alt="ad-1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/ad-carousel/ad-2.svg" alt="ad-2" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/ad-carousel/ad-1.svg" alt="ad-1" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="/images/ad-carousel/ad-2.svg" alt="ad-2" />
                        </SwiperSlide>


                    </Swiper>
                </div>

                <div className='find-section'>
                    <p>Find by specialisation</p>
                    <div className='buttons-group'>
                        <div>
                            <img src="/images/find-section/Drugstore.svg" alt="Drugstore" />
                            <span>Dentistry</span>
                        </div>
                        <div>
                            <img src="/images/find-section/Stethoscope.svg" alt="Stethoscope" />
                            <span>Primary Care</span>
                        </div>
                        <div>
                            <img src="/images/find-section/Heart Rate.svg" alt="Heart Rate" />
                            <span>Cardiology</span>
                        </div>
                        <div>
                            <img src="/images/find-section/Heart Rate Monitor.svg" alt="Heart Rate Monitor" />
                            <span>MRI Resonance</span>
                        </div>
                        <div>
                            <img src="/images/find-section/Blood Sample.svg" alt="Blood Sample" />
                            <span>Blood Test</span>
                        </div>
                        <div>
                            <img src="/images/find-section/Immune.svg" alt="Immune" />
                            <span>Piscologist</span>
                        </div>
                        <div>
                            <img src="/images/find-section/Drugstore.svg" alt="Drugstore" />
                            <span>Laboratory</span>
                        </div>
                        <div>
                            <img src="/images/find-section/X-Ray.svg" alt="X-Ray" />
                            <span>X-Ray</span>
                        </div>
                    </div>
                    <button>View All</button>
                </div>

                <div className='specialist-carousel'>
                    <p className='title'>Our Medical Specialist</p>
                    <div>
                        <Swiper
                            pagination={{
                                dynamicBullets: true,
                            }}
                            modules={[Autoplay, Pagination]}
                            slidesPerView={!isMobile ? 4 : !sm ? 3 : 2}
                            spaceBetween={50}
                            centeredSlides={true}
                            loop={true}
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false
                            }}

                        >
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc3.svg" alt="doc3" />
                                <p>Dr. Ahmad Khan</p>
                                <span>Neurologist</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc1.svg" alt="doc1" />
                                <p>Dr. Heena Sachdeva</p>
                                <span>Orthopadics</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc2.svg" alt="doc2" />
                                <p>Dr. Ankur Sharma</p>
                                <span>Medicine</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc3.svg" alt="doc3" />
                                <p>Dr. Ahmad Khan</p>
                                <span>Neurologist</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc1.svg" alt="doc1" />
                                <p>Dr. Heena Sachdeva</p>
                                <span>Orthopadics</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc2.svg" alt="doc2" />
                                <p>Dr. Ankur Sharma</p>
                                <span>Medicine</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc3.svg" alt="doc3" />
                                <p>Dr. Ahmad Khan</p>
                                <span>Neurologist</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc1.svg" alt="doc1" />
                                <p>Dr. Heena Sachdeva</p>
                                <span>Orthopadics</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc2.svg" alt="doc2" />
                                <p>Dr. Ankur Sharma</p>
                                <span>Medicine</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc3.svg" alt="doc3" />
                                <p>Dr. Ahmad Khan</p>
                                <span>Neurologist</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc1.svg" alt="doc1" />
                                <p>Dr. Heena Sachdeva</p>
                                <span>Orthopadics</span>
                            </SwiperSlide>
                            <SwiperSlide>
                                <img src="/images/specialist-carousel/doc2.svg" alt="doc2" />
                                <p>Dr. Ankur Sharma</p>
                                <span>Medicine</span>
                            </SwiperSlide>
                        </Swiper>
                    </div>

                </div>

                <div className='services-section'>
                    <div className='services-img'>

                        <img src="/images/services-section/img.svg" alt="img" />
                    </div>
                    <div className='content'>
                        <p className='tag-line'>HELPING PATIENTS FROM AROUND THE GLOBE!!</p>
                        <p className='title' style={{ display: isMobile && 'flex', flexDirection: isMobile && 'column' }}>
                            <span>Patient</span>
                            <span>Caring</span>
                        </p>
                        <p className='description'>Our goal is to deliver quality of care in a courteous, respectful, and compassionate manner. We hope you will allow us to care for you and strive to be the first and best choice for healthcare.</p>
                        <div className='services'>
                            <p><img src="/images/services-section/blue-tick.svg" alt="blue-tick" />Stay Updated About Your Health</p>
                            <p><img src="/images/services-section/blue-tick.svg" alt="blue-tick" />Check Your Results Online</p>
                            <p><img src="/images/services-section/blue-tick.svg" alt="blue-tick" />Manage Your Appointments</p>
                        </div>
                    </div>
                </div>

                <div className='news-section'>
                    <p className='title' style={{ textAlign: 'center' }}>Read Our Latest News</p>
                    <div className='content' style={{ gap: sm && '2px' }}>
                        <div className='card'>
                            <img src="/images/news-section/img.svg" alt="img" />
                            <div>
                                <p className='header'>Medical | March 31, 2022</p>
                                <p className='title'>6 Tips To Protect Your Mental Health When You're Sick</p>
                                <p className='profile-name'><img src="/images/news-section/icon.svg" alt="icon" />Rebecca Lee</p>
                            </div>
                        </div>
                        <div className='card'>
                            <img src="/images/news-section/img.svg" alt="img" />
                            <div>
                                <p className='header'>Medical | March 31, 2022</p>
                                <p className='title'>6 Tips To Protect Your Mental Health When You're Sick</p>
                                <p className='profile-name'><img src="/images/news-section/icon.svg" alt="icon" />Rebecca Lee</p>
                            </div>
                        </div>
                        {!sm && <div className='card'>
                            <img src="/images/news-section/img.svg" alt="img" />
                            <div>
                                <p className='header'>Medical | March 31, 2022</p>
                                <p className='title'>6 Tips To Protect Your Mental Health When You're Sick</p>
                                <p className='profile-name'><img src="/images/news-section/icon.svg" alt="icon" />Rebecca Lee</p>
                            </div>
                        </div>}
                    </div>
                </div>

                <div className='social-proof-section'>
                    <div className='content'>
                        <p className='tag-line'>CARING FOR THE HEALTH OF YOU AND YOUR FAMILY.</p>
                        <p className='title'>Our Families</p>
                        <p className='description'>We will work with you to develop individualised care plans, including management of chronic diseases. If we cannot assist, we can provide referrals or advice about the type of practitioner you require. We treat all enquiries sensitively and in the strictest confidence.</p>
                    </div>
                    <img src="/images/social-proof-section/social-img.svg" alt="social-img.svg" />
                </div>

                <Footer />

            </div>


        </div >
    );
}
