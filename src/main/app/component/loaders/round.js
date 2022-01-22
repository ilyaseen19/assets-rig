import { SpinnerCircular } from 'spinners-react';

function Loaders(props) {
  return (
      <SpinnerCircular size={"25px"}  enabled={props.loading} color="white" speed={60} />
  );
}

export default Loaders;
