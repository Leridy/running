import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import SearchComponents from '../components/Article/Search';

function ArticleSearch(props) {
  return (
     <MainLayout headerSetting={props.headerSetting} showRightSlide={true}>
       <SearchComponents></SearchComponents>
     </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    headerSetting:{
      pageTitle:'文章分类搜索'      
    }
  };
}
export default connect(mapStateToProps)(ArticleSearch);
