export const isPlatformApple = (): boolean => {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
};

export const isPlatformIOS = () => {
  return (
    [
      'iPad Simulator',
      'iPhone Simulator',
      'iPod Simulator',
      'iPad',
      'iPhone',
      'iPod'
    ].includes(navigator.userAgent) ||
    (navigator.userAgent.includes('Mac') && 'ontouchend' in document)
  );
};

export const isPWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches;
};

export const disableUserSelect = (): void => {
  document.querySelectorAll('html,body,#root').forEach((e: any) => {
    e?.classList?.add('user-select-none');
  });
};
