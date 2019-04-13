import axios from 'axios';
import { imgurId } from '../../config/imgur.config';
import imageRepository from '../../data/repositories/image.repository';

export default {
    upload: async (file) => {
        let image;
        try {
            const { data: { data } } = await axios.post(
                'https://api.imgur.com/3/upload',
                {
                    image: file.buffer.toString('base64')
                }, {
                    headers: {
                        Authorization: `Client-ID ${imgurId}`
                    }
                }
            );
            image = {
                link: data.link,
                deleteHash: data.deletehash
            };
        } catch ({ response: { data: { status, data } } }) {
            return Promise.reject({ status, message: data.error });
        }
        return imageRepository.create(image);
    }
};
