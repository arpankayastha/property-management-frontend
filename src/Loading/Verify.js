/* eslint-disable */

import React from 'react';
import styles from './Verify.module.scss';
import {CircularProgress} from "@material-ui/core";

const Verify = () => {
    return (
        <div className={styles.verify}>
            <CircularProgress disableShrink/>
        </div>
    )
};

export default Verify;
