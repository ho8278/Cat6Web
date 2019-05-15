import React from 'react';
import './Direct.css';

const Direct= () => {
    return(
        <div>
            <div className="dm_container">
                <div className="dm_banner">Direct Massage</div>
                <div className="go">
                <input type="text" placeholder="Find or start a conversation!"></input>
                <button id="go_btn">Go</button>
                </div>
            </div>
        </div>
    );
};

export default Direct;