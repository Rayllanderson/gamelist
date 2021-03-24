import styled from "styled-components";

export const GameContent = styled.div`
    max-width: 750px;
    animation: appearFromLeft 1s;
`;

export const Header = styled.div`
  a{
    font-size: 18px;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: var(--foreground);
    transition: color 0.2s;
    &:hover{
      color: #d1d1d1
    }
    svg {
      margin-right: 4px;
    }
  }
`

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
      width: 120px;
      height: 120px;
    }
    div {
      margin-left: 24px;
      strong {
        font-size: 36px;
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
        font-size: 34px;
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