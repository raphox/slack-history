import styled from 'styled-components';

const Header = styled.section`
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

const Aside = styled.section`
  flex: 0 1 415px;
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
      line-height: 20px;
    }
  }
`;

const AsideMenu = Aside.extend`
  flex: 0 0 220px;
  background-color: #4D394B;
  color: #cac4c9;
  border: none;

  h1 {
    font-size: 18px;
    font-weight: bold;
    padding: 10px;
    margin-bottom: 10px;
    color: #fff;

    sub {
      display: block;
      font-size: 14px;
      font-weight: normal;
      opacity: 0.6;
      padding: 5px 0;

      &:before {
        content: "⚫ ";
        color: #4C9689;
      }
    }
  }

  .title, a {
    padding: 0 12px 5px 15px;
  }

  a {
    display: block;

    &:hover {
      background: #3E313C;
      text-decoration: none;
    }

    &:active,
    &.active {
      background: #4C9689;
      color: #fff !important;
    }
  }

  ol > li {
    line-height: 26px;
  }

  dl {
    line-height: 26px;

    dd {
      font-style: italic;
      font-size: 14px;
      line-height: 14px;
      opacity: 0.6;
    }

    dt:before {
      content: '# ';
    }
  }
`;

const Search = Aside.extend`
  position: relative;

  svg {
    position: absolute;
    top: 12px;
    left: 10px;
  }

  input {
    padding: 2px 12px 2px 30px;
    display: flex;
    height: 35px;
    width: 365px;
    border-radius: 3px;
    border: 1px solid #a0a0a2;
    font-family: 'Font Awesome 5 Free', 'Lato', sans-serif;
  }
`;

const Article = styled.section`
  flex-flow: row wrap;
  flex-grow: 1;

  a {
    color: #0576b9;
  }

  code {
    font-family: Monaco, Menlo, Consolas, "Courier New", monospace!important;
    font-size: 12px;
    line-height: 12px;
    color: #d72b3f;
    background-color: #f7f7f9;
    border: 1px solid #e1e1e8;
    padding: 2px 3px 1px;
  }

  pre {
    color: #333;
    display: block;
    padding: 8px;
    margin: 5px 0;
    font-size: 12px;
    line-height: 18px;
    background-color: #f5f5f5;
    border: 1px solid #e1e1e8;
    border-radius: 3px;
    font-family: Monaco,Menlo,Consolas,"Courier New",monospace!important;
  }

  ul.list {
    margin: 12px 0 45px 0;

    li.list_item.message {
      font-size: 15px;
      padding: 6px 20px 6px 6px;

      &:hover {
        background-color: #f5f5f5;
      }

      .gutter {
        width: 50px;
        padding-right: 8px;
        float: left;
        text-align: right;

        .sb-avatar {
          line-height: 36px;
        }
      }

      .content {
        .content_header {
          font-weight: bold;

          a { color: #2c2d30; }
        }
        .body {
          margin: 4px 0 -4px 58px;
          line-height:1.46668;
          display: block;
        }
      }
    }
  }
`;

const Footer = styled.section`
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
  Header,
  Article,
  Aside,
  Search,
  AsideMenu,
  Footer
};
