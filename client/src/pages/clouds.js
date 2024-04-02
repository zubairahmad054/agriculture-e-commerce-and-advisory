
import React, { Children } from 'react';
import ReactPlayer from 'react-player';

export default function Background(props) {
  if(props.choice=='partially cloudy'){
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ReactPlayer
          url='https://youtu.be/M00tNQtU13w'
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      </div>
    );
  }
  else if(props.choice=='partially cloudy'){
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ReactPlayer
          url='https://youtu.be/M00tNQtU13w'
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      </div>
    );
  }
  else if(props.choice=='Sunny'){
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ReactPlayer
          url='https://youtu.be/dzn5ml4V2VQ'
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      </div>
    );
  }
  else if(props.choice=='Rai'){
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ReactPlayer
          url='https://youtu.be/JuytL3Y4mF4'
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      </div>
    );
  }

  else if(props.choice=='Rain'){
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ReactPlayer
          url='https://youtu.be/JuytL3Y4mF4'
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      </div>
    );
  }
  else if(props.choice=='Clear'){
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ReactPlayer
          url='https://youtu.be/joQ42CYhtZw'
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      </div>
    );
  }
  else {
    return (
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
        <ReactPlayer
          url='https://youtu.be/joQ42CYhtZw'
          playing={true}
          loop={true}
          muted={true}
          width='100%'
          height='100%'
        />
      </div>
    );
  }
}
