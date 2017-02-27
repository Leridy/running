import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import IndexComponents from '../components/Index/Index';

function IndexPage(props) {
  return (
     <MainLayout headerSetting={props.headerSetting} showRightSlide={true}>
       <IndexComponents></IndexComponents>
     </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    headerSetting:{
      pageTitle:'test'      
    }
  };
}
export default connect(mapStateToProps)(IndexPage);
