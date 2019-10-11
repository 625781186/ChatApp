import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { P, dark_cont2, dark_active } from '../../styles'

const MenuRow = ({unreadCount, title}) => {
  let match = useRouteMatch('/app/:page');
  const page = match && match.params ? match.params.page : null;

  title = title.toLowerCase();
  const isActive = (page === title);

  return (
    <StyledLink
      isActive={isActive}
      to={`/app/${title}`}
    >
      <P center grid_left color={dark_cont2}>{title}</P>
      <P center color="#fff">{unreadCount}</P>
    </StyledLink>
  )
};

const StyledLink = styled(({isActive, ...props}) => <Link {...props} />)`
  width: 100%;
  border-radius: 6px;
  background: ${props => props.isActive
    ? dark_active
    : "inherit"
  };
`;

MenuRow.propTypes = {
  title: PropTypes.string.isRequired,
  unreadCount: PropTypes.number,
  id: PropTypes.number.isRequired,
};

export default MenuRow