import React from 'react';
import './Direct.css';

class Invite extends React.Component {
    render() {
        return (
            <div>
                <div className="dm_container">
                    <div className="dm_banner">Would you like to invite?</div>
                    <div className="go">
                        <button id="yes_btn">Yes</button>
                    </div>
                </div>
            </div>
        );
    }
};

export default Invite;