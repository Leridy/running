import React from 'react';
import { connect } from 'dva';
import styles from './Info.less';

function Info({ dataSource }) {	
  return (
    <div className={styles.post}>
      <h1 className={styles.postTitle}>
      	{dataSource.title}
      </h1>
      <div className={styles.postBody} dangerouslySetInnerHTML={{__html:dataSource.content}}>
                     	
      </div>            
    </div>
  );
}

function mapStateToProps(state) {
  const { dataSource, dispatch } = state.ArticleInfo;
  return {
  	dataSource,
  	dispatch
  };
}

export default connect(mapStateToProps)(Info);