import React from 'react';
import Loading from './Loading/Verify'

function Auth(props) {
    const [waitAuthCheck, setWaitAuthCheck] = React.useState(false);
    return waitAuthCheck ? <Loading/> : <>{props.children}</>;
}

export default Auth;