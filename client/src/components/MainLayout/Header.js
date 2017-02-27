import React from 'react';
import { connect } from 'dva';
import { Link } from 'dva/router';
import styles from './Header.less';
import { Menu, Icon } from 'antd';
const SubMenu=Menu.SubMenu;

function Header({ dispatch, setting, menuKey }) {
  document.title = setting.pageTitle || '';

  function handleMenuClick(e) {
    dispatch({
      type: 'header/handleMenuClick',
      payload: {
        key: e.key
      }
    });
  }
  return (
    <div className={styles.header}>
     <Menu
        onClick={handleMenuClick}
        selectedKeys={[menuKey]}
        mode="horizontal"
      >
        <Menu.Item key="tool">
          <Link to="/tool/"><Icon type="appstore-o" />工具</Link>
        </Menu.Item>      
        <Menu.Item key="home">
          <Link to="/"><Icon type="home" />首页</Link>          
        </Menu.Item> 
     </Menu>
    </div>    
  );
}

function mapStateToProps(state) {
  const { menuKey } = state.header;

  return {  	  	    
    menuKey
  };
}

export default connect(mapStateToProps)(Header);
