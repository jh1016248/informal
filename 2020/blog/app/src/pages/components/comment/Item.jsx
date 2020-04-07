
export default ({ data }) => {

    return (
        <div className="comment-item">
            <div className="avatar">
                <img src="https://cdn.boblog.com/Gravatar-Logo.jpg?imageView2/1/w/128" alt=""/>
            </div>
            <div className="content-box">
                <div className="meta-box">
                    <div className="username">{ data.authorName }</div>
                </div>
                <div className="content">{ data.content }</div>
                <div className="reply-stat">
                    <time class="time">{ data.createTime }</time>
                    <div className="action-box">
                        <div className="like-action"></div>
                        <div className="comment-action"></div>
                    </div>
                </div> 
            </div>
        </div>
    )
}
