import React, { PropsWithChildren } from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Modal, message } from 'antd'
import { addReport } from '@/services/reportService'

interface CreateModalProps {
  modalVisible: boolean
  columns: ProColumns<ReportType.Report>[]
  onSubmit: () => void
  onCancel: () => void
}

/**
 * 添加节点
 * @param report 
 */
const handleAdd = async (report: ReportType.Report) => {
  const hide = message.loading('正在添加')
  try {
    await addReport({ ...report })
    hide()
    message.success('添加成功')
    return true
  } catch (error: any) {
    hide()
    message.error('添加失败请重试！')
    return false
  }
}

/**
 * 创建数据模态框
 * @constructor
 */
const CreateModal: React.FC<PropsWithChildren<CreateModalProps>> = (props) => {
  const { modalVisible, columns, onSubmit, onCancel } = props
  return (
    <Modal
      destroyOnClose
      title='新建'
      open={modalVisible}
      onCancel={() => onCancel()}
      footer={null}
    >
      <ProTable<ReportType.Report, ReportType.Report>
        onSubmit={async (value) => {
          const success = await handleAdd(value)
          if (success) onSubmit?.()
        }}
        rowKey='id'
        type='form'
        columns={columns}
      />
    </Modal>
  )
}

export default CreateModal