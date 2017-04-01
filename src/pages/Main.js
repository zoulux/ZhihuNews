/**
 * Created by zou on 2017/3/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    ListView,
    ToastAndroid,
    RefreshControl,
    InteractionManager,
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import moment from 'moment';

import NewsItem from '../component/NewsItem'
import Divider from '../component/Divider'
import BannerItem from '../component/BannerItem'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
const bannerDs = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});

const date = new Date()
const str = '' + date.getFullYear() + (date.getMonth() + 1) + (date.getDate());

let beforeDay = 0;

export default class ZhihuNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            dataSource: ds.cloneWithRows([]),
            bannerDataSource: bannerDs.cloneWithPages([]),
            refreshing: false,
            date: '',
        }
        this.fetchData = this.fetchData.bind(this);
        this._refreshControl = this._refreshControl.bind(this);
        this.setListData = this.setListData.bind(this);
        this.fetchBeforeData = this.fetchBeforeData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    _onRefresh() {
        this.fetchData()
        beforeDay = 0;
    }

    fetchData() {
        this.setState({
            refreshing: true
        })
        fetch('http://news-at.zhihu.com/api/4/news/latest')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    bannerDataSource: this.state.bannerDataSource.cloneWithPages(responseJson.top_stories),
                    refreshing: false,
                })
                //设置dataSource中数据
                this.setListData(responseJson.stories);

            })
            .catch((e) => {
                alert(e)
            })
    }

    fetchBeforeData() {
        let time = moment().add(--beforeDay, 'days').format('YYYYMMDD');
        fetch(`http://news-at.zhihu.com/api/4/news/before/${time}`)
            .then((response) => response.json())
            .then((responseJson) => {
                this.setListData(this.state.data.concat(responseJson.stories));
            })
            .catch((e) => {
                alert(e)
            })
    }

    setListData(data) {
        this.setState({
            data: data,
            dataSource: ds.cloneWithRows(data)
        });
    }


    _renderRow(rowData) {
        return <NewsItem data={rowData}></NewsItem>
    }

    _renderSeparator(sectionID, rowID) {
        return <Divider key={sectionID + rowID }/>
    }

    _renderPage(data, id) {
        return <BannerItem data={data}></BannerItem>
    }

    _renderHeader() {
        return <ViewPager
            dataSource={this.state.bannerDataSource}
            renderPage={this._renderPage.bind(this)}
            isLoop
            autoPlay
        />
    }

    //不能这样写 不知道为啥 现在还不能解决
    _refreshControl() {
        return <RefreshControl
            refreshing={this.state.refreshing}
            colors={['#ff0000', '#00ff00', '#0000ff']}
            onRefresh={this._onRefresh.bind(this)}
        />;
    }


    _onEndReached() {
        if (this.state.refreshing) {
            return;
        }
        if (this.state.dataSource.getRowCount() < 5) {
            return;
        }


        InteractionManager.runAfterInteractions(() => {
            this.fetchBeforeData();
        })

    }

    // renderRow 每一行Item
    // renderSeparator 分割线
    //initialListSize 组件第一次加载时需要渲染的行数
    //onEndReachedThreshold 滑动距离底部还有n单位像素时会触发 onEndReached 方法
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.container}
                    enableEmptySections={true}
                    onEndReachedThreshold={20}
                    initialListSize={10}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    renderHeader={this._renderHeader.bind(this)}
                    onEndReached={ this._onEndReached.bind(this) }
                    refreshControl={<RefreshControl
                        refreshing={this.state.refreshing}
                        colors={['#ff0000', '#00ff00', '#0000ff']}
                        onRefresh={this._onRefresh.bind(this)}
                    />}
                >
                </ListView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f3f3f3',
        marginTop: 26,
    },
});

