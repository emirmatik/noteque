import React from "react";
// import bannerSVG from "./svgs/banner.svg"
import video from "./imgs/video.mp4"
import CheckRoundedIcon from '@material-ui/icons/CheckRounded'; //smiple
import AttachmentIcon from '@material-ui/icons/Attachment'; // attach your notes 
import CollectionsRoundedIcon from '@material-ui/icons/CollectionsRounded'; //media

const iconDivStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
}

function About() {
    return (
        <div id="about">
            <div className="about-icons-div">
                <div className="about-icon-div" style={iconDivStyle}>
                    <CheckRoundedIcon className="about-icon" />
                    <p>Simple</p>
                </div>
                <div className="about-icon-div" style={iconDivStyle}>
                    <AttachmentIcon className="about-icon" />
                    <p>Attach your notes</p>
                </div>
                <div className="about-icon-div" style={iconDivStyle}>
                    <CollectionsRoundedIcon className="about-icon" />
                    <p>Create your own collections</p>
                </div>
            </div>
            <div className="about-video">
                <video loop autoPlay muted controls>
                    <source src={video} />
                </video>
            </div>
        </div>
    )
}

export default About;