import React from "react";
import "./SchoolsCard.scss";
import "../../Main.scss"
export default function SchoolsCard({
    image,
    title,
    description,
    coach,
    author,
    authorImg,
}) {
    return (
        <div className="schools-card">
            <div className="card-img">
                <img src={image} alt={title} />
            </div>

            <div className="card-content">
                <h5>{title}</h5>
                <p>{description}</p>

                <div className="card-author">
                    <span><img src={authorImg} alt={author} /></span>
                    <div className="author">
                        <p className="coach">{coach}</p>
                        <p>{author}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
