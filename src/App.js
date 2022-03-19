import { useState } from 'react';
import './App.css';
import { Layout, Menu, Input, Button, Card, Avatar, message, Row, Col} from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined, SearchOutlined } from '@ant-design/icons';
import MenuItem from 'antd/lib/menu/MenuItem';
const { Header, Footer, Content } = Layout;
const { Meta } = Card;

function App() {

  const API_URL="https://pokeapi.co/api/v2/pokemon/";

  const [PokemonToSearch, setPokemonToSearch] = useState("")
  const [loading, setLoading] = useState(false);
  const [cards,setCards] = useState([]);

  const handleChange = (event) => {
    setPokemonToSearch( event.target.value);
  }

  const fetchInfo = async () => {
    setLoading(true);
    try {
      if (!PokemonToSearch == ''){
        const response = await fetch(`${API_URL}${PokemonToSearch}`);
        const Search = await response.json();
        setCards([Search,...cards])
        console.log(cards)
      }else {
        message.warning("Oh, please fill the search field!");
      }
      setLoading(false);
    } catch (error) {
        setLoading(false);
        message.error("Oh, that pokemon does not exist!")
        console.log(error);
    }
  };

  return (
    <>
      <Layout className="layout">
        <Header>
          <div className="logo" />
          <Menu className="Menu" theme="dark" mode="horizontal" selectable={false} defaultSelectedKeys={["2"]}>
              <MenuItem key="SearchText"><p style={{ margin: "0px 16px 0px 16px" }}>Search a pokemon:</p></MenuItem>
              <MenuItem key="SearchInput">
              <Input
                  style={{ margin: "0px 16px 0px 16px" }}
                  className='SearchButton'
                  size="medium"
                  placeholder="Example: Mew"
                  type="text"
                  value={PokemonToSearch}
                  onChange={handleChange}
                  required
                />
              </MenuItem>
              <MenuItem key="SearchButton">
              <Button disabled={loading} icon={<SearchOutlined />} onClick={fetchInfo}>Search</Button>
              </MenuItem>
          </Menu>
        </Header>
        
        <Content style={{ padding: "0 50px" , minHeight: "32rem", background: "rgb(0 0 0 / 75%)"}}>
          <Row gutter={[16, 42]} className="site-layout-content">
            {cards &&
                cards.map((card) => (
                  <Col span={6} >
                    <Card
                    key={card.id}
                    className={`Card_Container ${card.types[0].type.name}`}
                    cover={
                      <img alt={card.order} className="Pokemon_Img" src={card.sprites.front_default} />
                    }
                    actions={[
                      <SettingOutlined key="setting" />,
                      <EditOutlined key="edit" />,
                      <EllipsisOutlined key="ellipsis" />,
                    ]}
                    >
                      <Meta
                        avatar={<Avatar src={card.sprites.other.dream_world.front_default} />}
                        title={card.name}
                        description="This is the description"
                      />
                    </Card>
                  </Col>
                ))
            }
          </Row>
        </Content>
        <Footer style={{ textAlign: "center" , background:"#001529"}}>
          <p style={{ color: "white"}}>Ant Design ©2018 Created by Ant UED</p>
        </Footer>
      </Layout>
    </>
  );
}

export default App;
