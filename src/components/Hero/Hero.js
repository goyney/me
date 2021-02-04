import Icon from '@mdi/react';
import { mdiArrowDownCircleOutline, mdiGithub, mdiLinkedin } from '@mdi/js';

import useDisplayed from '../../hooks/useDisplayed';

import classes from './Hero.scss';

const Hero = ({ reportVisibility }) => {
  const { ref } = useDisplayed({ id: 'home', reportVisibility });

  return (
    <section
      className={classes.root}
      id='home'
      ref={ref}
    >
      <div className={classes.container}>
        <div className={classes.hero}>
          <h1>I'm Michael Irigoyen.</h1>
          <h2>I am a Chicago-based <em>software engineer</em> with a passion for <em>front-end development</em> and <em>user experience</em>. <a href='#about'>Start scrolling</a> to learn more.</h2>
          <div className={classes.social}>
            <a aria-label='GitHub Profile' href='https://github.com/goyney'>
              <Icon path={mdiGithub} size={1.5} />
            </a>
            <a aria-label='LinkedIn Profile' href='https://www.linkedin.com/in/michael-irigoyen/'>
              <Icon path={mdiLinkedin} size={1.5} />
            </a>
          </div>
        </div>
        <a className={classes.scroll} href='#about'>
          <Icon path={mdiArrowDownCircleOutline} size={1.5} />
          <span>Scroll Down</span>
        </a>
      </div>
      <div className={classes.background} />
    </section>
  );
};

export default Hero;