

import callWebApi from "src/helpers/webApiHelper";

export const login = async (request) => {
    const response = await callWebApi({
        endpoint: "/api/auth/login",
        type: 'POST',
        request,
    });
    return await response;
}
