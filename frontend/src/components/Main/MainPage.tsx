import { Footer } from "./Footer";
import { Nav } from "./Nav";
import { Search } from "./Search";
import { Table } from "./Table";

export function MainPage() {
  return (
    <div>
      <div className="container mt-5">
        <Nav/>
        <Search/>
        <Table/>
      </div>
      <Footer/>
    </div>
  );
}