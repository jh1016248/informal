import { Tabs } from 'antd';
import Categorys from './components/categorys';
import Articles from './components/articles';

const { TabPane } = Tabs;

export default () => {
    const callback = (e) => {
        console.log(e)
    }
    return (
        <div>
            <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="文章" key="1">
                    <Articles></Articles>
                </TabPane>
                <TabPane tab="分类" key="2">
                    <Categorys></Categorys>
                </TabPane>
            </Tabs>
        </div>
    )
}