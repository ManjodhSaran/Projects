import React from 'react';
import Card from '../Card/Card';
import Banner from './Banner/Banner';

import './Home.css';

function Home() {
    return (
        <div className="home">
            <Banner />
            <div className="home__section">
                <Card
                    image={"https://a0.muscache.com/im/pictures/15159c9c-9cf1-400e-b809-4e13f286fa38.jpg?im_w=320"}
                    title={"Unique stays"}
                    description={"Spaces that are more than just a place to sleep."}
                />
                <Card
                    image={"https://a0.muscache.com/im/pictures/4a2f688e-0b33-4feb-932f-494b9a37348c.jpg?im_w=320"}
                    title={"Online Experiences"}
                    description={"Unique activities we can do together, led by a world of hosts."}
                />
                <Card
                    image={"https://a0.muscache.com/im/pictures/fdb46962-10c1-45fc-a228-d0b055411448.jpg?im_w=320"}
                    title={"Entire homes"}
                    description={"Comfortable private places, with room for friends or family."}
                />
            </div>
            <div className="home__section">
                <Card
                    image={"https://cdn.vox-cdn.com/thumbor/R2WcPyr6pJuxOPfn8YBz_yorjIU=/0x0:2000x1118/1200x800/filters:focal(840x399:1160x719)/cdn.vox-cdn.com/uploads/chorus_image/image/52264099/The_Terrace_Sicilian__1_.1497897195.jpg"}
                    title={"Penthouse in London"}
                    description={"Clean Cozy room in a family home,LATE Check-Ins WELCOME!,SELF CHECK IN/OUT,Room for 1 guest ONLY "}
                    price={"$130/night"} />
                <Card
                    image={"https://www.hostyapp.com/wp-content/uploads/2017/09/Rent-My-House-On-Airbnb-1030x687.jpg"}
                    title={"1 Bedroom apartment"}
                    description={"Downtown, the best bit of Manhattan. One of, if not the,  LARGEST space on Airbnb in NYC."}
                    price={"$70/night"} />
                <Card
                    image={"https://s.hdnux.com/photos/01/12/20/67/19467743/3/920x920.jpg"}
                    title={"2 Bedroom House"}
                    description={"Clean Sun room in a family home,LATE Check-Ins are WELCOME!,SELF CHECK IN/OUT,Room for 1 guest ONLY"}
                    price={"$200/night"} />
            </div>
        </div>
    )
}

export default Home;
