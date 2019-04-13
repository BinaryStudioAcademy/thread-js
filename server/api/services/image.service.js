import axios from 'axios';
import { imgurId } from '../../config/imgur.config';
import imageRepository from '../../data/repositories/image.repository';

export default {
    upload: async (file) => {
        try {
            const { data: { data } } = await axios.post(
                'https://api.imgur.com/3/upload',
                {
                    image: file.buffer.toString('base64')
                }, {
                    headers: {
                     Authorization: `Client-ID ${imgurId}`
                    }
                });

            const image = {
                link: data.link,
                deleteHash: data.deletehash
            };

            return imageRepository.create(image);
        } catch ({ response: { data: { status, data } } }) {
            return Promise.reject({ status, message: data.error });
        }
    }
};
