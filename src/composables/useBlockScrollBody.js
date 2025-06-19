export const useLockBodyScroll = () => {
  const disableBodyScroll = () => {
    const scrollY = document.documentElement.style.getPropertyValue('--scroll-y');
    const body = document.body;
    body.style.width = '100%';
    body.style.position = 'fixed';
    body.style.top = `-${scrollY}`;
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
