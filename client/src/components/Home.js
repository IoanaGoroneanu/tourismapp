import React from "react"
import Header from "./homeComponents/Header"
import Hotels from "./homeComponents/Hotels"
import Museums from "./homeComponents/Museums"
import Parks from "./homeComponents/Parks"
import Restaurants from "./homeComponents/Restaurants"
import TouristAttractions from "./homeComponents/TouristAttractions"


export default function Home() {
    return(
        <div>
            <Header/>
            <div className="homepage--elements">
            <section className="cards--list">
                <Restaurants/>
            </section>
            <section className="cards--list">
                <Hotels/>
            </section>
            <section>
                <Museums/>
            </section>
            <section>
                <Parks/>
            </section>
            <section>
                <TouristAttractions/>
            </section>
            </div>

        </div>
    )
}