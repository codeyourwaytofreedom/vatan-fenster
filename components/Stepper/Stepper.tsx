import { Config, Step } from '@/types/Configurator';
import style from './Stepper.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons';
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
    currentStepGroup: steps,
    setCurrentStep,
  } = useConfiguration();

  const handleSetStep = (step: Step) => {
    setTimeout(() => {
      setCurrentStep(step);
    }, 100);
  };

  const currentStepIndex = steps.findIndex((st) => st.key === currentStep?.key);
  const isFirstStep = currentStepIndex === 0;
  const [showRightArrow, setShowRightArrow] = useState<boolean>(false);
  const [showLeftArrow, setShowLeftArrow] = useState<boolean>(false);

  //const [scrollableDepth, setScrollableDepth] = useState<number>(0);

  const stepsHolder = useRef<HTMLDivElement>(null);

  const goToPreviousStep = () => {
    setCurrentStep(steps[currentStepIndex - 1]);
  };

  // to handle arrows on windowResize
  useEffect(() => {
    const handleResize = () => {
      const scrollWidth = stepsHolder?.current?.scrollWidth;
      const actualWidth = stepsHolder?.current?.clientWidth;
      const scrollLeft = Number(stepsHolder!.current?.scrollLeft);

      if (scrollLeft === 0 && showLeftArrow) {
        console.log('scrollLeft: ', scrollLeft);
        setShowLeftArrow(false);
      }

      if (actualWidth! < scrollWidth!) {
        //const scrollableDepth = Math.abs(Number(scrollWidth)-Number(actualWidth));
        //setScrollableDepth(scrollableDepth);
        if (!showRightArrow) {
          setShowRightArrow(true);
          console.log('showed arrow right');
        }
      } else {
        if (showRightArrow) {
          console.log('right arrow must disappear');
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
        //const scrollableDepth = Math.abs(Number(scrollWidth)-Number(actualWidth));
        //setScrollableDepth(scrollableDepth);
        if (!showRightArrow) {
          setShowRightArrow(true);
          console.log('showed arrow right');
        }
      } else {
        if (showRightArrow) {
          console.log('right arrow must disappear');
          setShowRightArrow(false);
        }
      }
    };
    handleResize();
  }, []);

  const handleRightArrowClick = () => {
    const stepSize = 100;
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

  return (
    <>
      <div className={style.stepWrapper}>
        <div className={style.config_steps} ref={stepsHolder}>
          {steps.map((st, index) => (
            <button key={index} className={stepClass(st)} onClick={() => handleSetStep(st)}>
              <FontAwesomeIcon
                icon={st.icon}
                color="black"
                beatFade={stepClass(st).includes('next')}
              />
              <p>{st.name}</p>
              <span id={style.anchor}>&#9660;</span>
            </button>
          ))}
        </div>
        {showRightArrow && (
          <button id={style.rightArrow} onClick={handleRightArrowClick}>
            Test
          </button>
        )}
        {showLeftArrow && (
          <button id={style.leftArrow} onClick={() => alert('will implement logic')}>
            Test
          </button>
        )}
        <button
          style={{ visibility: !isFirstStep ? 'visible' : 'hidden' }}
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
