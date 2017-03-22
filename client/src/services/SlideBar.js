import request from '../utils/request';

export function fetchArticleTags() {
	return request(`/article/get_article_tag_list`);
}

export function fetchFriendshipLinks() {
	return request(`/article/get_friendship_link_list`);
}