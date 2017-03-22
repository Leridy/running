import React from 'react';
import { connect } from 'dva';
import styles from './Index.less';
import { Icon } from 'react-fa';
import { Link } from 'dva/router';
import ReactPaginate from 'react-paginate';

function Index({ previousLabel, nextLabel, pageCount, dataSource, dispatch }) {
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
      <div className={styles.articleList}>
        {
            dataSource.map((item,i)=>{
               return (
                    <div className={styles.article} key={i}>
                     <div className={styles.articleTitle}>
                      <Link to={'/info/'+item.id+'.html'} key={i}>
                        {item.title}
                      </Link>
                     </div>        
                     <div className={styles.articleDate}>
                      <Link to={'/info/'+item.id+'.html'} key={i}>
                       <Icon name="calendar-check-o" />
                       <span className={styles.date}>{new Date(item.create_time * 1000).format('Y年M月d日 H:m:s')}</span>
                      </Link>
                    </div>
                     <div className={styles.postCon}>
                      <div className={styles.postDesc}>
                       {item.desc}
                      <p><Link to={'/info/'+item.id+'.html'} key={i}>阅读全文</Link></p>
                     </div>
                    </div>
                    <div className={styles.postAttr}>
                    posted @ {new Date(item.create_time * 1000).format('Y-M-d h:m:s')} {item.name}&nbsp;        
                    </div>          
                   </div>                 
                )
            })
        }        
      </div>   
      {
        pageCount>0?(
      <ReactPaginate previousLabel={previousLabel}
                     nextLabel={nextLabel}
                     breakLabel={<a href="javascript:void(0)">...</a>}
                     breakClassName={"break-me"}
                     pageCount={pageCount}
                     marginPagesDisplayed={2}
                     pageRangeDisplayed={5}
                     onPageChange={handlePageClick}
                     containerClassName={"pagination"}
                     subContainerClassName={"pages pagination"}
                     activeClassName={"active"} /> 
            ):null
      }        
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

export default connect(mapStateToProps)(Index);

