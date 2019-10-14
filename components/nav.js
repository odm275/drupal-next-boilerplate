import React from 'react';
import { Menu, Container, Image } from 'semantic-ui-react';
import Link from 'next/link';

const fixedMenuStyle = {
  backgroundColor: 'transparent',
  boxShadow: '0px 0px 0px rgba(0, 0, 0, 0)',
  border: 'none',
  position: 'absolute',
  top: 0
};

const linkStyle = {
  color: 'white',
  textTransform: 'uppercase'
};

const buttonStyle = {
  backgroundColor: 'white',
  color: 'rgba(67, 206, 224,1)',
  margin: '10px'
};

const Nav = ({ links }) => {
  console.log('all links', links);
  const navBarLinks = links.filter(link => link.url.path !== '/');
  const homeLink = links.filter(link => link.url.path === '/');
  console.log('navBarLinks', navBarLinks);
  console.log('homeLink', homeLink);
  return (
    <Menu borderless fixed="top" style={fixedMenuStyle}>
      <Container>
        <Menu.Menu position="left">
          <Link href={homeLink[0].url.path}>
            <Menu.Item>
              <Image size="small" src="/static/logo.svg" />
            </Menu.Item>
          </Link>
        </Menu.Menu>
        <Menu.Menu position="right">
          {navBarLinks.map(link => (
            <Link href={link.url.path}>
              <Menu.Item as="a" style={linkStyle}>
                {link.label}
              </Menu.Item>
            </Link>
          ))}
        </Menu.Menu>
      </Container>
    </Menu>
  );
};
export default Nav;
