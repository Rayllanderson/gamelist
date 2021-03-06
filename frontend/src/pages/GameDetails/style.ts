import styled from "styled-components";

export const GameContent = styled.div`
    max-width: 750px;
    animation: appearFromLeft 1s;
`;

export const Container = styled.div `
    margin-top: 80px;
    background: var(--current-line);
    padding: 20px;
    border-radius: 10px;
`

export const GameInfo = styled.div`
  
  header {
    display: flex;
    align-items: center;
    img {
      width: 100px;
      height: 100px;
    }
    div {
      margin-left: 24px;
      strong {
        font-size: 32px;
        color: var(--foreground);
      }
      p {
        font-size: 18px;
        color: var(--foreground);
        margin-top: 4px;
      }
    }
  }
  ul {
    display: flex;
    list-style: none;
    margin-top: 40px;
    li {
      & + li {
        margin-left: 10%;
      }
      strong {
        display: block;
        font-size: 30px;
        color: #dddd;
      }
      span {
        display: block;
        margin-bottom: 4px;
        color: #eaeaea;
      }
    }
  }

  @media(max-width: 768px) {
     header {
      div {
        strong{
          font-size: 42px;
        }
      }
    }
    
    ul {
      display: block;
      li {
        & + li {
          margin-top: 5%;
          margin-left: 0;
        }
        strong {
          font-size: 42px;
        }
         span {
          font-size: 20px;
         }
      }
    }
  }
`;

export const ButtonGroup = styled.div `
  margin-top: 60px;
  display: flex;
  align-items: center;
  button {
    & + button{
      margin-left: 20px;
    }
  }
`;