import React from 'react';
import queryString from 'querystring';

const Channels = ({location, match}) => {
    const query = queryString.parse(location.search);

    const detail = query.detail === 'true';

    return (
        <div>
            <h2>Channels {match.params.name}</h2>
            {detail && 'detail: blahblah'}
        </div>
    );
};

export default Channels;