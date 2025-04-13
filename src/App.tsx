import "./styles.css";
import Layout from "./components/Layout/Layout";
import Game from "./components/Game/Game";

export default function App() {


  return (
    <div className="App">
      <Layout>
        <Game />
      </Layout>
    </div>
  );
}
