import styled from 'styled-components';

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  font-family: 'Lato', sans-serif;
  font-size: 15px;
  color: #2c2d30;

  a {
    color: inherit;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Content = styled.section`
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
`;

export {
  Wrapper,
  Content
};
