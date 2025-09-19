import axios from "axios";

const API_URL = "http://localhost:3000/air"; // 백엔드 서버 주소

export const fetchAirData = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("데이터 가져오기 실패:", error);
    return [];
  }
};
