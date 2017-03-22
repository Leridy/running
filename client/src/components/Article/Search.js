import React from 'react';
import { connect } from 'dva';
import styles from './Search.less';
import { Icon } from 'react-fa';
import { Link } from 'dva/router';
import ReactPaginate from 'react-paginate';

function Search({ previousLabel, nextLabel, pageCount, dataSource, dispatch }) {
  function handlePageClick(data) {
    var selectIndex = parseInt(data.selected + 1);    
    dispatch({
      type: 'Index/fetch',
      payload: {
        pageIndex: selectIndex
      }
    });
  }
  return (
    <div className={styles.normal}>
        分类功能正在开发中，敬请期待...
    </div>
  );
}

function mapStateToProps(state) {
  const { previousLabel, nextLabel, pageCount, dataSource, dispatch } = state.Index;
  return {   
    previousLabel,
    nextLabel,
    pageCount,
    dataSource,
    dispatch
  };
}

export default connect(mapStateToProps)(Search);

