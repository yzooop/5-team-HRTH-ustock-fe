import React, { useState } from "react";
import portfolioImg from "../../img/portfolioImg.png";
import styled from "styled-components";
import Button from "../Button/button";
import AddPortfolioModal from "../Modal/AddPortfolio";

const Box = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
// 스타일드 컴포넌트 정의
const PfCreateContainer = styled.div`
  text-align: center;
  margin: 20px;
  width: 330px;
  height: 320px;
  border-radius: 20px;
  background-color: rgb(97, 94, 252, 0.28);
  padding: 3rem 1.8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 100px;
`;

const PfCreateImage = styled.img`
  width: 112px;
  height: 112px;
`;

const PfCreateTitle = styled.h3`
  font-size: 23px;
  margin-top: 16px;
  margin-bottom: 20px;
  color: #555555;
`;

const PfCreateDescription = styled.p`
  font-size: 16px;
  line-height: 1.5;
  color: #888888;
`;

const PfCreate: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = () => {
    closeModal();
  };

  return (
    <Box>
      <PfCreateContainer>
        <PfCreateImage src={portfolioImg} alt="Portfolio" />
        <PfCreateTitle>투자내역을 관리하세요</PfCreateTitle>
        <PfCreateDescription>
          수익과 배당 확인, 백테스팅을 통한 <br />
          수익률 분석까지
        </PfCreateDescription>
      </PfCreateContainer>
      <div>
        <Button
          onClick={openModal}
          size="large"
          colorType="main"
          state="normal"
        >
          포트폴리오 만들기
        </Button>
      </div>
      <AddPortfolioModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        onConfirm={handleConfirm}
      />
    </Box>
  );
};

export default PfCreate;
