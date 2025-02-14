import React from 'react'
import Image from 'next/image'

import StudentNetwork from '../../images/StudentNetwork.png'

import './logo.css'

const logo = () => {
  return (
        <div className="LogoComponent">
            <div className="LogoComponent-in">
                <div className="LogoComponent-in-one">
                    <Image src={StudentNetwork} alt='st' />
                </div>
                <div className="LogoComponent-in-two">
                  <h1>Student Network.</h1>
                </div>
            </div>
        </div>
  )
}

export default logo