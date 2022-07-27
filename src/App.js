import logo from "./logo.svg";
import "./App.css";
import Header from "../src/components/Header";
import Board from "../src/screens/Board/index";
function App() {
  return (
    <div className="App" style={{backgroundColor:"SlateBlue"}}>
      <Header />
      <Board />
    </div>
  );
}

export default App;
