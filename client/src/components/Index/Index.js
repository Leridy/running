import React from 'react';
import { connect } from 'dva';
import styles from './Index.less';
import { Icon } from 'react-fa';
import ReactPaginate from 'react-paginate';

function Index({ previousLabel,nextLabel,pageCount }) {
    function handlePageClick() {

    }
  return (
    <div className={styles.normal}>
      <div className={styles.articleList}>
        <div className={styles.article}>
            <div className={styles.articleTitle}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_DayList_TitleUrl_0" href="http://www.cnblogs.com/coco1s/p/6402723.html">使用 position:sticky 实现粘性布局</a>
            </div>        
            <div className={styles.articleDate}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_ImageLink" href="http://www.cnblogs.com/coco1s/archive/2017/02/15.html">
                 <Icon name="calendar-check-o" />
                 <span className={styles.date}>2017年2月15日</span>
                </a>
            </div>
            <div className={styles.postCon}>
                <div className={styles.postDesc}>
                    摘要: 如果问，CSS 中 position 属性的取值有几个？大部分人的回答是，大概是下面这几个吧？ 额，其实，我们还可以有这 3 个取值： 没了吗？偶然发现其实还有一个处于实验性的取值，position:sticky（戳我查看MDN解释）： 卧槽，什么来的？ 前端发展太快，新东西目接不暇，但是对于有趣的
                    <p><a href="http://www.cnblogs.com/coco1s/p/6402723.html">阅读全文</a></p>
                </div>
            </div>          
            <div className={styles.postAttr}>
                posted @ 2017-02-15 18:41 ChokCoco&nbsp;阅读(1396)            
            </div>          
        </div>
        <div className={styles.article}>
            <div className={styles.articleTitle}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_DayList_TitleUrl_0" href="http://www.cnblogs.com/coco1s/p/6402723.html">使用 position:sticky 实现粘性布局</a>
            </div>        
            <div className={styles.articleDate}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_ImageLink" href="http://www.cnblogs.com/coco1s/archive/2017/02/15.html">2017年2月15日</a>
            </div>
            <div className={styles.postCon}>
                <div className={styles.postDesc}>
                    摘要: 如果问，CSS 中 position 属性的取值有几个？大部分人的回答是，大概是下面这几个吧？ 额，其实，我们还可以有这 3 个取值： 没了吗？偶然发现其实还有一个处于实验性的取值，position:sticky（戳我查看MDN解释）： 卧槽，什么来的？ 前端发展太快，新东西目接不暇，但是对于有趣的
                    <p><a href="http://www.cnblogs.com/coco1s/p/6402723.html">阅读全文</a></p>
                </div>
            </div>          
            <div className={styles.postAttr}>
                posted @ 2017-02-15 18:41 ChokCoco&nbsp;阅读(1396)         
            </div>   
        </div>
        <div className={styles.article}>
            <div className={styles.articleTitle}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_DayList_TitleUrl_0" href="http://www.cnblogs.com/coco1s/p/6402723.html">使用 position:sticky 实现粘性布局</a>
            </div>        
            <div className={styles.articleDate}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_ImageLink" href="http://www.cnblogs.com/coco1s/archive/2017/02/15.html">2017年2月15日</a>
            </div>
            <div className={styles.postCon}>
                <div className={styles.postDesc}>
                    摘要: 如果问，CSS 中 position 属性的取值有几个？大部分人的回答是，大概是下面这几个吧？ 额，其实，我们还可以有这 3 个取值： 没了吗？偶然发现其实还有一个处于实验性的取值，position:sticky（戳我查看MDN解释）： 卧槽，什么来的？ 前端发展太快，新东西目接不暇，但是对于有趣的
                    <p><a href="http://www.cnblogs.com/coco1s/p/6402723.html">阅读全文</a></p>
                </div>
            </div>          
            <div className={styles.postAttr}>
                posted @ 2017-02-15 18:41 ChokCoco&nbsp;阅读(1396)            
            </div>          
        </div>
        <div className={styles.article}>
            <div className={styles.articleTitle}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_DayList_TitleUrl_0" href="http://www.cnblogs.com/coco1s/p/6402723.html">使用 position:sticky 实现粘性布局</a>
            </div>        
            <div className={styles.articleDate}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_ImageLink" href="http://www.cnblogs.com/coco1s/archive/2017/02/15.html">2017年2月15日</a>
            </div>
            <div className={styles.postCon}>
                <div className={styles.postDesc}>
                    摘要: 如果问，CSS 中 position 属性的取值有几个？大部分人的回答是，大概是下面这几个吧？ 额，其实，我们还可以有这 3 个取值： 没了吗？偶然发现其实还有一个处于实验性的取值，position:sticky（戳我查看MDN解释）： 卧槽，什么来的？ 前端发展太快，新东西目接不暇，但是对于有趣的
                    <p><a href="http://www.cnblogs.com/coco1s/p/6402723.html">阅读全文</a></p>
                </div>
            </div>          
            <div className={styles.postAttr}>
                posted @ 2017-02-15 18:41 ChokCoco&nbsp;阅读(1396)            
            </div>          
        </div>
        <div className={styles.article}>
            <div className={styles.articleTitle}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_DayList_TitleUrl_0" href="http://www.cnblogs.com/coco1s/p/6402723.html">使用 position:sticky 实现粘性布局</a>
            </div>        
            <div className={styles.articleDate}>
                <a id="homepage1_HomePageDays_DaysList_ctl00_ImageLink" href="http://www.cnblogs.com/coco1s/archive/2017/02/15.html">2017年2月15日</a>
            </div>
            <div className={styles.postCon}>
                <div className={styles.postDesc}>
                    摘要: 如果问，CSS 中 position 属性的取值有几个？大部分人的回答是，大概是下面这几个吧？ 额，其实，我们还可以有这 3 个取值： 没了吗？偶然发现其实还有一个处于实验性的取值，position:sticky（戳我查看MDN解释）： 卧槽，什么来的？ 前端发展太快，新东西目接不暇，但是对于有趣的
                    <p><a href="http://www.cnblogs.com/coco1s/p/6402723.html">阅读全文</a></p>
                </div>
            </div>          
            <div className={styles.postAttr}>
                posted @ 2017-02-15 18:41 ChokCoco&nbsp;阅读(1396)     
            </div>          
        </div>        
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
  const { previousLabel,nextLabel,pageCount } =state.Index;
  return {
    headerSetting:{
      pageTitle:'test'      
    },
    previousLabel,
    nextLabel,
    pageCount
  };
}

export default connect(mapStateToProps)(Index);

