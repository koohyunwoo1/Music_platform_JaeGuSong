import axios from "axios";
import { useCallback, useState } from "react";

interface Crew {
  crewSeq: number;
  nickname: string;
  profileImage: string;
}

const useMyCrew = () => {
  const [crewData, setCrewData] = useState<Crew[]>([]);

  const getMyCrews = useCallback(async (crewsInfo: Crew[]) => {
    const API_URL = import.meta.env.VITE_API_URL;
    const storedToken = localStorage.getItem("jwtToken");

    try {
      const fetchedCrews = await Promise.all(
        crewsInfo.map(async (crew) => {
          const response = await axios.get(
            `${API_URL}/api/crew/${crew.crewSeq}`,
            {
              headers: {
                Authorization: `Bearer ${storedToken}`,
              },
            }
          );
          return response.data;
        })
      );

      setCrewData(fetchedCrews);
    } catch (error) {
      console.warn("Error fetching crews:", error);
    }
  }, []);

  return {
    getMyCrews,
    crewData,
  };
};

export default useMyCrew;
