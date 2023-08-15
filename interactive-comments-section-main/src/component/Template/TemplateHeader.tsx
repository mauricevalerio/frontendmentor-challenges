//For handling the createdAt data
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en.json'
TimeAgo.setDefaultLocale(en.locale)
TimeAgo.addLocale(en)
import ReactTimeAgo from 'react-time-ago'
import { TemplateHeaderProp } from '../../types/TTemplateTypes'
import { globalContext } from '../../context/CommentContext'

const TemplateHeader: React.FC<TemplateHeaderProp> = ({ user, createdAt }) => {
    const { currentUserData } = globalContext()

    return (
        <>
            <img
                src={user.image.png}
                alt={`Profile picture of ${user.username}`}
                className="profile-picture" />

            <span className="fw-bold">{user.username}</span>

            {currentUserData.username === user.username &&
                <span className="text-white d-block px-1 blue-bg current-user-tag"
                >You</span>
            }

            <span className="gray-text text-sm">
                <ReactTimeAgo date={new Date(createdAt)} locale="en-US" />
            </span>
        </>
    )
}

export default TemplateHeader