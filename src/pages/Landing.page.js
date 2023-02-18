import { PAGES } from '../constants';
// import users from '../data/data';
// // import main-img from '../assets/images/main.svg';
import Wrapper from '../styles/styled/Landing.styled';
import { Logo } from '../components';

const [, login, , ] = PAGES;

const Landing = ({ setPage }) => {
  return (
    <div className='background'>
      <Wrapper>
        <nav>
          <Logo />
        </nav>
        <div className='container page'>
          <div className='info'>
            <h1>
              voting app
            </h1>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sequi laboriosam eaque quisquam dicta, ea natus earum commodi molestiae autem soluta fuga illum enim, eum esse!
            </p>
            <button onClick={() => setPage(login)} className='btn btn-hero'>
              Log In
            </button>
          </div>
          {/* <img src={main-img} alt='love finding app' className='img main-img' /> */}
        </div>
      </Wrapper>
    </div>
  );
};

export default Landing;
