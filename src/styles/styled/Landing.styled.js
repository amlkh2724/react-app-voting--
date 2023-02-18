import styled from 'styled-components';

const Wrapper = styled.main`

button{
  margin-top: 1rem;
  width: 100%;
  height: 3rem;
}
*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.container{
  position: relative;
  position: absolute;
  top: 50%;
  left: 50%;
  text-align: center;
  line-height: 2.5rem;
  transform: translate(-25%, -40%);
}

  nav {

    display: flex;
    align-items: center;
  }
  .page {
    min-height: calc(100vh - var(--nav-height));
    display: grid;
    align-items: center;
    margin-top: -3rem;
  }
  h1 {
    font-weight: 700;
    span {
      color: var(--red-dark);
    }
  }
  p {
    color: var(--grey-600);
  }
  .main-img {
    display: none;
  }
  @media (min-width: 992px) {
    .page {
      grid-template-columns: 1fr 1fr;
      column-gap: 3rem;
    }
    .main-img {
      display: none;
    }
  }
`;
export default Wrapper;
