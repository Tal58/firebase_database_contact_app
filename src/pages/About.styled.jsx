import styled from 'styled-components';




export const CoveredDiv = styled.div`
display: flex;
flex-direction: column;
margin: auto;
padding: 3%;
font-size: 1.1rem;
background-color: #96b0f5;
height:95vh;

img{
    width: 25rem;
    margin: 1% auto;
}
@media only screen and (max-width: 700px) {
        
           img{
            width: 15rem
           }
        
    }
    @media only screen and (max-width: 300px) {
        
           img{
            width: 10rem
           }
        
    }

`
export const ButtonAbout = styled.button`
color: red;
width: 5rem;
margin: 0 auto 0 auto;
padding: 0.5%;
border-radius: 1rem;
font-size: 1.2rem;
:hover{
    color: white;
    background-color: red;
}
`