import { createGlobalStyle } from "styled-components";

const DocumentStyle = createGlobalStyle`
.card{
    display: flex;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
    border-radius: 1rem;
    transition: all .3s ease;
    &:hover{
        box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    .embedContainer{
        position: relative;
        height: 300px;
    .card-img-top{
        position: absolute;
        top: 10px;
        height: 300px;
        border-radius: 5px;
        box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, 
        rgba(0, 0, 0, 0.09) 0px 2px 1px, 
        rgba(0, 0, 0, 0.04) 0px 1px 1px
    }
}
    .card-body{
        display: flex;
        flex-direction: column;
        gap: 1rem;
        .card-title{
            font-weight: 700;
            font-size: 1.3rem;
            word-wrap: break-word;
            line-height: 30px;
            text-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 4px 10px;
            padding: 7px;
        }
        .card-text{
            /* width: 100%; */
            font-size: 0.7rem;
            gap: 1rem;
            display: flex;
            justify-content: space-between;
            align-items: center;
            color: gray;
            border-top: 1px solid rgba(0, 0, 0, 0.03);
            text-shadow: rgba(17, 17, 26, 0.1) 0px 2px 5px, rgba(17, 17, 26, 0.1) 0px 4px 10px, rgba(17, 17, 26, 0.1) 0px 8px 20px;
            padding-top: 1rem;
            .icons{
                height: fit-content;
                width: 1.7rem;
                box-shadow: rgba(17, 17, 26, 0.1) 0px 2px 5px, rgba(17, 17, 26, 0.1) 0px 4px 10px, rgba(17, 17, 26, 0.1) 0px 8px 20px;
            }
        }
        button{
            background-color: transparent;
            transition: all .3s ease;
            box-shadow: none;
            color: black;
            border: none;
            box-shadow: rgba(17, 17, 26, 0.1) 0px 2px 5px, rgba(17, 17, 26, 0.1) 0px 4px 10px, rgba(17, 17, 26, 0.1) 0px 8px 20px;
            border-radius: 1rem;
            &:hover{
                background-color: rgba(0, 0, 0, 0.25);
                color: white;
                 box-shadow: none;
            }
        }
    }
}

`;

export default DocumentStyle;
