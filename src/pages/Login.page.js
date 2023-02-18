import { useState } from "react";

import { validateEmail } from '../utils/validateEmail';
import { PAGES } from '../constants';
import { Logo, FormRow, Modal } from '../components';
import Wrapper from '../styles/styled/Login.styled';
import users from "../data/data";

const [landing, , , ] = PAGES;

const Login = ({ setPage }) => {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);
  let nameError = false;
  let emailError = false;
  let passwordError = false;

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    setIsLoading(true);
    setIsError(false);
    setErrorMessages([]);

    const { email, password, name } = values;

    const user = users.find(userCheck => userCheck.email === email && userCheck.password === password && userCheck.name === name);

    if (!user) {
      setIsLoading(false);
      handleError('Invalid email or password');
      return;
    }

    localStorage.setItem('userData', JSON.stringify(user));

    setTimeout(() => {
      window.location.reload(false);
    }, 2000);
  };


  const handleError = (msg, setMethod) => {
    const messages = errorMessages;
    messages.push(msg);
    setErrorMessages(messages);
    setIsError(true);
  };

  const closeModal = () => {
    setIsError(false);
    setErrorMessages([]);
  };

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        {/* name field */}
        <FormRow
          error={nameError}
          type='text'
          name='name'
          value={values.name}
          handleChange={handleChange}
        />
        {/* email field */}
        <FormRow
          error={emailError}
          type='email'
          name='email'
          value={values.email}
          handleChange={handleChange}
        />
        {/* password field */}
        <FormRow
          error={passwordError}
          type='password'
          name='password'
          value={values.password}
          handleChange={handleChange}
        />
        <button type='submit' className='btn btn-block' disabled={isLoading}>
          {isLoading ? 'loading...' : 'Log In'}
        </button>
        <button className='btn btn-block btn-light mt' onClick={() => setPage(landing)}>
          Back
        </button>
      </form>
      {isError && (
        <Modal
          closeModal={closeModal}
          messages={errorMessages} />
      )}
    </Wrapper>
  );
};

export default Login;