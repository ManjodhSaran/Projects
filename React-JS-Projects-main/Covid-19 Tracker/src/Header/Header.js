import React, { useEffect, useState } from 'react'
import { FormControl, MenuItem, Select } from '@material-ui/core';

import './Header.css'

function Header() {

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState('worldwide');

    useEffect(() => {
        const getCountries = async () => {
            await fetch("https://disease.sh/v3/covid-19/countries")
                .then(response => response.json())
                .then(data => {
                    const countries = data.map(country => (
                        {
                            name: country.country,
                            value: country.countryInfo.iso2
                        }
                    ));
                    setCountries(countries);
                })
        }

        getCountries();
    }, []);

    const onCountrychange = (e => {
        const countryCode = e.target.value;
        setCountry(countryCode);
    })

    return (
        <div className="header">
            <h1>Covid-19 Tracker</h1>

            <FormControl>
                <Select variant="outlined" onChange={onCountrychange} value={country}>
                    <MenuItem value="worldwide">World Wide</MenuItem>
                    {countries.map(country => (
                        <MenuItem value={country.value}>{country.name}</MenuItem>
                    ))}
                </Select>
            </FormControl>

        </div>
    )
}

export default Header
// https://disease.sh/v3/covid-19/countries