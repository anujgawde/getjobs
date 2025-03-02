import axios from "axios";

const api = axios.create({
  baseURL: `${process.env.SERVER_BASE_URL}/`,
});

export const getJobBatch = async (filterData) => {
  try {
    const response = await api.post(`scraper/scrape-jobs`, filterData, {
      responseType: "blob",
    });
    return response;
  } catch (error) {
    if (error.response && error.response.data instanceof Blob) {
      const errorText = await error.response.data.text(); // Convert Blob to text
      const errorJson = JSON.parse(errorText); // Parse JSON error
      throw new Error(errorJson.message || "Unknown error occurred");
    } else {
      throw error;
    }
  }
};
