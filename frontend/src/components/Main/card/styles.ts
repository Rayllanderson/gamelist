import styled from 'styled-components'

export const CardGame = styled.div`
  margin-top: 16px;
  max-width: 800px;
  a {
    background: var(--current-line);
    border-radius: 5px;
    width: 100%;
    padding: 24px;
    display: block;
    text-decoration: none;
    display: flex;
    align-items: center;
    transition: transform 0.2s;
    &:hover {
      transform: translateX(5px);
    }
    & + a {
      margin-top: 16px;
    }
    img {
      width: 75px;
      height: 75px;
    }
    div {
      margin: 0 16px;
      flex: 1;
      strong {
        font-size: 1.5rem;
        color: var(--foreground);
      }
       p {
        font-size: 18px;
        color: #a8a8b3;
        margin-top: 4px;
      }
    }
    svg {
      margin-left: auto;
      color: #cbcbd6;
    }
  }
`;