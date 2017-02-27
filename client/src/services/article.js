import request from '../utils/request';

export function fetch({ offset=0,limit=5 }) {
  return request(`/website/new/get_new_list?offset=${offset}&limit=${limit}`);
}