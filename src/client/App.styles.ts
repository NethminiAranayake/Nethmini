import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';
import { AppBar, Typography, withStyles } from '@material-ui/core';
import DialogTitle from '@material-ui/core/DialogTitle';

export const Wrapper = styled.div`
  margin: 40px;
`;

export const StyledButton = withStyles({
  label: {
    flexDirection: "column"
  }
  
})(IconButton);

export const StyledAppBar = styled(AppBar)`
  background : white;
  margin-bottom: 15px;
  border-radius: 20px;
`;
export const DialogImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
export const DialogHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const StyledDialogTitle = styled(DialogTitle)`
  padding-left: 0;
  padding-right: 0;
`;
export const DialogText = styled.p`
  font-size: 16px;
`;
export const DialogDescription = styled(DialogText)``;

export const DialogCategory = styled(DialogText)`
  font-size: 18px;
  text-decoration: capitalize;
`;

export const DialogPrice = styled(DialogText)`
  font-weight: bold;
  font-size: 18px;
`;
export const HeaderTypography = withStyles({
  root: {
    color: "black",
    WebkitTextStroke: "0.5px darkgoldenrod",
    fontStyle: "italic"
  }
})(Typography);