import React from 'react'
import { Form, Modal, message, Button } from 'antd'
import TextArea from 'antd/es/input/TextArea'
import { addReport } from '@/services/reportService'

interface Prop {
  visible: boolean
  reportedId: number
  onClose: () => void
}
const ReportModal: React.FC<Prop> = (props) => {
  const { visible, reportedId, onClose } = props
  const [form] = Form.useForm()

  const onFinish = async (values: any) => {
    const hide = message.loading('正在提交')
    try {
      await addReport({
        type: 0,
        content: values.content,
        reportedId
      })
      message.success('提交成功')
      form.resetFields()
      onClose?.()
    } catch (error: any) {
      message.error('提交失败，请重试！' + error.message)
    } finally {
      hide()
    }
  }
  return (
    <Modal title='我要举报' open={visible} footer={null} onCancel={onClose}>
      <Form form={form} onFinish={onFinish}>
        <Form.Item name='content'
          rules={[{ required: true, message: '请输入你举报的原因' }]}
        >
          <TextArea autoFocus maxLength={1024} />
        </Form.Item>
        <Form.Item>
          <Button
            type='primary'
            htmlType='submit'
            style={{ float: 'right', width: 150 }}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default ReportModal