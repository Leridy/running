import React from 'react';
import styles from './MainLayout.less';
import Header from './Header';
import SideBar from './SideBar';

function MainLayout({children,headerSetting,showRightSlide}) {
  return (
    <div className={styles.normal}>
      <Header setting={headerSetting}></Header>
      <div className={styles.content}>
       <div className={styles.leftWrapper}>
       	 {children}
       </div>
       {
         showRightSlide?
         (<div className={styles.rightWrapper}>
           <SideBar></SideBar>
         </div>):null
       }       
      </div>
      <div className={styles.footer}>
       
      </div>      
    </div>
  );
}

export default MainLayout;
