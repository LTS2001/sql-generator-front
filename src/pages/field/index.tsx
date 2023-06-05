import React, { useState } from 'react'
import { PageContainer } from '@ant-design/pro-layout'
import { Col, Radio, RadioChangeEvent, Row, message } from 'antd'
import FieldInfoCard from '@/components/FieldInfoCard'
import { listMyAddFieldInfoByPage } from '@/services/fieldInfoService'

/**
 * 字段信息页
 * @constructor
 */
const Field: React.FC = () => {
  const [layout, setLayout] = useState('half')

  const loadMyData = (
    searchParams: FieldInfoType.FieldInfoQueryRequest,
    setDataList: (dataList: FieldInfoType.FieldInfo[]) => void,
    setTotal: (total: number) => void
  ) => {
    listMyAddFieldInfoByPage(searchParams)
      .then(res => {
        setDataList(res.data.records)
        setTotal(res.data.total)
      })
      .catch(e => {
        message.error('加载失败，' + e.message)
      })
  }

  const onLayoutChange = (e: RadioChangeEvent) => {
    setLayout(e.target.value)
  }

  return (
    <div className='field-info'>
      <PageContainer
        title={
          <>
            参考或学习字段设计，高效完成建表！
          </>
        }
        extra={
          <div style={{ marginLeft: 0 }}>
            切换布局：
            <Radio.Group onChange={onLayoutChange} value={layout}>
              <Radio.Button value='input'>公开</Radio.Button>
              <Radio.Button value='half'>同屏</Radio.Button>
              <Radio.Button value='output'>个人</Radio.Button>
            </Radio.Group>
          </div>
        }
      >
        <Row gutter={[12, 12]}>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 2 : 1}
          >
            <FieldInfoCard title='公开字段信息' showTag={false} />
          </Col>
          <Col
            xs={24}
            xl={layout === 'half' ? 12 : 24}
            order={layout === 'output' ? 1 : 2}
          >
            <FieldInfoCard title="个人字段" onLoad={loadMyData} needLogin />
          </Col>
        </Row>
      </PageContainer>
    </div>
  )
}

export default Field