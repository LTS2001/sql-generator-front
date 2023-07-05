import React, { PropsWithChildren } from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Modal, message } from 'antd'
import { updateDict } from '@/services/dictService'

interface UpdateModalProps {
  oldData: DictType.Dict
  modalVisible: boolean
  columns: ProColumns<DictType.Dict>[]
  onSubmit: () => void
  onCancel: () => void
}

/**
 * 更新数据模态框
 * @param fields 
 */
const handleUpdate = async (fields: DictType.Dict) => {
  const hide = message.loading('正在更新')
  try {
    await updateDict(fields)
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
  let fulfillData = {}
  if (oldData.content) {
    // 处理 oldData 中的 content 内容
    const fulfillContent = JSON.parse(oldData.content).join('，')
    fulfillData = { ...oldData, content: fulfillContent }
  }

  return (
    <Modal
      destroyOnClose
      title='更新'
      open={modalVisible}
      onCancel={onCancel}
      footer={null}
    >
      <ProTable<DictType.Dict, DictType.Dict>
        onSubmit={async (values) => {
          const success = await handleUpdate({ ...values, id: oldData.id })
          if (success) onSubmit?.()
        }}
        rowKey='id'
        type='form'
        form={{
          initialValues: fulfillData
        }}
        columns={columns}
      />
    </Modal>
  )
}

export default UpdateModal