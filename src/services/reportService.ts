import { request } from '@umijs/max'

/**
 * 创建
 * @param params 
 */
export async function addReport(params: ReportType.ReportAddRequest) {
  return request<BaseResponse<number>>('/report/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    data: params
  })
}

/**
 * 删除
 * @param params 
 */
export async function deleteReport(params:DeleteRequest) {
  return request<BaseResponse<boolean>>(`/report/delete`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  })
}

/**
 * 更新
 * @param params
 */
export async function updateReport(params: ReportType.ReportUpdateRequest) {
  return request<BaseResponse<boolean>>(`/report/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
  });
}

/**
 * 分页获取列表
 * @param params
 */
export async function listReportByPage(params: ReportType.ReportQueryRequest) {
  return request<BaseResponse<PageInfo<ReportType.Report>>>(
    '/report/list/page',
    {
      method: 'GET',
      params,
    },
  );
}