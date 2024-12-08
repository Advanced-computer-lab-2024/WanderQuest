"use client";

import React, { useState, useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import styles from "../Styles/Authentication.module.css";
import Signin from './Signin';
import RegistrationForm from './RegisterationForm';

function Authentication() {
    const [isRegistering, setIsRegistering] = useState(false);
    const signinRef = useRef(null);
    const registrationRef = useRef(null);

    const toggleForm = () => {
        setIsRegistering((prev) => !prev);
    };

    return (
        <div className={styles.Authentication}>
            <div className={`${styles.Background} ${isRegistering ? styles.Registering : ''}`}>
                {isRegistering ? (
                    <div>
                        <div className={styles.WelcomeText}>
                            <h1>Registration</h1>
                            <p>Please fill out your information.</p>
                        </div>
                        <div className={styles.Welcome}>
                            <img src="signup.svg" alt="Registration SVG" />
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className={styles.WelcomeText}>
                            <h1>Welcome</h1>
                            <p>Thank you for visiting our website. Please login.</p>
                        </div>
                        <div className={styles.Welcome}>
                            <img src="login.svg" alt="Login SVG" />
                        </div>
                    </div>
                )}
            </div>
            <div className={`${styles.RightSideOuter} ${isRegistering ? styles.Registering : ''}`}>
                <SwitchTransition>
                    <CSSTransition
                        key={isRegistering ? 'register' : 'login'}
                        timeout={300}
                        classNames={{
                            enter: styles.Enter,
                            enterActive: styles.EnterActive,
                            exit: styles.Exit,
                            exitActive: styles.ExitActive,
                        }}
                        nodeRef={isRegistering ? registrationRef : signinRef}
                    >
                        {isRegistering ? (
                            <RegistrationForm toggleForm={toggleForm} ref={registrationRef} />
                        ) : (
                            <Signin toggleForm={toggleForm} ref={signinRef} />
                        )}
                    </CSSTransition>
                </SwitchTransition>
            </div>
        </div>
    );
}

export default Authentication;