import React from 'react'
import '../styles/footer.scss'
import logo from '../imgs/Logos/MTI.png'
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <>
      <div className="footer__color">
        <div className='container'>
        <div class="d-flex justify-content-around align-items-center">
            <span>OCR</span>
            <Link to='https://www.mti.edu.eg/'> <span><img src={logo} width="60" height="30" alt="MTI Logo"/></span> </Link>
        </div>
        </div>
      </div>

    </>
  )
}

export default Footer
