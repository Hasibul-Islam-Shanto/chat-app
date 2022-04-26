import axios from "axios";

const BASE_URL = "http://localhost:4000/api";
const API = axios.create({ baseURL: BASE_URL });

API.interceptors.request.use(async (req) => {
  // console.log({ BASE_URL });

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  if (userInfo) {
    let token = userInfo.data.token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});
//Signup for user...
export const singnUp = async (data) => {
  const res = await API.post("/user/signup", data);
  return res;
};
//login for user
export const logIn = async (data) => {
  const res = await API.post("/user/login", data);
  return res;
};

//get all users...
export const GetAllusers = async () => {
  const res = await API.get("/user/allusers");
  return res;
};

export const GetSingleChats = async (userId) => {
  const res = await API.post("/chat/newchat", { userId });
  return res;
};
export const GetChats = async () => {
  const res = await API.get("/chat/getchats");
  return res;
};
export const NewGroupChat = async(data)=>{
    const res = await API.post("/chat/newgroupchat", data);
    return res;
}

export const RenameGroup = async (data) => {
  const res = await API.put("/chat/renamegroup", data);
  return res;
};
export const AddNewGroupMember = async (data) => {
  const res = await API.put("/chat/adduser", data);
  return res;
};
export const RemoveGroupMember = async (data) => {
  const res = await API.put("/chat/removeuser", data);
  return res;
};
