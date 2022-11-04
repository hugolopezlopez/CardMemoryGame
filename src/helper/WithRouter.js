import { useNavigate, useParams } from 'react-router-dom';

export const withRouter = WrappedComponent => props => {
  const navigate = useNavigate();
  const params = useParams();
  return (
    <WrappedComponent
      {...{...props, match: {params}}}
      navigate={navigate}
    />
  );
};