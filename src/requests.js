import axios from "axios";

const brandModelSizeRequestAddress =
  "https://localhost:7287/api/BrandModelSizeRequest";

const brandsAddress = "https://localhost:7287/api/Brands";
const modelsAddress = "https://localhost:7287/api/Model";
const sizeAddress = "https://localhost:7287/api/Sizes";
const modelSizeAddress = "https://localhost:7287/api/ModelSize";
const userAddress = "https://localhost:7287/api/User";
const userRegisterAddress = "https://localhost:7287/api/User/Register";
const userLoginAddress = "https://localhost:7287/api/User/Login";
const userModelsAddress = "https://localhost:7287/api/User_Model";
const userSubmissionsAddress = "https://localhost:7287/api/UserSubmissions";
const authAddress = "https://localhost:7287/api/Auth";

const requestBrandsModelsSizes = async () => {
  try {
    const output = await axios
      .get(brandModelSizeRequestAddress)
      .then((data) => data);
    return output.data;
  } catch (error) {
    console.log(error);
  }
};

const postBrand = async (brand) => {
  try {
    const output = await axios.post(brandsAddress, brand).then((data) => data);
    return output;
  } catch (error) {
    return error.response;
  }
};

const postModel = async (model) => {
  try {
    const output = await axios.post(modelsAddress, model).then((data) => data);
    return output;
  } catch (error) {
    return error.response;
  }
};

const postSizes = async (sizes) => {
  try {
    const output = await axios.post(sizeAddress, sizes).then((data) => data);
    return output;
  } catch (error) {
    return error.response;
  }
};

const postModelSizes = async (sizeModels) => {
  console.log(sizeModels);
  try {
    return await axios.post(modelSizeAddress, sizeModels).then((data) => data);
  } catch (error) {
    return error.response;
  }
};

const registerUser = async (user) => {
  try {
    const output = await axios
      .post(userRegisterAddress, user)
      .then((response) => response);
    return output;
  } catch (error) {
    return error.response;
  }
};

const loginUser = async (user) => {
  try {
    const output = await axios
      .post(userLoginAddress, user, {
        withCredentials: true,
      })
      .then((response) => response);
    return output;
  } catch (error) {
    return error.response;
  }
};

const patchUser = async (user) => {
  try {
    const output = await axios
      .patch(userAddress, user)
      .then((response) => response);

    return output;
  } catch (error) {
    console.log(error);
  }
};

const postUserModels = async (userModels) => {
  try {
    const output = await axios
      .post(userSubmissionsAddress, userModels)
      .then((response) => response);
    return output;
  } catch (error) {
    return error.response;
  }
};

const getUserModels = async (user) => {
  try {
    const output = await axios
      .get(`${userModelsAddress}/${user.id}`)
      .then((response) => response);
    return output;
  } catch (error) {
    console.log(error);
  }
};

const authorize = async () => {
  try {
    const output = await axios
      .get(authAddress, {
        withCredentials: true,
      })
      .then((response) => response);
    return output;
  } catch (error) {
    return error.response;
  }
};

const logout = async () => {
  try {
    const output = await axios
      .get(`${authAddress}/logout`, { withCredentials: true })
      .then((response) => response);
    return output;
  } catch (error) {
    return error.response;
  }
};

const generatePasswordRecovery = async (email) => {
  try {
    const output = await axios
      .post(`${authAddress}/generate/${email}`)
      .then((response) => response);
    return output;
  } catch (error) {
    return error.response;
  }
};

const setNewPassword = async (recoveryModel) => {
  try {
    const output = await axios
      .patch(`${authAddress}`, recoveryModel)
      .then((response) => response);
    return output;
  } catch (error) {
    return error.response;
  }
};

export {
  requestBrandsModelsSizes,
  postBrand,
  postModel,
  postSizes,
  postModelSizes,
  patchUser,
  registerUser,
  loginUser,
  postUserModels,
  getUserModels,
  authorize,
  logout,
  generatePasswordRecovery,
  setNewPassword,
};
