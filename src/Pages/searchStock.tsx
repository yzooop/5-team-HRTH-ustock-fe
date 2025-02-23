import styled from "styled-components";
import Dropdown from "../Component/Dropdown/Dropdown";
import StockDataList from "../Component/List/Data/stockDataList";
import SearchBar from "../Component/SearchBar/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 15px;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0px 25px;
`;

const SearchStock = () => {
  const nav = useNavigate();

  const category = ["capital", "trade", "change"];
  const [selectedStockId, setSelectedStockId] = useState<number | null>(null);
  const [list, setList] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState<string>(category[0]);

  // 리스트에서 종목 클릭시
  const handleSelectStock = (stockId: number) => {
    setSelectedStockId(stockId);
  };

  // 카테고리 set
  const handleSelectedCategory = (category: string | number) => {
    if (typeof category === "string") {
      setSelectedCategory(category);
    }
  };

  // 정렬된 종목 리스트 API
  useEffect(() => {
    axios
      .get(
        `${process.env.REACT_APP_API_URL}/v1/stocks?order=${selectedCategory}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        if (res.status === 200) {
          const stockData = res.data;
          setList(stockData);
        } else if (res.status === 401) {
          nav("/login");
        }
      })
      .catch((e) => {
        nav("/error");
      });
  }, [selectedCategory]);

  return (
    <Container>
      <SearchContainer>
        <SearchBar onSelect={handleSelectStock} />
      </SearchContainer>
      <FilterContainer>
        <div style={{ fontFamily: "SCDream6", fontSize: "20px" }}>
          종목 리스트
        </div>
        <Dropdown dropList={category} onSelect={handleSelectedCategory} />
      </FilterContainer>
      <div>
        <StockDataList data={list} />
      </div>
    </Container>
  );
};

export default SearchStock;
