import React, { useState } from "react";
import LogIn from "../../components/LogIn";
import SignUp from "../../components/SignUp";
import { useAuthStore } from "../../assets/utils/store/auth.store";
import { Navigate } from "react-router-dom";

function Authentification() {
  const [currentTab, setCurrentTab] = useState("1");
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  const handleTabClick = (e) => {
    setCurrentTab(e.target.id);
  };

  return (
    <div>
      {isLoggedIn ? (
        <Navigate to="/Bruh" />
      ) : (
        <div
          className="container"
          style={{ width: 300, margin: "0 auto", marginTop: 200 }}
        >
          <div
            className="tabs"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <button
              key="1"
              id="1"
              disabled={currentTab === "1"}
              onClick={handleTabClick}
              style={{
                border: "none",
                color: currentTab === "1" ? "white" : "grey",
                cursor: "pointer",
                padding: 25,
                width: "100%",
                backgroundColor: currentTab === "1" ? "grey" : "white",
              }}
            >
              Se connecter
            </button>

            <button
              key="2"
              id="2"
              disabled={currentTab === "2"}
              onClick={handleTabClick}
              style={{
                border: "none",
                color: currentTab === "2" ? "white" : "grey",
                cursor: "pointer",
                padding: 25,
                width: "100%",
                backgroundColor: currentTab === "2" ? "grey" : "white",
              }}
            >
              Créer un compte
            </button>
          </div>

          <div
            className="content"
            style={{
              padding: "0",
              backgroundColor: "grey",
              fontWeight: 300,
              fontSize: 16,
              textAlign: "justify",
              color: "white",
            }}
          >
            <div key="1">
              {currentTab === "1" && (
                <div>
                  <LogIn />
                </div>
              )}
            </div>

            <div key="2">
              {currentTab === "2" && (
                <div>
                  <SignUp />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Authentification;
