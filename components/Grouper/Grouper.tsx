import { GroupKey, Step } from '@/types/Configurator';
import style from './Grouper.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfiguration } from '@/context/ConfigurationContext';
import { faChevronLeft, faChevronRight, faMedal } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

export default function Grouper() {
  const {
    configuration,
    currentStep,
    currentGroup,
    setCurrentGroup,
    setCurrentStep,
    getStepsForGroup,
  } = useConfiguration();

  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);
  const stepChangeManuallyTriggered = useRef(false);

  // scroll step size
  const stepSize = 170;

  const stepsHolder = useRef<HTMLDivElement>(null);

  // to handle arrows on windowResize
  useEffect(() => {
    const handleResize = () => {
      const scrollWidth = stepsHolder?.current?.scrollWidth;
      const actualWidth = stepsHolder?.current?.clientWidth;
      const scrollLeft = Number(stepsHolder!.current?.scrollLeft);

      if (scrollLeft === 0 && showLeftArrow) {
        setShowLeftArrow(false);
      }

      if (actualWidth! < scrollWidth!) {
        //const scrollableDepth = Math.abs(Number(scrollWidth)-Number(actualWidth));
        //setScrollableDepth(scrollableDepth);
        if (!showRightArrow) {
          setShowRightArrow(true);
        }
      } else {
        if (showRightArrow) {
          setShowRightArrow(false);
        }
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [showRightArrow]);

  // to detect arrows on page load
  useEffect(() => {
    const handleResize = () => {
      const scrollWidth = stepsHolder?.current?.scrollWidth;
      const actualWidth = stepsHolder?.current?.clientWidth;
      const scrollLeft = Number(stepsHolder!.current?.scrollLeft);

      if (scrollLeft === 0) {
        setShowLeftArrow(false);
      }

      if (actualWidth! < scrollWidth!) {
        if (!showRightArrow) {
          setShowRightArrow(true);
        }
      } else {
        if (showRightArrow) {
          setShowRightArrow(false);
        }
      }
    };
    handleResize();
  }, []);

  const selectGroup = (group: Step) => {
    stepChangeManuallyTriggered.current = true;
    setTimeout(() => {
      setCurrentGroup(group.key as GroupKey);
      const newSteps = getStepsForGroup(group.key as GroupKey);
      setCurrentStep(newSteps[0]);
    }, 100);
  };

  const handleRightArrowClick = () => {
    const scrollWidth = stepsHolder?.current?.scrollWidth;
    const actualWidth = stepsHolder?.current?.clientWidth;
    const currentScrollLeft = stepsHolder.current!.scrollLeft;
    const scrollableDepth =
      Math.abs(Number(scrollWidth) - Number(actualWidth)) - Number(currentScrollLeft);

    let newScrollLeft;
    // no more space to scroll
    if (scrollableDepth < 1) {
      newScrollLeft = 0;
      setShowRightArrow(false);
    }

    // if remaining scroll space is less than the stepSize, scroll the remaining space
    if (scrollableDepth < stepSize) {
      newScrollLeft = currentScrollLeft + scrollableDepth;
      stepsHolder!.current!.scrollTo({
        left: currentScrollLeft + scrollableDepth,
        behavior: 'smooth',
      });
    }

    // if more space than the stepSize, scroll one step only
    if (scrollableDepth > stepSize) {
      newScrollLeft = currentScrollLeft + stepSize;
      stepsHolder!.current!.scrollTo({ left: currentScrollLeft + stepSize, behavior: 'smooth' });
    }

    // when there is any scroll to the left, show left arrow
    if (Number(newScrollLeft) > 1) {
      setShowLeftArrow(true);
    }
    if (Number(newScrollLeft) + Number(actualWidth) === scrollWidth) {
      setShowRightArrow(false);
    }
  };

  const handleLeftArrowClick = () => {
    const scrollWidth = stepsHolder?.current?.scrollWidth;
    const actualWidth = stepsHolder?.current?.clientWidth;
    const currentScrollLeft = stepsHolder.current!.scrollLeft;

    let newScrollLeft;
    // if already at the start
    if (currentScrollLeft <= 0) {
      newScrollLeft = 0;
      setShowLeftArrow(false);
      return;
    }

    // if remaining scroll space to the left is less than stepSize
    if (currentScrollLeft < stepSize) {
      newScrollLeft = 0;
      stepsHolder!.current!.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      newScrollLeft = currentScrollLeft - stepSize;
      stepsHolder!.current!.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
    }

    // If after scrolling we're at the start, hide left arrow
    if (newScrollLeft <= 0) {
      setShowLeftArrow(false);
    }

    // If we move away from the end, show right arrow
    if (Number(newScrollLeft) + Number(actualWidth) < Number(scrollWidth)) {
      setShowRightArrow(true);
    }
  };

  useEffect(() => {
    if (stepChangeManuallyTriggered.current) {
      // reset the flag and skip scroll
      stepChangeManuallyTriggered.current = false;
      return;
    }

    if (showRightArrow) {
      handleRightArrowClick();
    }
  }, [currentStep]);

  const allGroups: GroupKey[] = ['basis', 'farben', 'verglasung', 'zusatze', 'sonnenschutz'];
  const visibleGroups: GroupKey[] =
    configuration.basis.cover.key === 'nein'
      ? allGroups.filter((g) => g !== 'sonnenschutz')
      : allGroups;

  const groups: Step[] = visibleGroups.map((g) => {
    return {
      key: g,
      name: g.toUpperCase(),
      icon: faMedal,
    };
  });

  const stepClass = (key: string) =>
    currentGroup === key ? style.selected_complete : style.complete;

  return (
    <>
      <div className={style.stepWrapper}>
        <div className={style.config_steps} ref={stepsHolder}>
          {groups.map((st, index) => (
            <button key={index} className={stepClass(st.key)} onClick={() => selectGroup(st)}>
              <p>{st.name}</p>
            </button>
          ))}
        </div>
        {showRightArrow && (
          <div id={style.rightArrow}>
            <span></span>
            <button onClick={handleRightArrowClick}>
              <FontAwesomeIcon icon={faChevronRight} color="black" />
            </button>
          </div>
        )}
        {showLeftArrow && (
          <div id={style.leftArrow}>
            <span></span>
            <button onClick={handleLeftArrowClick}>
              <FontAwesomeIcon icon={faChevronLeft} color="black" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
