import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const { dispatch } = useAuthContext();

  //const signup = async (firstName, lastName, username, email, password, profilePicture) => {
  const signup = async (formData) => {
    setLoading(true);
    setError(null);

    const response = await fetch('/api/user/signup', {
      method: "POST",
      //headers: {'Content-Type': 'multipart/form-data'},
      //headers: {'Content-Type': 'application/json'},
      body: formData
    });
    const json = await response.json();

    if (!response.ok) {
      setLoading(false);
      setError(json.error);
    }

    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json));
      dispatch({ type: 'LOGIN', payload: json });
      setLoading(false);
    }
  }

  return { signup, loading, error }
}