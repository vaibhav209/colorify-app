import { useEffect, useState } from "react";
import React from "react";
import styles from "./UserLogin.module.css";
import routes from "../../routes/routes.json";
import { useNavigate } from "react-router-dom";
import { firebaseAuth } from "../../firebase-config";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";

const UserLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const signUpSignInAlert = () => {
    alert("Please enter your email and password");
  };

  const signUpHandler = async () => {
    try {
      await createUserWithEmailAndPassword(firebaseAuth, username, password);
      alert("You are Sign Up successfully");
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        alert("You have already used this email ID");
      } else if (error.code === "auth/invalid-email") {
        alert("Please enter a valid email address");
      } else if (username.length === 0 || password.length === 0) {
        signUpSignInAlert();
      } else {
        alert("Please make a strong password");
      }
    }
  };

  const signInHandler = async () => {
    try {
      await signInWithEmailAndPassword(firebaseAuth, username, password);
      navigate(routes.USERHOME);
    } catch (error) {
      if (username.length === 0 || password.length === 0) {
        signUpSignInAlert();
      } else {
        alert("This account doesn't exists");
      }
    }
  };

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (current) => {
      if (current) {
        navigate(routes.USERHOME);
      } else {
        navigate(routes.USERLOGIN);
      }
    });
  }, [navigate]);

  return (
    <>
      <div className={styles.loginSection}>
        <h2 className={styles.headingName}>Colorify</h2>
        <input
          placeholder="email"
          type="email"
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.userInput}
        />

        <input
          placeholder="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.userInput}
        />
        <div>
          <button onClick={signUpHandler} className={styles.UserButton}>
            Sign Up
          </button>

          <button onClick={signInHandler} className={styles.UserButton}>
            Sign In
          </button>
        </div>
      </div>
      <div></div>
    </>
  );
};

export default UserLogin;
