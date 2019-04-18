import callWebApi from "src/helpers/webApiHelper";

export const getAllPosts = async () => {
    const response = await callWebApi({
        endpoint: "/api/posts",
        type: 'GET'
    });
    return await response.json();
}

export const addPost = async (request) => {
    const response = await callWebApi({
        endpoint: "/api/posts",
        type: 'POST',
        request
    });
    return await response.json();
}


export const getPost = async (id) => {
    const response = await callWebApi({
        endpoint: `/api/posts/${id}`,
        type: 'GET'
    });
    return await response.json();
}
