import React, { PropsWithChildren } from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Modal, message } from 'antd'
import { updateReport } from '@/services/reportService'

interface UpdateModalProps {
  oldData: ReportType.Report
  modalVisible: boolean
  columns: ProColumns<ReportType.Report>[]
  onSubmit: () => void
  onCancel: () => void
}

/**
 * 更新数据模态框
 * @param report 
 */
const handleUpdate = async (report: ReportType.Report) => {
  const hide = message.loading('正在更新')
  try {
    await updateReport(report)
    hide()
    message.success('更新成功')
    return true
  } catch (error: any) {
    hide()
    message.error('更新失败请重试！')
    return false
  }
}

/**
 * 更新数据模态框
 * @constructor
 */
const UpdateModal: React.FC<PropsWithChildren<UpdateModalProps>> = (props) => {
  const { oldData, columns, modalVisible, onCancel, onSubmit } = props
  return (
    <Modal
      destroyOnClose
      title='更新'
      open={modalVisible}
      onCancel={onCancel}
      footer={null}
    >
      <ProTable<ReportType.Report, ReportType.Report>
        onSubmit={async (values) => {
          const success = await handleUpdate({ ...values, id: oldData.id })
          if (success) onSubmit?.()
        }}
        rowKey='id'
        type='form'
        form={{
          initialValues: oldData
        }}
        columns={columns}
      />
    </Modal>
  )
}

export default UpdateModal