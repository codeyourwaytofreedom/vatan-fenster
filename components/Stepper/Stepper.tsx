import { Config, Step } from '@/types/Configurator';
import style from './Stepper.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';

export default function Stepper() {
  const { orderDetailsReady } = useOrderDetailsReady();
  const stepClass = (step: Step) => {
    const currentlySelected = step.key === currentStep?.key;
    const completed = Boolean(configuration[step.key as keyof Config]);
    const stepIndex = steps.findIndex((st) => st.key == step.key);
    // selected_complete
    // selected_next
    // complete
    // inactive
    if (orderDetailsReady) {
      if (currentlySelected) {
        return style.selected_complete;
      }
      return style.complete;
    }
    if (currentlySelected) {
      if (completed) {
        return style.selected_complete;
      }
      return style.selected_next;
    }
    if (stepIndex !== 0) {
      const previousStepKey = steps[stepIndex - 1].key;
      const previousStepComplete = Boolean(configuration[previousStepKey as keyof Config]);
      if (previousStepComplete && !completed && !currentlySelected) {
        return style.next;
      }
      if (previousStepComplete && !completed && currentlySelected) {
        return style.selected_next;
      }
    }
    if (completed && currentlySelected) {
      return style.selected_complete;
    }
    if (completed && !currentlySelected) {
      return style.complete;
    }
    return style.inactive;
  };
  const {
    configuration,
    currentStep,
    previousStep,
    previousGroup,
    currentStepGroup: steps,
    setCurrentStep,
    setCurrentGroup,
    getStepsForGroup,
  } = useConfiguration();

  const currentStepIndex = steps.findIndex((st) => st.key === currentStep?.key);
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);

  const isFirstStepInBasis = currentStep?.key === 'material';

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

  const selectStep = (step: Step) => {
    stepChangeManuallyTriggered.current = true;
    setTimeout(() => {
      setCurrentStep(step);
    }, 100);
  };

  const goToPreviousStep = () => {
    stepChangeManuallyTriggered.current = true;
    if (showLeftArrow) {
      handleLeftArrowClick();
    }
    if (previousStep) {
      setTimeout(() => {
        setCurrentStep(previousStep);
      }, 100);
    }
    if (!previousStep && previousGroup) {
      const previousGroupSteps = getStepsForGroup(previousGroup);
      const lastStepInGroup = previousGroupSteps[previousGroupSteps.length - 1];
      setTimeout(() => {
        setCurrentGroup(previousGroup);
        setCurrentStep(lastStepInGroup);
      }, 100);
    }
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

    if (currentStepIndex < 2) return;

    if (showRightArrow) {
      handleRightArrowClick();
    }
  }, [currentStep]);

  return (
    <>
      <div
        className={
          style.stepWrapper
        } /* style={{paddingRight: showRightArrow ? 30 : 0, paddingLeft: showLeftArrow ? 30 : 0}} */
      >
        <div className={style.config_steps} ref={stepsHolder}>
          {steps.map((st, index) => (
            <button key={index} className={stepClass(st)} onClick={() => selectStep(st)}>
              <FontAwesomeIcon
                icon={st.icon}
                color="black"
                beatFade={stepClass(st).includes('next')}
              />
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
        <button
          style={{ visibility: !isFirstStepInBasis ? 'visible' : 'hidden' }}
          className={style.previousStep}
          onClick={goToPreviousStep}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
          <FontAwesomeIcon icon={faChevronLeft} />
          <FontAwesomeIcon icon={faChevronLeft} />
          &nbsp; Vorheriger Schritt
        </button>
      </div>
    </>
  );
}
