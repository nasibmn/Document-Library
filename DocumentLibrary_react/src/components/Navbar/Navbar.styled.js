import { createGlobalStyle } from "styled-components";

const NavbarStyle = createGlobalStyle`
.navbar{
    /* position: sticky; */
    background-color: white;
    height: 80px;
    box-shadow: rgba(0, 0, 0, 0.05) 0px 25px 20px -20px;
    padding: 0 50px;
    top: 0;
    .upload-doc{
        height: 50px;
        width: fit-content;
        border-radius: 10px;
        box-shadow: none;
        font-size: 15px;
        font-weight: 700;
        background-color: transparent;
        color: black;
        border: none;
        border-bottom: 2px solid black;
        &:hover{
            box-shadow: rgba(17, 12, 46, 0.15) 0px 28px 50px 0px;
        }
    }
    .modal{
        .modal-content{
            border-radius: 20px;
            background-color: rgba(255, 255, 255, 0.9);
            padding: 10px;
        }
        .modal-title{
            font-weight: 600;
            font-size: 20px;
        }
        input{
            box-shadow: none;
            border-radius: 10px;
            
        }
        .supports{
            font-size: 12px;
            margin-top: 5px;
        }
    }
    .modal-btn{
        background-color: white;
        color: black;
        border: none;
        border-bottom: .2px solid black;
        box-shadow: none;
        &:hover{
        border-bottom: 4px solid black;

        }
    }
    .navbar-brand{
        color: black;        
        font-size: 30px;
        font-weight: 600;
        text-shadow: rgba(0, 0, 0, 0.4) 0px 3px 9px;
        transition: all .1s ease;
        &:hover{
            font-weight: 700;

        }
    }
    @media only screen and (max-width: 768px)
    {
        display: flex;
        padding: 10px;
        justify-content: space-between;
        flex-direction: row;
        a{
            font-size: 1rem !important;
            font-weight: 700 !important;
        }
        .upload-doc{
        height: 40px;
        width: fit-content;
        border-radius: 10px;
        box-shadow: none;
        font-size: 12px;
        font-weight: 600;
        background-color: transparent;
        color: black;
        border: none;
        border-bottom: 2px solid black;
        &:hover{
            box-shadow: rgba(17, 12, 46, 0.15) 0px 28px 50px 0px;
        }
    }
}
}
`;

export default NavbarStyle;
