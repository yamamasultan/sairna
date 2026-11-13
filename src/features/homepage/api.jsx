import api from "../../api/axios";

export const getCities = async () => {
    const { data } = await api.get("/cities");
    return data;
};

export const getTrips = async (filters) => {
    const { data } = await api.get("/trips", { params: filters });
    return data;
};