import { css } from "-/src/utils/StyledComponents";

export default css`
  /* width */
  ::-webkit-scrollbar {
    width: 1rem;

    border-radius: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: rgba(151, 70, 255, 0.5);
    border-radius: 5px;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: rgba(151, 70, 255, 0.7);
  }
`;
