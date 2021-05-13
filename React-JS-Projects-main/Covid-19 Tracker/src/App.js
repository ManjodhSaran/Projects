import { Card, FormControl, MenuItem, Select } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import './App.css';
import InfoBox from './InfoBox/InfoBox';
import LineGraph from './LineGraph/LineGraph';
import Map from './Map/Map';
import Table from './Table/Table';
import { prettyPrintStat, sortData } from './util';
import "leaflet/dist/leaflet.css";

function App() {

  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState();
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 })
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases")


  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
      .then(response => response.json())
      .then(data => {
        setCountryInfo(data);
      })
  }, [])

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

          setTableData(sortData(data));
          setCountries(countries);
          setMapCountries(data);
        })
    }

    getCountries();
  }, []);

  const onCountrychange = async e => {
    const countryCode = e.target.value;

    const url =
      countryCode === "worldwide"
        ? "https://disease.sh/v3/covid-19/all"
        : `https://disease.sh/v3/covid-19/countries/${countryCode}`

    await fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)
        setCountry(countryCode);
        setCountryInfo(data);
        setMapCenter(data.countryInfo ? [data.countryInfo.lat, data.countryInfo.long] : ["34.80746", "-40.4796"]);
        setMapZoom(4)
      })
  };
  return (
    <div className="app noselect">
      <div className="app__left">
        <div className="app__header">
          <h1>COVID-19 TRACKER</h1>

          <FormControl className="app__dropdown">
            <Select variant="outlined" onChange={onCountrychange} value={country}>
              <MenuItem value="worldwide">World Wide</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </FormControl>

        </div>

        <div className="app__stats">
          <InfoBox isRed active={casesType === "cases"} onClick={e => setCasesType("cases")} title="Coronavirus Cases" cases={prettyPrintStat(countryInfo?.todayCases)} total={prettyPrintStat(countryInfo?.cases)} />
          <InfoBox active={casesType === "recovered"} onClick={e => setCasesType("recovered")} title="Recovered" cases={prettyPrintStat(countryInfo?.todayRecovered)} total={prettyPrintStat(countryInfo?.recovered)} />
          <InfoBox isRed active={casesType === "deaths"} onClick={e => setCasesType("deaths")} title="Deaths" cases={prettyPrintStat(countryInfo?.todayDeaths)} total={prettyPrintStat(countryInfo?.deaths)} />
        </div>

        <Map casesType={casesType} countries={mapCountries} center={mapCenter} zoom={mapZoom} />
      </div>

      <Card className="app__right">
        <div className="app__rightTable">
          <h3>Live Cases by Country</h3>
          <Table countries={tableData} />
        </div>

        <div>
          <h3>Worldwide New {casesType}</h3>
          <LineGraph className="app__rightGraph" casesType={casesType} />
        </div>
      </Card>

    </div>
  );
}

export default App;
