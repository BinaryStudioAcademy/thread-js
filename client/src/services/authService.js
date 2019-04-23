import callWebApi from 'src/helpers/webApiHelper';

export const login = async (request) => {
    const response = await callWebApi({
        endpoint: '/api/auth/login',
        type: 'POST',
        request,
    });
    return response;
};

export const registration = async (request) => {
    const response = await callWebApi({
        endpoint: '/api/auth/register',
        type: 'POST',
        request,
    });
    return response;
};
