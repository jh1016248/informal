import { Menu, Icon } from 'antd';
import Link from 'umi/link';

function Header ({ location }) {
    return (
        <Menu 
            selectedKeys={[location.pathname]}
            mode="horizontal"
            trheme="dark"
        >
            <Menu.Item key="/">
                <Link to="/"><Icon type="home"/>Home</Link>
            </Menu.Item>
            <Menu.Item key="/users">
                <Link to="/users"><Icon type="bars"/>Users</Link>
            </Menu.Item>
        </Menu>
    )
}

export default Header;
