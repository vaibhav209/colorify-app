import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import styles from "./UserHome.module.css";
import editImg from "../../Images/edit.jpg";
import deltImg from "../../Images/delete.png";
import addImg from "../../Images/add.png";
import saveImg from "../../Images/saveBtn.png";
import editedImg from "../../Images/edited.jpeg";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes.json";
import { firebaseAuth } from "../../firebase-config";
import { onAuthStateChanged, signOut } from "firebase/auth";

const UserHome = () => {
  const [red, setRed] = useState(0);
  const [green, setGreen] = useState(0);
  const [blue, setBlue] = useState(0);
  const [colors, setColors] = useState([]);

  const [colorpalette, setColorPalette] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const getDataHandler = () => {
    axios
      .get("https://auth-dev-6b6d5-default-rtdb.firebaseio.com/colors.json")
      .then((response) => {
        const transformedColor = [];
        for (let key in response.data) {
          const getColors = {
            id: key,
            key: key,
            red: response.data[key].red,
            green: response.data[key].green,
            blue: response.data[key].blue
          };
          transformedColor.push(getColors);
        }
        setColors(transformedColor);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onAuthStateChanged(firebaseAuth, (current) => {
    if (!current) navigate(routes.USERLOGIN);
  });

  useEffect(() => {
    getDataHandler();
  }, []);

  const saveHandler = () => {
    setEditMode(false);
    setColorPalette(false);
    axios
      .post("https://auth-dev-6b6d5-default-rtdb.firebaseio.com/colors.json", {
        red: red,
        green: green,
        blue: blue
      })
      .then(() => {
        getDataHandler();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteColor = (key) => {
    setEditMode(false);
    axios
      .delete(
        `https://auth-dev-6b6d5-default-rtdb.firebaseio.com/colors/${key}.json`
      )
      .then((res) => {
        getDataHandler();
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const editHandler = (key) => {
    setColorPalette(true);
    setEditMode(true);
    localStorage.setItem("key", key);
  };

  const editedHandler = (key) => {
    setEditMode(false);
    setColorPalette(false);
    let userid = localStorage.getItem("key");
    axios
      .put(
        `https://auth-dev-6b6d5-default-rtdb.firebaseio.com/colors/${userid}.json`,
        {
          red: red,
          green: green,
          blue: blue
        }
      )
      .then((res) => {
        getDataHandler();
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const resetColors = () => {
    setRed(0);
    setGreen(0);
    setBlue(0);
  };

  const handleCreate = () => {
    setColorPalette(true);
    setEditMode(false);
    resetColors();
  };

  const signOutHandler = () => {
    signOut(firebaseAuth);
  };

  return (
    <>
      {colorpalette ? (
        <div className={styles.masterBoard}>
          <div className={styles.mainBoard}>
            <div
              style={{
                backgroundColor: `rgba(${red}, ${green}, ${blue})`,
                height: "80px",
                width: "80px",
                boxShadow: "5px 7px",
                borderRadius: "15%"
              }}
            ></div>
            <div>
              <div
                className={styles.colorPoint}
                style={{ backgroundColor: "red" }}
              />
              <input
                type={"range"}
                min={"0"}
                max={"255"}
                value={red}
                style={{ marginTop: "20px" }}
                onChange={(e) => setRed(e.target.value)}
              />
            </div>
            <div>
              <div
                className={styles.colorPoint}
                style={{ backgroundColor: "green" }}
              />
              <input
                type={"range"}
                min={"0"}
                max={"255"}
                value={green}
                style={{ marginTop: "7px" }}
                onChange={(e) => setGreen(e.target.value)}
              />
            </div>
            <div>
              <div
                className={styles.colorPoint}
                style={{ backgroundColor: "blue" }}
              />
              <input
                type={"range"}
                min={"0"}
                max={"255"}
                value={blue}
                style={{ marginTop: "7px" }}
                onChange={(e) => setBlue(e.target.value)}
              />
            </div>

            {editMode ? (
              <img
                src={editedImg}
                alt="edited"
                onClick={editedHandler}
                className={styles.editedButton}
              />
            ) : (
              <img
                src={saveImg}
                alt="save"
                onClick={saveHandler}
                className={styles.saveButton}
              />
            )}
          </div>
        </div>
      ) : (
        <div className={styles.createButtons}>
          <img
            src={addImg}
            alt="create-button"
            onClick={handleCreate}
            className={styles.createButtons}
          />
        </div>
      )}
      {isLoading && <h3 style={{ textAlign: "center" }}>Loading...</h3>}

      {!colorpalette && !isLoading && (
        <div className={styles.colorSection}>
          {colors.map((color, index) => (
            <div
              key={index}
              style={{
                backgroundColor: `rgba(${color.red}, ${color.green}, ${color.blue})`
              }}
              className={styles.boxList}
            >
              <div className={styles.userButtons}>
                <img
                  src={editImg}
                  alt="edit"
                  onClick={() => editHandler(color.key)}
                />
                <img
                  src={deltImg}
                  alt="delete"
                  onClick={() => deleteColor(color.key)}
                />
              </div>
            </div>
          ))}
        </div>
      )}
      <footer>
        <button className={styles.logoutButton} onClick={signOutHandler}>
          Sign Out
        </button>
      </footer>
    </>
  );
};

export default UserHome;
