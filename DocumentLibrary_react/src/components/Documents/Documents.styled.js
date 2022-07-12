import { createGlobalStyle } from "styled-components";

const DocumentsStyle = createGlobalStyle`
.row{
    margin-top: 20px;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    flex-wrap: wrap;
    width: 100%;
    row-gap: 30px;
}
`;

export default DocumentsStyle;
