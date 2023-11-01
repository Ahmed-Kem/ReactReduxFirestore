import { useState } from "react";
import { useAuthStore } from "../../assets/utils/store/auth.store";

function LogIn() {
  const [formData, setFormData] = useState({ email: "", pswd: "" });
  const { signInWithPassword, resetLoginError, signInWithGoogle } =
    useAuthStore();
  const loginError = useAuthStore((state) => state.loginError);

  function handleChange(event) {
    setFormData((prevFormData) => {
      return { ...prevFormData, [event.target.name]: event.target.value };
    });
  }

  function handleSubmit(e) {
    e.preventDefault();
    signInWithPassword(formData.email, formData.pswd);

    if (loginError != "") {
      console.log(loginError);
      resetLoginError();
    }
  }

  return (
    <div
      style={{
        background: "grey",
        width: 300,
        padding: "20px 20px",
        borderRadius: 15,
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          style={{
            borderRadius: 15,
            outline: "1px solid white",
            background: "grey",
            padding: "3px 10px",
            color: "white",
          }}
        />
        <input
          type="password"
          name="pswd"
          placeholder="Mot de passe"
          onChange={handleChange}
          style={{
            borderRadius: 15,
            outline: "1px solid white",
            background: "grey",
            padding: "3px 10px",
            marginTop: 20,
            color: "white",
          }}
        />
        <input
          type="submit"
          value="Se connecter"
          style={{
            borderRadius: 15,
            outline: "1px solid white",
            background: "white",
            color: "black",
            padding: "5px 10px",
            marginTop: 20,
          }}
        />
      </form>

      <button onClick={signInWithGoogle}>Connexion avec Google</button>
    </div>
  );
}

export default LogIn;
