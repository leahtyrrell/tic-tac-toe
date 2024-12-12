import { useState } from 'react';

function Box({ status, onClick }) {
  const [isVisible, setIsVisible] = useState(false);

    return (
      <div className="box" onClick={onClick}>
        {status && <img src={status} alt="icon" className="icon" />}
      </div>
    );
  }
  
  export default Box;