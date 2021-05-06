import * as React from 'react';
import { NavLink } from 'react-router-dom';
import { Header } from 'semantic-ui-react';
import { IconName } from 'src/common/enums/enums';
import { Icon } from 'src/components/common/common';

const NotFound = () => (
  <Header as="h2" icon textAlign="center" style={{ marginTop: 50 }}>
    <Icon name={IconName.FROWN} circular />
    <Header.Content>
      <div>404 Not Found</div>
      {'Go to '}
      <NavLink to="/">Home</NavLink>
      {' page'}
    </Header.Content>
  </Header>
);

export default NotFound;
