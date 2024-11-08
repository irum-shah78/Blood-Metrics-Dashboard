import React, { useEffect, useState } from "react";
import { FiInfo } from "react-icons/fi";
import axios from "axios";

const LLMInsights = () => {
  const [insights, setInsights] = useState("");

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:8000/api/insights",
          {
            data: {
              patient_1: {
                id: "001",
                A1C: 5.6,
                LDL: 120,
                Vitamin_D: 18,
                Blood_Pressure: "120/80",
                Glucose: 98,
              },
              patient_2: {
                id: "002",
                A1C: 6.1,
                LDL: 145,
                Vitamin_D: 25,
                Blood_Pressure: "130/85",
                Glucose: 110,
              },
              patient_3: {
                id: "003",
                A1C: 6.4,
                LDL: 160,
                Vitamin_D: 15,
                Blood_Pressure: "140/90",
                Glucose: 126,
              },
            },
          }
        );
        setInsights(response.data.insights);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching insights:", error);
        setInsights("Failed to fetch insights.");
      }
    };

    fetchInsights();
  }, []);

  return (
    <div className="bg-white p-4 shadow-lg rounded-lg mt-4">
      <div className="flex items-center space-x-2">
        <FiInfo className="text-blue-500 w-6 h-6" />
        <h3 className="font-semibold">Insights from LLM</h3>
      </div>
      <p className="text-sm text-gray-600 mt-2">
        {insights || "Loading insights..."}
      </p>
    </div>
  );
};

export default LLMInsights;
