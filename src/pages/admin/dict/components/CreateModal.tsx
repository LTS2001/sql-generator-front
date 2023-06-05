import React, { PropsWithChildren } from 'react'
import { ProColumns, ProTable } from '@ant-design/pro-components'
import { Modal, message } from 'antd'
import { addDict } from '@/services/dictService'

interface CreateModalProps {
  modalVisible: boolean
  columns: ProColumns<DictType.Dict>[]
  onSubmit: () => void
  onCancel: () => void
}

/**
 * 添加节点
 * @param fields 
 */
const handleAdd = async (fields: DictType.Dict) => {
  const hide = message.loading('正在添加')
  try {
    await addDict({ ...fields })
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
      <ProTable<DictType.Dict, DictType.Dict>
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