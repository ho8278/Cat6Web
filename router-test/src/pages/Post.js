import React from 'react';

const Post = ({match}) => {
    return (
        <div>
           Post {match.params.id}
        </div>
    );
};

export default Post;