// import { useState } from "react";
// import { useAuthContext } from "./useAuthContext";

// export const useLogin = () => {
//   const [error, setError] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { dispatch } = useAuthContext();

//   const login = async (username, password) => {
//     setLoading(true);
//     setError(null);

//     const response = await fetch('http://localhost:4000/api/user/login', {
//       method: "POST",
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({username, password})
//     });
//     const json = await response.json();

//     if (!response.ok) {
//       console.log('json', json.error);
//       setLoading(false);
//       setError(json.error);
//       return;
//     }

//     if (response.ok) {
//       // save the user to local storage
//       localStorage.setItem('user', JSON.stringify(json));
//       dispatch({ type: 'LOGIN', payload: json });
//       setLoading(false);
//     }
//   }

//   return { login, loading, error }
// }
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(null)
  const { dispatch } = useAuthContext()

  const login = async (username, password) => {
    setLoading(true)
    setError(null)

    const response = await fetch('http://localhost:4000/api/user/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ username, password })
    })
    const json = await response.json()

    if (!response.ok) {
      setLoading(false)
      setError(json.error)
    }
    if (response.ok) {
      // save the user to local storage
      localStorage.setItem('user', JSON.stringify(json))

      // update the auth context
      dispatch({type: 'LOGIN', payload: json})

      // update loading state
      setLoading(false)
    }
  }

  return { login, loading, error }
}