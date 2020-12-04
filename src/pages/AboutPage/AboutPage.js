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
        歡迎大家一同寫技術文章。
      </About>
    </Root>
  );
}
