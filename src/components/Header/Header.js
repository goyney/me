import { useEffect, useState } from 'preact/hooks';
import cx from 'classnames';
import { route } from 'preact-router';
import Icon from '@mdi/react';
import { mdiChevronRight, mdiClose, mdiHome, mdiMenu } from '@mdi/js';

import useWindowSize from '../../hooks/useWindowSize';

import logoImageWebp from '../../assets/icons/favicon-48x48.webp';
import logoImagePng from '../../assets/icons/favicon-48x48.png';

import classes from './Header.scss';

const MENU_ITEMS = [
  { id: 'home', route: '/' },
  { id: 'about', route: '/' },
  { id: 'resume', route: '/' },
  { id: 'projects', route: '/' },
  { id: 'talks', route: '/' },
  { id: 'philanthropy', route: '/' },
  { id: 'contact', route: '/' },
  { id: 'blog', route: '/blog/' }
];

const Header = ({ activeSection, setActiveSection, showScroll }) => {
  const [ menuOpen, setMenuOpen ] = useState(false);
  const [ scrollPercent, setScrollPercent ] = useState(0);
  const windowSize = useWindowSize();

  useEffect(() => {
    const getScrollPercent = () => {
      const { body, documentElement } = document;
      const percent = (documentElement.scrollTop || body.scrollTop) / ((documentElement.scrollHeight || body.scrollHeight) - documentElement.clientHeight) * 100;
      setScrollPercent(percent.toFixed(2));
    };

    window.addEventListener('scroll', getScrollPercent);
    return () => window.removeEventListener('scroll', getScrollPercent);
  }, []);

  const isSelected = (id) => {
    if (typeof window !== 'undefined') {
      if (window.location.hash === '' && activeSection.id === id) {
        return true;
      }

      if (window.location.hash === `#${id}`) {
        return true;
      }
    }
  };

  const navHidden = windowSize.width <= 736 && !menuOpen;

  return (
    <header className={classes.header}>
      <div
        aria-hidden={windowSize.width > 736}
        className={classes.mobile}
        role='presentation'
      >
        <p>
          <em onClick={() => route('/')}>
            <picture className={classes.logo}>
              <source srcset={logoImageWebp} type='image/webp' />
              <source srcset={logoImagePng} type='image/png' />
              <img
                alt='Irigoyen.dev'
                height={24}
                src={logoImagePng}
                width={24}
              />
            </picture>
            irigoyen.dev
          </em>
          <Icon className={classes.chevron} path={mdiChevronRight} size={1} />
          {activeSection.id === 'home' ? <Icon path={mdiHome} size={1} /> : activeSection.id}
        </p>
        <button
          aria-label='Menu'
          className={cx({
            [classes.open]: menuOpen
          })}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <Icon path={menuOpen ? mdiClose : mdiMenu} size={1} />
        </button>
      </div>
      <nav
        aria-hidden={navHidden}
        className={cx({
          [classes.active]: menuOpen
        })}
      >
        {MENU_ITEMS.map(({ id, route: itemRoute }) => {
          return (
            <button
              aria-label={id}
              className={cx(classes[id], {
                [classes.current]: isSelected(id)
              })}
              key={id}
              onClick={() => {
                setMenuOpen(false);
                route(`${itemRoute}`);
                setActiveSection({ id, scrollTo: itemRoute === '/' });

                if (itemRoute !== '/') {
                  window.scrollTo(0, 0);
                }
              }}
              tabIndex={navHidden ? -1 : undefined}
            >
              {id === 'home' ? (
                <em className={classes.home}>
                  <span className={classes['desktop-home']}>
                    <picture className={classes.logo}>
                      <source srcset={logoImageWebp} type='image/webp' />
                      <source srcset={logoImagePng} type='image/png' />
                      <img
                        alt='Irigoyen.dev'
                        height={24}
                        src={logoImagePng}
                        width={24}
                      />
                    </picture>
                    irigoyen.dev
                  </span>
                  <span className={classes['mobile-home']}>
                    <Icon path={mdiHome} size={1} />
                  </span>
                </em>
              ) : id}
            </button>
          );
        })}
      </nav>
      <div className={classes.progress}>
        <div
          style={{
            width: showScroll ? `${scrollPercent}%` : 0
          }}
        />
      </div>
    </header>
  );
};

export default Header;
