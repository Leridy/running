import React from 'react';
import { connect } from 'dva';
import MainLayout from '../components/MainLayout/MainLayout';
import ToolComponents from '../components/Tool/Tool';

function ToolPage(props) {
  return (
     <MainLayout headerSetting={props.headerSetting} showRightSlide={false}>
       <ToolComponents></ToolComponents>
     </MainLayout>
  );
}

function mapStateToProps(state) {
  return {
    headerSetting:{
      pageTitle:'tool',
      showRightSlide:false
    }
  };
}
export default connect(mapStateToProps)(ToolPage);
