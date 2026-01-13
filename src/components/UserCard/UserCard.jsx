
export const UserCard = ({name, role, avatar, isOnline, stats}) => {
    return <article className={`user-card ${isOnline ? 'online' : ''}`}>
       {name && <h2>{name} {isOnline && <span>Online</span>}</h2>}
        <span>{role}</span>
        <img src={avatar} alt={name} />
        <div>Posts: {stats?.posts} | Followers: {stats?.followers}</div>
    </article>
}