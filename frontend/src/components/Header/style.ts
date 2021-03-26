import styled from "styled-components";

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