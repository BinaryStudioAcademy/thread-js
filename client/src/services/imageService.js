import callWebApi from 'src/helpers/webApiHelper';

export const uploadImage = async image => {
  const response = await callWebApi({
    endpoint: '/api/images',
    type: 'POST',
    attachment: image
  });
  return response.json();
};
