import styled from "styled-components";

export const Nav = styled.nav`
   background: rgba(56, 58, 89, 0.185);
   button{
      background: transparent;
      border:none;
      &:hover{
          background: var(--current-line)!important;
          color: var(--foreground);
      }
      &:active {
          background: var(--current-line)!important;
          color: var(--foreground);
      }
      &:focus{
          box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.025), 0 0 8px rgba(255, 121, 198, 0.07);
      }
      &::after {
        display: none;
      }
    }
`;