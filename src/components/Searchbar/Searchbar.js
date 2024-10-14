import React, { useContext, useEffect, useState } from 'react'
import { StateContext } from '../../contexts/stateContext'
import { CityContext } from '../../contexts/cityContext'
import './Searchbar.css'

export default function Searchbar({ handleData }) {
    const { state, setState } = useContext(StateContext)
    const { city, setCity } = useContext(CityContext)

    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])

    useEffect(() => {
        (async () => {
            try {
                let res = await fetch('https://meddata-backend.onrender.com/states')
                let data = await res.json()
                setStates(data)
            } catch (error) {
                console.error(error)
            }
        })()
    }, [])

    useEffect(() => {
        if (state) {
            (async () => {
                try {
                    let res = await fetch('https://meddata-backend.onrender.com/cities/' + state)
                    let data = await res.json()
                    setCities(data)
                } catch (error) {
                    console.error(error)
                }
            })()
        }
    }, [state])

    return (

        <div className='search'>
            <div className='search-input-container'>
                <img src="/images/search-section/Search.svg" alt="search" />
                <select name="state" id="state" onChange={(e) => setState(e.target.value)}>
                    <option value="State" default>State</option>
                    {states.length !== 0 && states.map((item, index) =>
                        <option key={index} value={item} default>{item}</option>
                    )}
                </select>
            </div>
            <div className='search-input-container'>
                <img src="/images/search-section/Search.svg" alt="search" />
                {/* <input type="text" placeholder='City' value={city} onChange={(e) => setCity(e.target.value)} /> */}
                <select name="city" id="city" onChange={(e) => setCity(e.target.value)}>
                    <option value="City" default>City</option>
                    {cities.length !== 0 && cities.map((item, index) =>
                        <option key={index} value={item} default>{item}</option>
                    )}
                </select>
            </div>
            <button onClick={handleData}>
                <img src="/images/search-section/Search-button.svg" alt="search" />
                Search
            </button>
        </div>
    )
}
