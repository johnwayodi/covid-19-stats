import React, { FC } from 'react';
import { Card, Layout } from 'antd';

import styles from './About.module.scss';

export const About: FC = () => {
  return (
    <Layout className={styles.page}>
      <Card title="About" bordered={false} style={{ width: 300 }}>
        <p>About the Site</p>
      </Card>
      <Card title="APIs used" bordered={false} style={{ width: 300 }}>
        <p>About the API</p>
      </Card>
    </Layout>
  );
};

export default About;
