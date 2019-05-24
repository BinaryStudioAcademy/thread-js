import React from 'react';
import { Image, Header } from 'semantic-ui-react';

export const Logo = () => (
    <Header as="h2" color="grey">
        <Image circular src="http://s1.iconbird.com/ico/2013/8/428/w256h2561377930292cattied.png" />
        {' '}
        Thread
    </Header>
);

export default Logo;
