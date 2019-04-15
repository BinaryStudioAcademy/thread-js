import callWebApi from "src/helpers/webApiHelper";

export const getAllPosts = async () => {
    const response = await callWebApi({
        endpoint: "/api/posts",
        type: 'GET'
    });
    return await response.json();
}
