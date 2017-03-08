import request from '../utils/request';

export function fetch({ pageIndex=0,pageSize=10 }) {
  return request(`/article/get_list?pageIndex=${pageIndex}&pageSize=${pageSize}`);
}

export function fetchDetail({ id=0 }) {
  return request(`/article/get_detail?id=${id}`);
}