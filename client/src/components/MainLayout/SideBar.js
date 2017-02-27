import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './SideBar.less';
import { Menu, Icon } from 'antd';

function SideBar() {
  return (
    <div className={styles.SideBar}>
     <div className={styles.item}>
       <p><Icon type="tags" /><span>随笔分类</span></p>
       <ul className={styles.tagList}>
        <li><a href="#">这里是随笔分类第一条这里是随笔分类第一条</a></li>
        <li><a href="#">这里是随笔分类第二条</a></li>
        <li><a href="#">这里是随笔分类第三条</a></li>
        <li><a href="#">这里是随笔分类第四条</a></li>
       </ul>
     </div>    
     <div className={styles.item}>
       <p><Icon type="link" /><span>友情链接</span></p>
       <ul className={styles.tagList}>
        <li><a href="#">这里是随笔分类第一条这里是随笔分类第一条</a></li>
        <li><a href="#">这里是随笔分类第二条</a></li>
        <li><a href="#">这里是随笔分类第三条</a></li>
        <li><a href="#">这里是随笔分类第四条</a></li>
       </ul>
     </div>        
    </div>    
  );
}

function mapStateToProps(state) {
  return {  	  	    
    
  };
}

export default connect(mapStateToProps)(SideBar);
