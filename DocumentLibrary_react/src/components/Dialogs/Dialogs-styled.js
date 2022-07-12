import { createGlobalStyle } from "styled-components";

const DialogsStyle = createGlobalStyle`
.snackbar{
            display: flex;
            z-index: 99999;
            backdrop-filter: blur(2rem);
            border-radius: .5rem !important;
            width: fit-content !important;
            .snackbar-alert{
                border-radius: 0.5rem;
                border: none;
                ${({ isError }) =>
                  isError
                    ? "border-bottom: 1px solid red;box-shadow: rgba(255, 0, 0, 0.1) 0px 10px 50px;background-color: rgba(255, 0, 0, 0.3);"
                    : ""};
                ${({ isSuccess }) =>
                  isSuccess
                    ? "border-bottom: 1px solid green;box-shadow: rgba(0, 128, 0, 0.1) 0px 10px 50px;background-color: rgba(0, 128, 0, 0.3);"
                    : ""};
                display: flex;
                align-items: center;
                width: fit-content;
                font-size: 1.2rem;
            }
        }
`;

export default DialogsStyle;
