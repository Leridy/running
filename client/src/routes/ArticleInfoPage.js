import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import ArticleInfoComponents from '../components/Article/Info';

function ToolPage(props) {
  return (
     <MainLayout headerSetting={props.headerSetting} showRightSlide={true}>
       <ArticleInfoComponents></ArticleInfoComponents>
     </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    headerSetting:{
      pageTitle:'ArticleInfo',
      showRightSlide:false
    }
  };
}

export default connect(mapStateToProps)(ToolPage);
