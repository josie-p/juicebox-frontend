import React from "react";

const ErrorMessage = ( { message } ) => {
    return(
        <div className="holdWarning">
        <div className="warning">
            <h3>Oh no!</h3>
            <p>{message}</p>
        </div>
        </div>
    )
}

export default ErrorMessage;