import React, { FC } from 'react';
import { Menu, Row, Typography } from 'antd';
import { Link } from 'dva/router';
import { ProfileOutlined, SettingOutlined, UnorderedListOutlined } from '@ant-design/icons';

import styles from './NavBar.module.scss';

const { SubMenu } = Menu;
const { Title } = Typography;

const NavBar: FC = () => {
  return (
    <Row className={styles.navBar}>
      <Row className={styles.navTitle}>
        <Title level={4}>Covid-19 Statistics</Title>
      </Row>
      <Row className={styles.navMenu}>
        <Menu selectedKeys={['mail']} mode="horizontal">
          <Menu.Item key="mail" icon={<UnorderedListOutlined />}>
            <Link to="/summary">Summary</Link>
          </Menu.Item>
          <Menu.Item key="app" icon={<ProfileOutlined />}>
            <Link to="/about">About</Link>
          </Menu.Item>
          <SubMenu icon={<SettingOutlined />} title="Settings">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </SubMenu>
        </Menu>
      </Row>
    </Row>
  );
};

export default NavBar;
