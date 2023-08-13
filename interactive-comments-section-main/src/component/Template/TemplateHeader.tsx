//For handling the createdAt data
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)
import ReactTimeAgo from 'react-time-ago'

export default function TemplateHeader({user, createdAt, isCurrentUser}) {
    
    return (
        <>
            <img 
            src={user.image.png}
            alt={`Profile picture of ${user.username}`} 
            className="profile-picture"/>

            <span className="fw-bold">{user.username}</span>

            {isCurrentUser()
            && 
            <span className="text-white d-block px-1 blue-bg current-user-tag"
            >You</span>}

            <span className="gray-text text-sm">
                <ReactTimeAgo date={new Date(createdAt)} locale="en-US"/>
            </span>
        </>
    )
}