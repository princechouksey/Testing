export const baseURL = "http://localhost:3000";

const SummaryApi = {
  userLogin: {
    url: "/api/user/login",
    method: "POST",
  },
  complainRegister: {
    url: "/api/user/register/complaint",
    method: "POST",
  },
};

export default SummaryApi;
