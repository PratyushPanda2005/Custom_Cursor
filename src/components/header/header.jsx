import { forwardRef } from 'react';
import Magnetic from '../magnetic/magnetic';

const Header = forwardRef(function index(props, ref) {
  return (
    <div className="header">
        <Magnetic>
          <div className="burger">
            <div ref={ref} className="bounds"></div>
          </div>
        </Magnetic>
    </div>
  )}
)

export default Header