import React from 'react'
import "./TwoSide.scss";

export default function TwoSide({img,smallheading,mainheading,paraone,paratwo}) {
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
                    <p className='paraone'>{paraone}</p>
                    <p className='paratwo'>{paratwo}</p>
                </div>
            </div>
        </div>
    </div>
  )
}
