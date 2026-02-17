import React from 'react'
import "./TwoSide.scss";
import Button from '../Buttons/Button';
import { Link } from 'react-router-dom';

export default function TwoSide({ img, smallheading, mainheading, paraone, paratwo }) {
    return (
        <div>
            <div className="twoside">
                <div className="two-side-flex">
                    <div className="left-side">
                        <figure>
                            <img src={img} alt="" />
                        </figure>
                    </div>
                    <div className="right-side">
                        <h3 className='smallheading'>{smallheading}</h3>
                        <h2 className='mainheading'>{mainheading}</h2>
                        <p className='paraone para '>{paraone}</p>
                        <p className='paratwo para'>{paratwo}</p>
                        <div className="btn">
                            <Button text="KNOW MORE"  />
                        </div>


                    </div>
                </div>
            </div>
        </div>
    )
}
