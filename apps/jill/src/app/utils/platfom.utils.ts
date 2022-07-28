export const isPlatformApple = (): boolean => {
  return /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent);
};

export const isPWA = (): boolean => {
  return window.matchMedia('(display-mode: standalone)').matches;
};

export const disableUserSelect = (): void => {
  document.querySelectorAll('html,body,#root').forEach((e: any) => {
    e?.classList?.add('user-select-none');
  });
};
