import React from "react";
import styled from "styled-components";

const Root = styled.div`
  width: 60%;
  margin: 10px auto;
`;

const About = styled.div`
  font-size: 20px;
  margin: 25px;
`;

export default function AboutPage() {
  return (
    <Root>
      <About>
        第一個 React 技術部落格，小小菜鳥，請各位多多指教!
        此部落格記載著，學習過程的心血，從完全不熟程式語言，到能自己創建一個部落格，是一個起始點！一步一腳印地，踏出程式大道～！
      </About>
    </Root>
  );
}
