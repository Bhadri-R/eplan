import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'
const CallToAction = () => {
    return (
        <div className='outerCallToAction'>
            <div className="callToAction">
                <p> Wondering how to make your Current asset allocation better?</p>

            </div>
            <div className="row">
                <div className="col-12 d-flex justify-content-center ">
                    <a href="https://eplanadvisors.com/" target='_blank'>
                        <button className='btn   btn-success'>   Contact us</button>
                    </a>
                </div>
            </div>
        </div>
    )
}

export default CallToAction
