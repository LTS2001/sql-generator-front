import React, { useRef, useState } from 'react'
import { ActionType, ProColumns, PageContainer, ProTable } from '@ant-design/pro-components'
import { Button, Divider, Popconfirm, Space, Typography, message } from 'antd'
import { updateDict, deleteDict, listDictByPage } from '@/services/dictService'
import { REVIEW_STATUS_ENUM } from '@/constants'
import CreateModal from './components/CreateModal'
import UpdateModal from './components/UpdateModal'

/**
 * 词库管理页面
 * @constructor
 */
const AdminDictPage: React.FC = () => {
  const [createModalVisible, setCreateModalVisible] = useState(false)
  const [updateModalVisible, setUpdateModalVisible] = useState(false)
  const [updateData, setUpdateData] = useState<DictType.Dict>({} as DictType.Dict)
  const actionRef = useRef<ActionType>()

  /**
   * 删除节点
   * @param dict
   */
  const doDelete = async (dict: DictType.Dict) => {
    const hide = message.loading('正在删除')
    if (!dict?.id) return
    try {
      await deleteDict({
        id: dict.id
      })
      message.success('操作成功')
      actionRef.current?.reload()
    } catch (error: any) {
      message.error('操作失败，' + error.message)
    } finally {
      hide()
    }
  }

  /**
   * 更新审核状态
   * @param dict 
   * @param reviewStatus 
   */
  const updateReviewStatus = async (
    dict: DictType.Dict,
    reviewStatus: number
  ) => {
    const hide = message.loading('处理中')
    try {
      await updateDict({
        id: dict.id,
        reviewStatus
      })
      message.success('操作成功')
      actionRef.current?.reload()
    } catch (error: any) {
      message.error('操作失败，' + error.message)
    } finally {
      hide()
    }
  }

  /**
   * 表格列配置
   */
  const columns: ProColumns<DictType.Dict>[] = [
    {
      title: 'id',
      dataIndex: 'id',
      valueType: 'index',
      width: 50,
      align: 'center'
    },
    {
      title: '名称',
      dataIndex: 'name',
      width: 100,
      align: 'center'
    },
    {
      title: '内容',
      dataIndex: 'content',
      valueType: 'textarea',
      fieldProps: {
        placeholder: '多个单词间用【英文或中文逗号】分割'
      },
      ellipsis: true,
    },
    {
      title: '审核状态',
      dataIndex: 'reviewStatus',
      valueEnum: REVIEW_STATUS_ENUM,
      width: 80,
      align: 'center'
    },
    {
      title: '审核信息',
      dataIndex: 'reviewMessage',
      width: 200,
      align: 'center'
    },
    {
      title: '创建者',
      dataIndex: 'userId',
      valueType: 'text',
      hideInForm: true,
      width: 80,
      align: 'center'
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInForm: true,
      hideInSearch: true,
      width: 150,
      align: 'center'
    },
    {
      title: '操作',
      dataIndex: 'option',
      valueType: 'option',
      width: 230,
      align: 'center',
      render: (_, record) => (
        <Space split={<Divider type='vertical' />}>
          <Typography.Link
            onClick={() => {
              setUpdateData(record)
              setUpdateModalVisible(true)
            }}
          >
            修改
          </Typography.Link>
          {record.reviewStatus !== 1 && (
            <Typography.Link
              onClick={() => {
                updateReviewStatus(record, 1)
              }}
            >
              通过
            </Typography.Link>
          )}
          {record.reviewStatus !== 2 && (
            <Typography.Link
              type='danger'
              onClick={() => {
                updateReviewStatus(record, 2)
              }}
            >
              拒绝
            </Typography.Link>
          )}
          <Popconfirm
            title='你确定要删除吗？'
            onConfirm={() => doDelete(record)}
            okText='确认'
            cancelText='取消'
          >
            <Typography.Link type='danger'>删除</Typography.Link>
          </Popconfirm>
        </Space>
      )
    }
  ]
  return (
    <PageContainer>
      <ProTable<DictType.Dict>
        headerTitle='词库管理'
        actionRef={actionRef}
        rowKey='id'
        search={{
          labelWidth: 'auto',
          defaultCollapsed: false
        }}
        toolBarRender={() => {
          return [
            <Button
              key='1'
              type='primary'
              onClick={() => setCreateModalVisible(true)}
            >
              新建
            </Button>
          ]
        }}
        request={async (params, sorter) => {
          const searchParams: DictType.DictQueryRequest = { ...params }
          // eslint-disable-next-line guard-for-in
          for (const key in sorter) {
            searchParams.sortField = key
            searchParams.sortOrder = sorter[key] as any
          }
          const { data, code } = await listDictByPage(searchParams)
          return {
            data: data.records || [],
            success: code === 0,
            total: data.total
          }
        }}
        columns={columns}
      />
      <CreateModal
        modalVisible={createModalVisible}
        columns={columns}
        onSubmit={() => { setCreateModalVisible(false); actionRef.current?.reload(); }}
        onCancel={() => setCreateModalVisible(false)}
      />
      <UpdateModal
        modalVisible={updateModalVisible}
        oldData={updateData}
        columns={columns}
        onSubmit={() => { setUpdateModalVisible(false); actionRef.current?.reload(); }}
        onCancel={() => setUpdateModalVisible(false)}
      />
    </PageContainer>
  )
}

export default AdminDictPage