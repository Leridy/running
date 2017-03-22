import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './SideBar.less';
import { Menu, Icon } from 'antd';

function SideBar({ articleTags,friendLinks }) {  
  return (
    <div className={styles.SideBar}>
     <div className={styles.item}>
       <p><Icon type="tags" /><span>随笔分类</span></p>
       <ul className={styles.tagList}>
        {
            articleTags.map((item,i)=>{
               return (
                  <li key={i}><Link to={'/list/s-'+item.tag_name+'.html'} key={i}>{item.tag_name}</Link></li>                 
                )
            })
        }        
       </ul>
     </div>    
     <div className={styles.item}>
       <p><Icon type="link" /><span>友情链接</span></p>
       <ul className={styles.tagList}>
        {
            friendLinks.map((item,i)=>{
               return (
                  <li key={i}><a href={item.link_url} target="_blank">{item.name}</a></li>                 
                )
            })            
        }        
       </ul>
     </div>        
    </div>    
  );
}

function mapStateToProps(state) {
  const {
    articleTags,
    friendLinks,    
    dispatch
  } = state.SlideBar;
  return {
    headerSetting: {
      pageTitle: 'test'
    },
    articleTags,
    friendLinks,    
    dispatch
  };
}

export default connect(mapStateToProps)(SideBar);
