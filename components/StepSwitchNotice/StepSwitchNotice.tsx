import { useEffect, useRef } from 'react';

import style from '../../styles/KonfiguratorPage.module.css';

type StepSwitchNoticeProps = {
  stepKey?: string;
};

export default function StepSwitchNotice({ stepKey }: StepSwitchNoticeProps) {
  const switcherRef = useRef<HTMLDivElement | null>(null);

  // show step switch noticer
  useEffect(() => {
    const el = switcherRef.current;
    if (!el) return;

    el.classList.remove(style.switcher);
    // force reflow so the browser restarts the animation
    void el.offsetWidth;
    el.classList.add(style.switcher);
  }, [stepKey]);

  return <div className={style.switcher} ref={switcherRef}></div>;
}
