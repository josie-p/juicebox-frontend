const BASE_URL = "https://ap-jp-juicebox.onrender.com/api";

function makeHeaders(token) {
    console.log(`Bearer ${token}`)
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
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

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const registerAPI = async (username, password, name, location) => {
  try {
    const response = await fetch(`${BASE_URL}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
        name: name,
        location: location,
      }),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const getPostsAPI = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/posts`, {
      method: "GET",
      headers: makeHeaders(token),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
};

export const editPostAPI = async (token, id, title, content, tags) => {
  try{
    const response = await fetch(`${BASE_URL}/posts/${id}`, {
      method: "PATCH",
      headers:makeHeaders(token),
      body: JSON.stringify({
        title: title,
        content: content,
        tags: tags
      }),
    });

    const result = await response.json();
    return result;
  }catch(error){
    console.error(error)
  }
}

export const deletePostAPI = async (token, id) => {
  try{
 const response = await fetch(`${BASE_URL}/posts/${id}`,{
  method: "DELETE",
  headers: makeHeaders(token),
 });

 const result = await response.json();

 return result;
  }catch(error){
    console.error(error)
  }
}