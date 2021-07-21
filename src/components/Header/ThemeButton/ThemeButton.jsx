import React, { useContext } from 'react';
import { themeContext } from '../../App';
import Fab from '@material-ui/core/Fab';
import Zoom from '@material-ui/core/Zoom';
import WbSunnyIcon from '@material-ui/icons/WbSunny';
import Brightness2Icon from '@material-ui/icons/Brightness2';

function ThemeButton() {
  const { darkTheme, setDarkTheme } = useContext(themeContext);

  let changeThemeBtnStyle = {
    position: 'absolute',
    top: '10px',
    right: '50px',
    backgroundColor: darkTheme ? '#30475E' : 'white',
  };

  return (
    <Fab
      onClick={() => {
        setDarkTheme(!darkTheme);
        sessionStorage.setItem('darkTheme', !darkTheme)
      }}
      style={changeThemeBtnStyle}
    >
      <Zoom in={darkTheme} timeout={200}>
        <WbSunnyIcon style={{ color: '#DDDDDD', display: 'inline' }} />
      </Zoom>
      <Zoom in={!darkTheme} timeout={200}>
        <Brightness2Icon style={{ position: 'absolute', display: 'inline' }} />
      </Zoom>
    </Fab>
  );
}

export default ThemeButton;
