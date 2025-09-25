import styled from 'styled-components';

const FormGroup = styled.div`
  margin-bottom: 1rem;

  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: bold;
    color: ${(props) => props.theme.colors.text};
  }

  input,
  textarea,
  select {
    width: 100%;
    padding: 0.8rem;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-family: inherit;
  }

  textarea {
    resize: vertical;
  }

  select[multiple] {
    height: 15rem;
  }
`;

export default FormGroup;
