import { getApi, postApi, postFormData, putApi } from "./api/index";

//User
export const SaveUserData = (data) => postApi("user/save-user", data);
export const GetUsersTopArtists = (id) =>
  getApi(`user/get-users-top-artists/${id}`);
export const GetUsersTopTracks = (id) =>
  getApi(`user/get-users-top-tracks/${id}`);

//file upload
export const FileUpload = (file) => postFormData(`file-upload`, file);
