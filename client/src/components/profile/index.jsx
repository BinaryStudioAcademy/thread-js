import React from 'react';

import formsStyles from 'src/globalStyles/_forms.scss';
import styles from './profile.module.scss';

const Profile = () => (
    <div className={styles.root}>
        <div className={formsStyles['form-line']}>
            <span className={formsStyles['form-title']}>username:</span>
            <input id="email" disabled />
        </div>
        <div className={formsStyles['form-line']}>
            <span className={formsStyles['form-title']}>e-mail:</span>
            <input id="email" disabled />
        </div>
        <div className={formsStyles['form-line']}>
            <span className={formsStyles['form-title']}>password:</span>
            <input id="email" disabled />
        </div>
    </div>
);

export default Profile;
