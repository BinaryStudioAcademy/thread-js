import React from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';

const Spinner = () => (
    <Dimmer active inverted>
        <Loader size="massive" inverted />
    </Dimmer>
);

export default Spinner;
