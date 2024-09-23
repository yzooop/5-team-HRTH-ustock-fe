import { useState, useEffect } from "react";
import GameHeader from "../../Component/Game/GameHeader";
import { RankDataProps, RankListProps } from "../../constants/interface";
import axios from "axios";
import RankList from "../../Component/Game/Rank/rankList";
import BentoBar from "../../Game/Main/BentoBar/bentoBar";
import swal from "sweetalert";

const Rank = () => {
  const [rankList, setRankList] = useState<RankDataProps[]>([]);

  // 랭킹리스트 불러오는 api
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/v1/game/ranking`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const list = res.data;
          setRankList(list);
        }
      });
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <GameHeader text={"명예의 전당"} />
      <RankList data={rankList} />
      <BentoBar />
    </div>
  );
};

export default Rank;
