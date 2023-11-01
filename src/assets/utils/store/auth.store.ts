import { create } from "zustand";
import { auth, firestore, Auth } from "../../../firebase";
import { User } from "firebase/auth";

type authStore = {
  user: User | null;
  isLoggedIn: boolean;
  loginError: string;
  signUp: (email: string, pswd: string) => void;
  signInWithPassword: (email: string, pswd: string) => void;
  signInWithGoogle: () => void;
  signOut: () => void;
  //resetPswdEmail: () => void;
  //updateUser: () => void;
  resetLoginError: () => void;
};

export const useAuthStore = create<authStore>((set) => ({
  user: auth.currentUser ? (auth.currentUser as User) : null,
  isLoggedIn: auth.currentUser !== null,
  loginError: "",

  signUp: async (email, pswd) => {
    await auth
      .createUserWithEmailAndPassword(email, pswd)
      .then((userCredential) => {
        const _user = userCredential.user;
        firestore
          .collection("Users")
          .doc(userCredential.user?.uid)
          .set({
            id: _user?.uid,
            name: _user?.displayName,
            email: _user?.email,
          })
          .then()
          .catch((e) => {
            return { loginError: e.message };
          });
        set({ user: _user as User, isLoggedIn: true });
      })
      .catch((e) => {
        set({
          loginError: e.message,
        });
      });
  },

  signInWithPassword: async (email, pswd) => {
    await auth
      .signInWithEmailAndPassword(email, pswd)
      .then((userCredential) =>
        set({
          user: userCredential.user as User,
          isLoggedIn: true,
        })
      )
      .catch((e) => {
        return { loginError: e.message };
      });
  },

  signInWithGoogle: async () => {
    var provider = new Auth.GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");
    auth
      .signInWithPopup(provider)
      .then(function (result) {
        firestore
          .collection("Users")
          .doc(result.user?.uid)
          .set({
            id: result.user?.uid,
            name: result.user?.displayName,
            email: result.user?.email,
          })
          .then()
          .catch((e) => {
            return { loginError: e.message };
          });

        set({
          user: result.user as User,
          isLoggedIn: true,
        });
      })
      .catch((e) => {
        return { loginError: e.message };
      });
  },

  signOut: async () => {
    await auth
      .signOut()
      .then(() => set({ user: null, isLoggedIn: false }))
      .catch((e) => {
        return { loginError: e.message };
      });
  },

  resetLoginError: () =>
    set((state) => {
      return { loginError: "" };
    }),
}));
