import styled from 'styled-components';

const Wrapper = styled.section`



.vote {
  margin-top: 1rem;
width: 90vw;
background-color: black;
color: white;
}

button:hover {
  background-color: #0069d9;
}

button:disabled {
  opacity: 0.5;
  cursor: default;
}

button[disabled='disabled'] {
  opacity: 0.5;
  cursor: default;
}

li button[disabled='disabled'] {
  background-color: #ccc;
  color: #555;
  cursor: default;
}

`;
export default Wrapper;
