import SwaggerUI from "swagger-ui-react";
import "swagger-ui-react/swagger-ui.css";
import './styles.css'

const SwaggerComponent = () => {
  return <SwaggerUI url="/apis.json" />;
};

export default SwaggerComponent;