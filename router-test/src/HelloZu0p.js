import React from 'react'
import {
    BrowserRouter as Router,
    Route
    //Link
} from 'react-router-dom'
import './HelloZu0p.css'

const HelloZu0p = () => (
    <Router>
        <div>
        <MainHeader />
        <div>
            <Route exact path='/' component={HelloKorea} />
            <Route path='/ko' component={HelloKorea} />
        </div>

        <MainFooter />
        </div>
    </Router>
)

const MainHeader = () => (
    <div>
        <div className='HeaderStyle'> CatSix </div>
    </div>
)

const MainFooter = () => (
    <div>
        <div className='FooterStyle'>made by zu0p</div>
    </div>
)

const HelloKorea = () => (
    <div>
        나중에 메인페이지로
    </div>
)

export default HelloZu0p