import styled from 'styled-components';

const Wrapper = styled.div`
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

const Aside = styled.aside`
  flex: 0 0 415px;
  border-left: 1px solid #e8e8e8;

  h2, h3 {
    padding: 19px 12px;
  }

  h2 {
    font-size: 18px;
    font-weight: bold;
    background: #f9f9f9;
  }

  h3 {
    font-size: 18px;
    border-top: 1px solid #e8e8e8;
  }

  p {
    padding: 0 12px 19px 12px;
    line-height:1.46668;
  }

  ul.highlights, ul.list-users {
    padding: 0 12px 19px 12px;

    li {
      padding: 0 0 5px 0;

      &:before {
        content: "⚫";
        color: #717274;
        margin: 0 10px 0 0;
      }
    }
  }

  ul.list-users {
    color: #2c2d30;
    font-weight: 700;
    list-style: none;

    li {
      padding: 0;

      &:before {
        content: none;
      }
    }

    a {
      padding: 5px;
      margin-left: -5px;
      display: block;

      &:hover {
        padding: 4px;
        background-color: #eaf5fc;
        border: 1px solid #cbe7f7;
        border-radius: 3px;
        text-decoration: none;
      }
    }

    .sb-avatar {
      margin: 0 5px 0 0;
    }
  }
`;

const Header = styled.header`
  display: flex;
  flex-direction: row;
  height: 45px;
  border-bottom: 1px solid #e8e8e8;
  padding: 10px 0px 10px 20px;

  h1 {
    font-size: 18px;
    font-weight: bold;
    padding: 0 0 5px 0;

    &:before {
      content: '# ';
    }
  }

  ul {
    opacity: 0.6;
    padding: 5px 0;
    font-size: 13px;

    li {
      display: inline;
      border-left: 2px solid #e8e8e8;
      padding: 0 5px;

      &:first-child {
        border: none;
        padding-left: 0;
      }
    }
  }
`;

const Footer = styled.footer`
  height: 40px;
  border-top: 1px solid #e8e8e8;
  line-height: 40px;

  a {
    color: #4C9689;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export {
  Wrapper,
  Content,
  Aside,
  Header,
  Footer
};
