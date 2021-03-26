import styled from "styled-components";

export const Container = styled.div`
    max-width: 750px;
`
export const AccountContent = styled.div`
 animation: appearFromBottom 1s;
   margin-top: 80px;
    background: var(--current-line);
    padding: 20px;
    border-radius: 10px;
`
export const ButtonGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content:center;
  button {
    & + button{
      margin-left: 20px;
    }
  }
`;