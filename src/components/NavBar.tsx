import React, { FC } from 'react';
import { Menu, Row, Typography } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';

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
          <Menu.Item key="mail" icon={<MailOutlined />}>
            Summary
          </Menu.Item>
          <Menu.Item key="app" icon={<AppstoreOutlined />}>
            About
          </Menu.Item>
          <SubMenu icon={<SettingOutlined />} title="Settings">
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
        </Menu>
      </Row>
    </Row>
  );
};

export default NavBar;
