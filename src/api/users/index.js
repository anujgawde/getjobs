import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.SERVER_BASE_URL}/`,
});

export const sendVerificationEmail = async (userData) => {
  try {
    const response = await api.post(`users/send-verification`, userData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
export const verifyEmail = async (verificationData) => {
  try {
    const response = await api.post(`users/verify-email`, verificationData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};

export const getUsersSearchAttempt = async (loggedInUserData) => {
  try {
    const response = await api.post(`users/search-attempt`, loggedInUserData);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
};
