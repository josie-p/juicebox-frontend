const BASE_URL = "https://ap-jp-juicebox.onrender.com/api";

function makeHeaders(token) {
  return {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token,
  };
}

export const logInAPI = async (username, password) => {
  try {
    const response = await fetch(`${BASE_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    });

    const result = response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};
