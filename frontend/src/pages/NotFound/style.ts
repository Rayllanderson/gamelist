import styled from "styled-components";

export const Container = styled.div`
margin-top: 150px;
span, strong{
  color:var(--foreground);
}

span {
  margin-left: 10px;
  font-size: 26px
}

strong {
  display:block;
  font-size: 32px;
  margin-left: 16px
}

.spin {
    -webkit-animation: icon-spin 6s infinite linear;
    animation: icon-spin 6s infinite linear;
}

@-webkit-keyframes icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}

@keyframes icon-spin {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg);
    }
    100% {
        -webkit-transform: rotate(359deg);
        transform: rotate(359deg);
    }
}
`