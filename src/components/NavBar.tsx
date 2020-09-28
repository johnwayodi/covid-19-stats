import React, { FC } from 'react';
import { Menu, Row, Typography } from 'antd';
import { Link } from 'dva/router';
import { ProfileOutlined } from '@ant-design/icons';

import styles from './NavBar.module.scss';

const { SubMenu } = Menu;
const { Title } = Typography;

const NavBar: FC = () => {
  return (
    <Row className={styles.navBar}>
      <Row className={styles.navTitle}>
        <Link to="/summary">
          <Title level={4}>Coronavirus (Covid-19) Statistics</Title>
        </Link>
      </Row>
      <Row className={styles.navMenu}>
        <Menu selectedKeys={['mail']} mode="horizontal">
          <Menu.Item key="app" icon={<ProfileOutlined />}>
            <Link to="#">About</Link>
          </Menu.Item>
        </Menu>
      </Row>
    </Row>
  );
};

export default NavBar;
