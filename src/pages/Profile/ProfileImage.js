import styled, {css} from 'styled-components';

 const ProfileImage = styled.div`
    width: 200px;
    height: 200px;
    margin: 40px;
    @media (max-width: 990px){
        margin: 20px;
        width: 120px;
        height: 120px;
    }
    ${({mini}) => mini && css`
        width: 50px;
        height: 50px;
        margin: 5px;
        @media (max-width: 990px){
            margin: 5px;
            width: 30px;
            height: 50px;
        } 
        
    `};
    background: no-repeat center/170% url(/img/profileImage.jpeg);
    border-radius: 100%;

`;

export default ProfileImage;