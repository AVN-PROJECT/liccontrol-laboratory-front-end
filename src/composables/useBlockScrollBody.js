export const useLockBodyScroll = () => {
  const disableBodyScroll = () => {
    const body = document.body;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    console.log('Saved scroll position:', scrollY);

    document.documentElement.style.setProperty('--scroll-y', `${scrollY}px`);

    const storedScrollY = document.documentElement.style.getPropertyValue('--scroll-y');

    if (storedScrollY !== null && storedScrollY !== '') {
      body.style.width = '100%';
      body.style.position = 'fixed';
      body.style.top = `-${storedScrollY}`;
    }
  };

  const enableBodyScroll = () => {
    const body = document.body;
    const scrollY = body.style.top;
    body.style.width = '';
    body.style.position = '';
    body.style.top = '';
    if (!isNaN(parseInt(scrollY, 10))) {
      window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
    }
  };

  const saveScrollPositionOnScroll = () => {
    document.documentElement.style.setProperty('--scroll-y', `${window.scrollY}px`);
  };

  return { disableBodyScroll, enableBodyScroll, saveScrollPositionOnScroll };
};
