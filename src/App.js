import React, { useState } from "react";
import sha256 from "crypto-js/sha256";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

function App() {
  const [password, setPassword] = useState("");
  const [nonce, setNonce] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showNonce, setShowNonce] = useState(false);
  const [passwordEncoded, setPasswordEncoded] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const originPass = e.target.paswword.value;
    const nonce = e.target.encryptionKey.value;
    const originPasswordEncoded = sha256(nonce + originPass);
    setPasswordEncoded(originPasswordEncoded);
    toast.success("Password encoded!", {
      position: "top-center",
      autoClose: 3000,
      draggable: true,
      closeOnClick: true,
      hideProgressBar: false,
      theme: "colored",
    });
  };
  const copyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(passwordEncoded);
      toast.info("Copied!", {
        position: "top-center",
        autoClose: 3000,
        draggable: true,
        closeOnClick: true,
        hideProgressBar: false,
        theme: "colored",
      });
    } catch (err) {
      toast.error("Failed to copy!", {
        position: "top-center",
        autoClose: 3000,
        draggable: true,
        closeOnClick: true,
        hideProgressBar: false,
        theme: "colored",
      });
    }
  };

  return (
    <div className="App">
      <div className="encode-box">
        <h2>ENCODE PASSWORD</h2>
        <form onSubmit={handleSubmit}>
          <div className="user-box">
            <input
              type={!showPassword ? "password" : "text"}
              name="paswword"
              required={true}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label>Password</label>
            {password && (
              <div
                className="tooglePassword"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                <FontAwesomeIcon
                  icon={!showPassword ? faEye : faEyeSlash}
                  inverse
                />
              </div>
            )}
          </div>
          <div className="user-box">
            <input
              type={!showNonce ? "password" : "text"}
              name="encryptionKey"
              required={true}
              onChange={(e) => {
                setNonce(e.target.value);
              }}
            />
            <label>Encryption key</label>
            {nonce && (
              <div
                className="tooglePassword"
                onClick={() => {
                  setShowNonce(!showNonce);
                }}
              >
                <FontAwesomeIcon
                  icon={!showNonce ? faEye : faEyeSlash}
                  inverse
                />
              </div>
            )}
          </div>
          <div className="user-box">
            <input
              type="text"
              name="passwordEncoded"
              className="passwordEncoded"
              required={false}
              value={passwordEncoded}
              onChange={() => {}}
              onClick={() => {
                passwordEncoded && copyToClipBoard();
              }}
              readOnly
            />
            {/* <label>Password encoded</label> */}
          </div>
          <div className="submitDiv">
            <button className="buttonSubmit" type="submit">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              ENCODE IT !
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
