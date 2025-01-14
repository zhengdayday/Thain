/*
 * Copyright (c) 2019, Xiaomi, Inc.  All rights reserved.
 * This source code is licensed under the Apache License Version 2.0, which
 * can be found in the LICENSE file in the root directory of this source tree.
 */
import { Tabs } from 'antd';
import { connect } from 'dva';
import React, { useEffect } from 'react';
import { formatMessage } from 'umi-plugin-react/locale';
import UserAdminTable from './UserAdminTable';
import X5ConfigTable from './X5ConfigTable';
import { ConnectProps } from '@/models/connect';
import { router } from 'umi';
interface Props extends ConnectProps {
  type: string;
}
const AdminTabs: React.FC<Props> = ({ dispatch, type }) => {
  const { TabPane } = Tabs;

  useEffect(() => {
    if (dispatch) {
      if (type === 'user') {
        dispatch({
          type: 'admin/fetchTable',
        });
      } else if (type === 'client') {
        dispatch({
          type: 'x5config/fetchTable',
        });
      }
    }
  }, [type]);

  return (
    <div>
      <Tabs
        activeKey={type}
        tabPosition="left"
        onChange={activeKey => {
          if (activeKey === 'user') {
            router.push('/admin/user');
          } else {
            router.push('/admin/client');
          }
        }}
      >
        <TabPane tab={formatMessage({ id: 'admin.index.userAdmin' })} key="user">
          <UserAdminTable />
        </TabPane>
        <TabPane tab={formatMessage({ id: 'admin.index.ClientAdmin' })} key="client">
          <X5ConfigTable />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default connect(() => ({}))(AdminTabs);
