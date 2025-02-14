import React from 'react'
import Image from 'next/image'
import './imageBoxes.css'

import One from '../../images/1.png'
import Two from '../../images/2.png'
import Three from '../../images/3.png'
import Four from '../../images/4.png'

const boxes = [
        {
            "id": 1,
            "image": One,
            "title": "Networking",
            "description": "Expand your professional and social circle by connecting with like-minded individuals worldwide.",
            "bgColor": "rgb(73, 63, 255)"
        },
        {
            "id": 2,
            "image": Two,
            "title": "Projects",
            "description": "Showcase your innovative projects, collaborate with others, and bring your ideas to life.",
            "bgColor": "rgb(181, 289, 133)"
        },
        {
            "id": 3,
            "image": Three,
            "title": "College Communities",
            "description": "Engage with your college peers, stay informed about campus events, and share academic resources.",
            "bgColor": "rgb(73, 63, 255)"
        },
        {
            "id": 4,
            "image": Four,
            "title": "Jobs and Internships",
            "description": "Discover exciting job opportunities and internships to kickstart your career.",
            "bgColor": "rgb(181, 289, 133)"
        }    
]

const ImageBoxes = () => {
    return (
        <div className="boxes-one">
            <div className="boxes-one-in">
                <div className="boxes-one-in-one">
                    <div className="boxes-bx boxes-bx-one">
                        <div className="boxes-box-one" style={{ backgroundColor: boxes[0].bgColor }}>
                            <div className="bb-one">
                                <Image src={boxes[0].image} alt='st' />
                                <div className="info-popup">
                                    <h3>{boxes[0].title}</h3>
                                    <p>{boxes[0].description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="boxes-box-one-hover">
                        </div>
                    </div>
                    <div className="boxes-bx boxes-bx-two">
                        <div className="boxes-box-two" style={{ backgroundColor: boxes[1].bgColor }}>
                            <div className="bb-two">    
                                <Image src={boxes[1].image} alt='st' />
                                <div className="info-popup">
                                    <h3>{boxes[1].title}</h3>
                                    <p>{boxes[1].description}</p>
                                </div>
                            </div>
                        </div>
                        <div className="boxes-box-three" style={{ backgroundColor: boxes[2].bgColor }}>
                            <div className="bb-three">
                                <Image src={boxes[2].image} alt='st' />
                                <div className="info-popup">
                                    <h3>{boxes[2].title}</h3>
                                    <p>{boxes[2].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="boxes-bx boxes-bx-three">
                        <div className="boxes-box-four-hover"></div>
                        <div className="boxes-box-four" style={{ backgroundColor: boxes[3].bgColor }}>
                            <div className="bb-four">   
                                <Image src={boxes[3].image} alt='st' />
                                <div className="info-popup">
                                    <h3>{boxes[3].title}</h3>
                                    <p>{boxes[3].description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ImageBoxes 