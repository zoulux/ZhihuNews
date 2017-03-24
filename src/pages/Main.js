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
} from 'react-native';
import ViewPager from 'react-native-viewpager';

import NewsItem from '../component/NewsItem'
import Divider from '../component/Divider'
import BannerItem from '../component/BannerItem'

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
var bannerDs = new ViewPager.DataSource({pageHasChanged: (p1, p2) => p1 !== p2});

export default class ZhihuNews extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataSource: ds.cloneWithRows([]),
            bannerDataSource: bannerDs.cloneWithPages([]),
            refreshing: false,
        }
        this.fetchData = this.fetchData.bind(this)
        this._refreshControl = this._refreshControl.bind(this)
    }

    componentDidMount() {
        this.fetchData();
    }

    _onRefresh() {
        this.fetchData()
    }

    fetchData() {
        fetch('http://news-at.zhihu.com/api/4/news/latest')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    dataSource: this.state.dataSource.cloneWithRows(responseJson.stories),
                    bannerDataSource: this.state.bannerDataSource.cloneWithPages(responseJson.top_stories),
                })
            })
            .catch((e) => {
                alert(e)
            })
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

    // renderRow 每一行Item
    // renderSeparator 分割线
    render() {
        return (
            <View style={styles.container}>
                <ListView
                    style={styles.container}
                    dataSource={this.state.dataSource}
                    renderRow={this._renderRow.bind(this)}
                    enableEmptySections={true}
                    renderHeader={this._renderHeader.bind(this)}
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

