import { useEffect, useState } from "preact/hooks";

const Subject = ({value}) => {
    return (
        <div className="subject">
            <div className="subject-grip"></div>
            <div className="subject-content">
                <div className="subject-time">{value.time} <span className="subject-room">@{value.room}</span></div>
                <div className="subject-name">{value.subject}</div>
                <div className="subject-name mini">{value.subject.split(' ').slice(0,3).join(' ')}</div>
            </div>
        </div>
    )
}
export default Subject;