import Image, { StaticImageData } from 'next/image';
import style from './OberlichtSizer.module.css';
import { SubStyle } from '@/types/Configurator';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useEffect, useRef, useState } from 'react';
import { smartDivider } from '../single/SingleSizeHolder';
import { SizeFeedback } from '../Size_Holder';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';

interface OberSizeProps {
  displayedImageOne: StaticImageData;
  displayedImageTwo: StaticImageData;
  summary?: boolean;
  setSizeFeedback: React.Dispatch<React.SetStateAction<SizeFeedback>>;
}
const smartHeightDivider = (height: number) => {
  const up = Math.round(height / 3);
  const down = height - up;
  return { obenHeight: up, untenHeight: down };
};

export default function ObenSizer({
  displayedImageOne,
  displayedImageTwo,
  summary,
  setSizeFeedback,
}: OberSizeProps) {
  const { configuration, setConfiguration } = useConfiguration();
  const { size, setSize } = useOrderDetailsReady();

  const [obenMultiWidth, setObenMultiWidth] = useState<Record<string, number>>(
    configuration.obenMultiWidth || {}
  );
  const [untenMultiWidth, setUntenMultiWidth] = useState<Record<string, number>>(
    configuration.untenMultiWidth || {}
  );

  const [totalHeight, setTotalHeight] = useState(size?.h);

  const [multiHeight, setMultiHeight] = useState<Record<string, number>>(
    configuration.multiHeight || {}
  );

  const obenSectionNumber = (configuration.type as SubStyle).oben?.sectionNumber || 1;
  const untenSectionNumber = (configuration.type as SubStyle).unten?.sectionNumber || 1;

  const tHeight = useRef<HTMLInputElement>(null);

  const minWidth = 900;
  const maxWidth = 2800;

  const sectionMinWidth = 300;
  const sectionMaxWidth = 2000;

  const sectionMinHeight = 300;
  const sectionMaxHeight = 2000;

  const minHeight = 900;
  const maxHeight = 2800;

  const sectionHasProblems = (w: number) => {
    return w < sectionMinWidth || w > sectionMaxWidth;
  };

  const maxWidthViolated = `Die Breite darf ${maxWidth} mm nicht überschreiten.`;
  const minWidthViolated = `Die Breite darf nicht kleiner als ${minWidth} mm sein.`;

  const maxHeightViolated = `Die Höhe darf ${maxHeight} mm nicht überschreiten.`;
  const minHeightViolated = `Die Höhe darf nicht kleiner als ${minHeight} mm sein.`;

  const maxSectionWidthViolated = (val: number) =>
    `${val} mm ist ungültig! Die maximale Breite eines Abschnitts beträgt ${sectionMaxWidth} mm.`;

  const minSectionWidthViolated = (val: number) =>
    `${val} mm ist ungültig! Die minimale Breite eines Abschnitts beträgt ${sectionMinWidth} mm.`;

  const maxSectionHeightViolated = (val: number) =>
    `${val} mm ist ungültig! Die maximale Höhe eines Abschnitts beträgt ${sectionMaxHeight} mm.`;

  const minSectionHeightViolated = (val: number) =>
    `${val} mm ist ungültig! Die minimale Höhe eines Abschnitts beträgt ${sectionMinHeight} mm.`;

  const sectionWidthValidator = (multiWidth: Record<string, number>) => {
    return Object.values(multiWidth).reduce((issues: string[], width) => {
      if (width < sectionMinWidth && width > 0) issues.push(minSectionWidthViolated(width));
      if (width > sectionMaxWidth) issues.push(maxSectionWidthViolated(width));
      return issues;
    }, []);
  };

  const sectionHeightValidator = (multiHeight: Record<string, number>) => {
    return Object.values(multiHeight).reduce((issues: string[], height) => {
      if (height < sectionMinHeight && height > 0) issues.push(minSectionHeightViolated(height));
      if (height > sectionMaxHeight) issues.push(maxSectionHeightViolated(height));
      return issues;
    }, []);
  };

  const widthInputHasProblems = () => {
    if (!size || !size.w) return true;
    return (size?.w as number) < minWidth || (size?.w as number) > maxWidth;
  };

  const heightInputHasProblems = () => {
    if (!size || !size.h) return true;
    return (size?.h as number) < minHeight || (size?.h as number) > maxHeight;
  };

  const sectionHeightHasProblems = (h: number) => {
    return h < sectionMinHeight || h > sectionMaxHeight;
  };

  const suppressArrows = (event: React.KeyboardEvent) => {
    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') event.preventDefault();
    if (event.key === 'Enter') tHeight?.current?.focus();
  };

  /* -----------------        Width and Height Updates        ----------------- */

  const updateIndividualWidth = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    direction: 'oben' | 'unten'
  ) => {
    const allIssues: string[] = [];
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    const sectionCount = direction === 'oben' ? obenSectionNumber : untenSectionNumber;

    const width = size!.w as number;
    let updatedMultiWidth: Record<number, number> = {};

    if (value === width) {
      allIssues.push(
        'Die Abschnittsbreite darf nicht gleich oder größer als die Gesamtbreite sein.'
      );
    }

    if (value === 0) {
      allIssues.push('Die Abschnittsbreite darf keinen Wert von 0 haben.');
    }

    if (index === 0) {
      const slotsToRight = sectionCount - 1;
      const remainingWidth = width - value;
      const partition = smartDivider(remainingWidth, slotsToRight);

      // Shift keys to the right
      updatedMultiWidth = Object.entries(partition).reduce(
        (acc: Record<number, number>, [key, val]) => {
          acc[Number(key) + 1] = val;
          return acc;
        },
        { 0: value }
      );
    }

    if (index === 1) {
      const existingSectionWidth = direction === 'oben' ? obenMultiWidth[0] : untenMultiWidth[0];
      const remainingWidth = width - existingSectionWidth - value;
      updatedMultiWidth = {
        0: existingSectionWidth,
        1: value,
        2: remainingWidth,
      };
    }

    updatedMultiWidth = Object.fromEntries(
      Object.entries(updatedMultiWidth).map(([key, val]) => [key, val < 1 ? 0 : val])
    );
    //val === 0 ı ayrıca ekle feedback olarak

    const totalWidth = Object.values(updatedMultiWidth).reduce((acc, val) => acc + val, 0);

    if (totalWidth > width) {
      allIssues.push(`Die Gesamtbreite muss genau ${width} betragen.`);
    }

    const layoutFeedback = sectionWidthValidator(updatedMultiWidth);
    allIssues.push(...layoutFeedback);

    setSizeFeedback((prev) => {
      const { height, oben, unten } = prev;
      return {
        ...(height !== undefined ? { height } : {}),
        ...(direction === 'oben' && unten !== undefined ? { unten } : {}),
        ...(direction === 'unten' && oben !== undefined ? { oben } : {}),
        [direction]: [...new Set(allIssues)],
      };
    });

    if (direction === 'oben') {
      setObenMultiWidth(updatedMultiWidth);
      setConfiguration((pr) => {
        return { ...pr, obenMultiWidth: updatedMultiWidth };
      });
    }
    if (direction === 'unten') {
      setUntenMultiWidth(updatedMultiWidth);
      setConfiguration((pr) => {
        return { ...pr, untenMultiWidth: updatedMultiWidth };
      });
    }
  };

  const updateWidth = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    const problems: string[] = [];
    if (value > maxWidth) {
      problems.push(maxWidthViolated);
    }
    if (value < minWidth) {
      problems.push(minWidthViolated);
    }

    setSizeFeedback((prev) => {
      const { height } = prev;
      return {
        ...(height !== undefined ? { height } : {}),
        width: problems,
      };
    });

    if (problems.length > 0) {
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        w: undefined,
      }));
    } else {
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        w: value,
      }));
    }
  };

  const updateTotalHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : '';
    e.target.value = value === 0 ? '' : value.toString();

    const newHeightFeedback: string[] = [];
    const numericHeight = Number(value);

    if (numericHeight < minHeight) {
      newHeightFeedback.push(minHeightViolated);
    }
    if (numericHeight > maxHeight) {
      newHeightFeedback.push(maxHeightViolated);
    }

    // Update only the 'height' part of feedback
    setSizeFeedback((prev) => ({
      ...prev,
      height: newHeightFeedback,
    }));

    setTotalHeight(value);

    if (newHeightFeedback.length > 0) {
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        h: undefined,
      }));
    } else {
      const heightPartition = smartHeightDivider(value as number);
      setMultiHeight(heightPartition);
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        h: numericHeight,
      }));
    }
  };

  const updateIndividualHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    const allIssues: string[] = [];
    if (value === size?.h) {
      allIssues.push('Die Abschnittshöhe darf nicht gleich oder größer als die Gesamthöhe sein.');
    }
    if (value === 0) {
      allIssues.push('Die Abschnittshöhe darf keinen Wert von 0 haben.');
    }

    setMultiHeight(() => {
      const newMultiHeight = {
        untenHeight: Number(size?.h) - value,
        obenHeight: value,
      };
      const correctedNewMultiHeight = Object.fromEntries(
        Object.entries(newMultiHeight).map(([key, val]) => [key, val < 1 ? 0 : val])
      );
      const sectionHeightProblems = sectionHeightValidator(correctedNewMultiHeight);
      allIssues.push(...sectionHeightProblems);
      setSizeFeedback((pr) => {
        return {
          ...pr,
          height: [...new Set(allIssues)], // remember to remove duplicates
        };
      });
      return correctedNewMultiHeight;
    });
  };

  // inject existing multiHeight
  useEffect(() => {
    if (!configuration.multiHeight) {
      if (typeof size?.h === 'string' && typeof size.h !== 'undefined') {
        return;
      }
      setMultiHeight(smartHeightDivider(size?.h as number));
    }
  }, [size?.h]);

  // if no previous partition available
  useEffect(() => {
    if (obenSectionNumber > 1) {
      if (typeof size?.w === 'string' && typeof size.w !== 'undefined') {
        return;
      }
      const dividedWidthItems = smartDivider(size?.w || 0, obenSectionNumber);
      setObenMultiWidth(dividedWidthItems);
    }
    if (untenSectionNumber > 1) {
      if (typeof size?.w === 'string' && typeof size.w !== 'undefined') {
        return;
      }
      const dividedWidthItems = smartDivider(size?.w || 0, untenSectionNumber);
      setUntenMultiWidth(dividedWidthItems);
    }
  }, [size?.w]);

  // when multiHeight changes, update Configuration.multiHeight
  useEffect(() => {
    setConfiguration((pr) => {
      return {
        ...pr,
        multiHeight: multiHeight,
      };
    });
  }, [multiHeight]);

  return (
    <>
      <div id={style.oberlicht}>
        <div className={style.multi_widths} style={{ height: size?.w && !summary ? '25px' : '0px' }}>
          {obenSectionNumber > 1 && size?.w && (
            <div className={style.multi_widths_inputs}>
              {Object.keys(obenMultiWidth).map((it, index) => (
                <input
                  key={index}
                  className={sectionHasProblems(obenMultiWidth[index]) ? style.warn : ''}
                  type="number"
                  onChange={(e) => updateIndividualWidth(e, index, 'oben')}
                  onKeyDown={(event) => suppressArrows(event)}
                  value={obenMultiWidth ? obenMultiWidth[index] : 0}
                  min={sectionMinWidth}
                  max={sectionMaxWidth}
                  placeholder="breite"
                  pattern="^[1-9][0-9]*$"
                  readOnly={index === Object.keys(obenMultiWidth).length - 1}
                  disabled={index === Object.keys(obenMultiWidth).length - 1}
                />
              ))}
            </div>
          )}
        </div>
        <div id={style.central_holder}>
          <div className={style.small}>
            <div className={style.small_shell}>
              <Image src={displayedImageOne!} alt="brand" width={230} height={230} />
            </div>
          </div>
          <div className={style.big}>
            <div className={style.big_shell}>
              <Image src={displayedImageTwo!} alt="brand" width={230} height={230} />
            </div>
          </div>
          <div id={style.heights} style={{ width: size?.h && !summary ? '75px' : '10px' }}>
            <div id={style.right_line} className={style.obenunten_rightline}></div>
            {size?.h && !summary && (
              <>
                <div>
                  <div id={style.height_oben}>
                    <h5>
                      <span>Height Oben</span>
                    </h5>
                    <input
                      type="number"
                      onChange={(e) => updateIndividualHeight(e)}
                      onKeyDown={(event) => suppressArrows(event)}
                      value={multiHeight.obenHeight}
                      placeholder="höhe"
                      className={sectionHeightHasProblems(multiHeight.obenHeight) ? style.warn : ''}
                    />
                    <span id={style.range}>(500-800)</span>
                  </div>
                  <div id={style.height_unten}>
                    <h5>
                      <span>Height Unten</span>
                    </h5>
                    <input
                      type="number"
                      value={multiHeight.untenHeight}
                      placeholder="höhe"
                      className={
                        sectionHeightHasProblems(multiHeight.untenHeight) ? style.warn : ''
                      }
                      readOnly
                      disabled
                    />
                    <span id={style.range}>(1000-1700)</span>
                  </div>
                </div>
              </>
            )}
            {
              !summary &&
              <div id={style.height_total}>
              <h5>
                <span>Height Gesamt</span>
              </h5>
              <input
                type="number"
                onChange={(e) => updateTotalHeight(e)}
                onKeyDown={(event) => suppressArrows(event)}
                value={totalHeight}
                placeholder="höhe"
                className={heightInputHasProblems() ? style.warn : ''}
                ref={tHeight}
              />
              <span id={style.range}>(1000-1700)</span>
            </div>
            }
          </div>
        </div>
        <div className={style.multi_widths} style={{ height: size?.w && !summary ? '25px' : '0px' }}>
          {untenSectionNumber > 1 && size?.w && (
            <div className={style.multi_widths_inputs}>
              {Object.keys(untenMultiWidth).map((item, index) => (
                <input
                  key={index}
                  className={sectionHasProblems(untenMultiWidth[index]) ? style.warn : ''}
                  type="number"
                  onChange={(e) => updateIndividualWidth(e, index, 'unten')}
                  onKeyDown={(event) => suppressArrows(event)}
                  value={untenMultiWidth ? untenMultiWidth[index] : 0}
                  min={sectionMinWidth}
                  max={sectionMaxWidth}
                  placeholder="breite"
                  pattern="^[1-9][0-9]*$"
                  readOnly={index === Object.keys(untenMultiWidth).length - 1}
                  disabled={index === Object.keys(untenMultiWidth).length - 1}
                />
              ))}
            </div>
          )}
        </div>
        <div id={style.bottom_line}>
          <span id={style.bottom_width}>{size?.w} </span>
        </div>
        {
          !summary &&
          <div id={style.inputs}>
          <div id={style.input_line}>
            <h5>
              <span>Width</span> <span id={style.range}>(1000-1700)</span>
            </h5>
            <input
              type="number"
              onChange={(e) => updateWidth(e)}
              onKeyDown={(event) => suppressArrows(event)}
              value={size?.w}
              placeholder="breite"
              className={widthInputHasProblems() ? style.warn : ''}
              autoFocus
            />
          </div>
        </div>
        }
      </div>
    </>
  );
}
