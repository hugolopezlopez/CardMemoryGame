import { useNavigate } from 'react-router-dom';

export const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  return (
    <WrappedComponent
      {...props}
      navigate={navigate}
    />
  );
};