import { createGlobalStyle } from "styled-components";

const MainStyle = createGlobalStyle`
.container{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 80px;
    
    @media only screen and (max-width: 768px)
    {
        .card{
            /* height: 500px; */
            margin-bottom: 20px;
            border-bottom: 3px solid black;
        }
}
}
`;

export default MainStyle;
