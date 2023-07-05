import { deleteUser, listUserByPage } from '@/services/userService'
import {
  ActionType,
  PageContainer,
  ProColumns,
  ProTable,
} from '@ant-design/pro-components'
import { Button, Divider, message, Popconfirm, Space, Typography } from 'antd'
import React, { useRef, useState } from 'react'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

/**
 *  删除节点
 * @param selectedRows
 */
const doDelete = async (selectedRows: UserType.User[]) => {
  const hide = message.loading('正在删除');
  if (!selectedRows) return true;
  try {
    await deleteUser({
      id: selectedRows.find((row) => row.id)?.id || 0,
    });
    message.success('操作成功');
  } catch (e: any) {
    message.error('操作失败，' + e.message);
  } finally {
    hide();
  }
};

/**
 * 用户管理页面
 * @constructor
 */
const AdminUserPage: React.FC<unknown> = () => {
  const [createModalVisible, setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible, setUpdateModalVisible] = useState<boolean>(false);
  const [updateData, setUpdateData] = useState<UserType.User>({});
  const actionRef = useRef<ActionType>();

  /**
   * 表格列配置
   */
  const columns: ProColumns<UserType.User>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
      width: 50,
      align: 'center'
    },
    {
      title: '用户昵称',
      dataIndex: 'userName',
      valueType: 'text',
      width: 100,
      align: 'center'
    },
    {
      title: '账号',
      dataIndex: 'userAccount',
      valueType: 'text',
      width: 180,
      align: 'center'
    },
    {
      title: '用户头像',
      dataIndex: 'userAvatar',
      valueType: 'image',
      align: 'center'
    },
    {
      title: '性别',
      dataIndex: 'gender',
      valueEnum: {
        0: { text: '男' },
        1: { text: '女' },
      },
      width: 80,
      align: 'center'
    },
    {
      title: '用户角色',
      dataIndex: 'userRole',
      valueType: 'text',
      valueEnum: {
        'user': { text: '用户' },
        'admin': { text: '管理员' },
      },
      width: 100,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 180,
      align: 'center'
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'dateTime',
      hideInForm: true,
      width: 180,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 180,
      align: 'center',
      render: (_, record) => (
        <Space split={<Divider type="vertical" />}>
          <Typography.Link
            onClick={() => {
              setUpdateData(record);
              setUpdateModalVisible(true);
            }}
          >
            修改
          </Typography.Link>
          <Popconfirm
            title="您确定要删除么？"
            onConfirm={() => doDelete([record])}
            okText="确认"
            cancelText="取消"
          >
            <Typography.Link type="danger">删除</Typography.Link>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <PageContainer>
      <ProTable<UserType.User>
        headerTitle="用户管理"
        actionRef={actionRef}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            key="1"
            type="primary"
            onClick={() => setCreateModalVisible(true)}
          >
            新建
          </Button>,
        ]}
        request={async (params, sorter, filter) => {
          const { data, code } = await listUserByPage({
            ...params,
            // @ts-ignore
            sorter,
            filter,
          });
          return {
            data: data?.records || [],
            success: code === 0,
            total: data.total,
          } as any;
        }}
        columns={columns}
      />
      <CreateModal
        modalVisible={createModalVisible}
        columns={columns}
        onSubmit={() => { setCreateModalVisible(false) }}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateModal
        oldData={updateData}
        modalVisible={updateModalVisible}
        columns={columns}
        onSubmit={() => { setUpdateModalVisible(false) }}
        onCancel={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  );
};

export default AdminUserPage;
