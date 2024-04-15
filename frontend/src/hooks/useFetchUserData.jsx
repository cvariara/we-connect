import { useState, useEffect } from 'react';

const useFetchUserData = (user) => {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/user/profile/${user.username}`);
        const json = await response.json();

        if (response.ok) {
          setUserData(json);
        } else {
          console.error("Failed to fetch user profile");
        }
      } catch (error) {
        console.error("Error fetching user profile:", error.message);
      } finally {
        setLoading(false);
      }
    };

    // Ensure user.username is present before making the fetch request
    if (user && user.username) {
      fetchUserData();
    }
  }, [user]);

  return { loading, userData };
};

export default useFetchUserData;
