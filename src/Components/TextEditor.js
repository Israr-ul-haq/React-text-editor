import axios from "../Components/AxiosConfig";

export const getById = async (id, lessonId) => {
  let config = {
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  };
  try {
    const response = await axios.get(
      `/api/Lessons/GetAssessmentsByLessonId?userId=${id}&lessonId=${lessonId}`,
      config
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
export const update = async (body) => {
  try {
    const response = await axios.post("/api/Lessons/SaveUserAssessment", body);
    return response;
  } catch (error) {
    return error.response;
  }
};
export const refreshNotification = async (body) => {
  try {
    const response = await axios.post(
      "/api/Lessons/SendRefreshNotification",
      body
    );
    return response;
  } catch (error) {
    return error.response;
  }
};
