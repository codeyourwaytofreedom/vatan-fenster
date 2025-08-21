import Image, { StaticImageData } from 'next/image';
import style from './OberlichtSizer.module.css';
import { SelectionItem, SubStyle } from '@/types/Configurator';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useEffect, useRef, useState } from 'react';

import {
  buildCustomMultiWidth,
  extractMaxWidthForSection,
  extractMinWidthForSection,
  smartDivider,
} from '../single/SingleSizeHolder';
import { SizeFeedback } from '../Size_Holder';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import { windowStyles } from '@/data/selectionItems/basisData';

interface OberSizeProps {
  displayedImageOne: StaticImageData;
  displayedImageTwo: StaticImageData;
  summary?: boolean;
  setSizeFeedback: React.Dispatch<React.SetStateAction<SizeFeedback>>;
}

const smartHeightDivider = (totalHeight: number, heightOben: number, heightUnten: number) => {
  const currentTotal = heightOben + heightUnten;

  if (totalHeight > currentTotal) {
    const excess = totalHeight - currentTotal;
    const half = Math.floor(excess / 2);
    const remainder = excess % 2; // will be 1 if odd

    return {
      obenHeight: heightOben + half + remainder, // give remainder to oben
      untenHeight: heightUnten + half,
    };
  }

  return {
    obenHeight: heightOben,
    untenHeight: heightUnten,
  };
};

export default function ObenSizer({
  displayedImageOne,
  displayedImageTwo,
  summary,
  setSizeFeedback,
}: OberSizeProps) {
  const { configuration, setConfiguration, getMinMaxSizes } = useConfiguration();
  const { size, setSize } = useOrderDetailsReady();

  const widthManuallyChanged = useRef(false);

  const [obenMultiWidth, setObenMultiWidth] = useState<Record<string, number>>(
    configuration.obenMultiWidth || {}
  );
  const obenMultiWidthConfig = configuration.obenMultiWidth;

  const [untenMultiWidth, setUntenMultiWidth] = useState<Record<string, number>>(
    configuration.untenMultiWidth || {}
  );

  const untenMultiWidthConfig = configuration.untenMultiWidth;

  const totalHeightConfig = size?.h;

  const [multiHeight, setMultiHeight] = useState<Record<string, number>>(
    configuration.multiHeight || {}
  );

  const obenSectionNumber = (configuration.type as SubStyle).oben?.sectionNumber || 1;
  const untenSectionNumber = (configuration.type as SubStyle).unten?.sectionNumber || 1;

  const tHeight = useRef<HTMLInputElement>(null);

  const coverHeight = (configuration.cover as SelectionItem & { height?: number }).height;

  const minMaxSizesOben = (() => {
    if ('oben' in configuration.type) {
      const sectionNumberOben = configuration.type.oben?.sectionNumber || 1;
      const windowStyleOben =
        sectionNumberOben === 1
          ? windowStyles.find((st) => st.key === 'flugel1')
          : sectionNumberOben === 2
            ? windowStyles.find((st) => st.key === 'flugel2')
            : windowStyles.find((st) => st.key === 'flugel3');

      const windowProfileOben = configuration.profile;
      const windowTypeOben = configuration.type.oben!;

      return getMinMaxSizes(
        configuration.material,
        windowStyleOben!,
        windowProfileOben,
        windowTypeOben
      );
    }

    return undefined;
  })();

  const minMaxSizesUnten = (() => {
    if ('unten' in configuration.type) {
      const sectionNumberUnten = configuration.type.unten?.sectionNumber || 1;
      const windowStyleUnten =
        sectionNumberUnten === 1
          ? windowStyles.find((st) => st.key === 'flugel1')
          : sectionNumberUnten === 2
            ? windowStyles.find((st) => st.key === 'flugel2')
            : windowStyles.find((st) => st.key === 'flugel3');

      const windowProfileUnten = configuration.profile;
      const windowTypeUnten = configuration.type.unten!;

      return getMinMaxSizes(
        configuration.material,
        windowStyleUnten!,
        windowProfileUnten,
        windowTypeUnten
      );
    }

    return undefined;
  })();

  // if sectionsMinWidthPack
  const obenNeedsCustomSplit = Boolean(minMaxSizesOben?.sectionsMinWidthPack);
  const untenNeedsCustomSplit = Boolean(minMaxSizesUnten?.sectionsMinWidthPack);

  const minWidthTotal = Math.max(minMaxSizesOben?.minWidth ?? 0, minMaxSizesUnten?.minWidth ?? 0);
  const maxWidthTotal = Math.min(minMaxSizesOben?.maxWidth ?? 0, minMaxSizesUnten?.maxWidth ?? 0);

  const minHeight = (minMaxSizesOben?.minHeight ?? 0) + (minMaxSizesUnten?.minHeight ?? 0);
  const maxHeight = (minMaxSizesOben?.maxHeight ?? 0) + (minMaxSizesUnten?.maxHeight ?? 0);

  const minHeightOben = minMaxSizesOben?.minHeight;
  const minHeightUnten = minMaxSizesUnten?.minHeight;

  const maxHeightOben = minMaxSizesOben?.maxHeight;
  const maxHeightUnten = minMaxSizesUnten?.maxHeight;

  // sectionMinWidth is dynamically calculated for each section
  // sectionMaxWidth is to be discussed
  //const sectionMaxWidth = 3000;

  const sectionHasProblems = (w: number, minWidthForSection: number, sectionMaxWidth: number) => {
    return w < minWidthForSection || w > sectionMaxWidth;
  };

  const maxWidthViolated = `Die Breite darf ${maxWidthTotal} mm nicht überschreiten.`;
  const minWidthViolated = `Die Breite darf nicht kleiner als ${minWidthTotal} mm sein.`;

  const maxHeightViolated = `Die Höhe darf ${maxHeight} mm nicht überschreiten.`;
  const minHeightViolated = `Die Höhe darf nicht kleiner als ${minHeight} mm sein.`;

  const maxSectionWidthViolated = (val: number, sectionMaxWidth: number) =>
    `${val} mm ist ungültig! Die maximale Breite eines Abschnitts beträgt ${sectionMaxWidth} mm.`;

  const minSectionWidthViolated = (val: number, sectionMinWidth: number) =>
    `${val} mm ist ungültig! Die minimale Breite eines Abschnitts beträgt ${sectionMinWidth} mm.`;

  const maxSectionHeightViolated = (val: number, sectionMaxHeight: number) =>
    `${val} mm ist ungültig! Die maximale Höhe eines Abschnitts beträgt ${sectionMaxHeight} mm.`;

  const minSectionHeightViolated = (val: number, sectionMinHeight: number) =>
    `${val} mm ist ungültig! Die minimale Höhe eines Abschnitts beträgt ${sectionMinHeight} mm.`;

  const sectionWidthValidator = (
    multiWidth: Record<string, number>,
    direction: 'oben' | 'unten'
  ) => {
    return Object.values(multiWidth).reduce((issues: string[], width, index) => {
      const selectedType =
        direction === 'oben'
          ? (configuration.type as SubStyle).oben
          : (configuration.type as SubStyle).unten;
      const minWidthPack =
        direction === 'oben'
          ? minMaxSizesOben?.sectionsMinWidthPack
          : minMaxSizesUnten?.sectionsMinWidthPack;
      const maxWidthPack =
        direction === 'oben'
          ? minMaxSizesOben?.sectionsMaxWidthPack
          : minMaxSizesUnten?.sectionsMaxWidthPack;

      const totalWidth =
        direction === 'oben' ? minMaxSizesOben?.minWidth : minMaxSizesUnten?.minWidth;

      const sectionMinWidth = extractMinWidthForSection(
        index,
        totalWidth!,
        selectedType!,
        minWidthPack!,
        selectedType!.sectionNumber!
      );

      const sectionMaxWidth = extractMaxWidthForSection(
        index,
        totalWidth!,
        maxWidthTotal,
        selectedType!,
        maxWidthPack!,
        selectedType!.sectionNumber!
      );

      if (width < sectionMinWidth && width > 0)
        issues.push(minSectionWidthViolated(width, sectionMinWidth));
      if (width > sectionMaxWidth) issues.push(maxSectionWidthViolated(width, sectionMaxWidth));
      return issues;
    }, []);
  };

  const sectionHeightValidator = (multiHeight: Record<string, number>) => {
    return Object.entries(multiHeight).reduce((issues: string[], [key, height]) => {
      // caution needed about non-null assertion
      const sectionMinHeight =
        key === 'obenHeight' ? minMaxSizesOben!.minHeight : minMaxSizesUnten!.minHeight;
      const sectionMaxHeight =
        key === 'obenHeight' ? minMaxSizesOben!.maxHeight : minMaxSizesUnten!.maxHeight;

      if (height < sectionMinHeight && height > 0)
        issues.push(minSectionHeightViolated(height, sectionMinHeight));
      if (height > sectionMaxHeight)
        issues.push(maxSectionHeightViolated(height, sectionMaxHeight));
      return issues;
    }, []);
  };

  const widthInputHasProblems = () => {
    if (!size || !size.w) return true;
    return (size?.w as number) < minWidthTotal || (size?.w as number) > maxWidthTotal;
  };

  const heightInputHasProblems = () => {
    if (!size || !size.h) return true;
    return (size?.h as number) < minHeight || (size?.h as number) > maxHeight;
  };

  const sectionHeightHasProblems = (
    h: number,
    sectionMinHeight: number | undefined,
    sectionMaxHeight: number | undefined
  ) => {
    if (!sectionMinHeight || !sectionMaxHeight) return true;
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

    const layoutFeedback = sectionWidthValidator(updatedMultiWidth, direction);
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
    if (value > maxWidthTotal) {
      problems.push(maxWidthViolated);
    }
    if (value < minWidthTotal) {
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
      widthManuallyChanged.current = true;
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

    if (newHeightFeedback.length > 0) {
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        h: undefined,
      }));
    } else {
      const heightPartition = smartHeightDivider(
        value as number,
        minMaxSizesOben!.minHeight,
        minMaxSizesUnten!.minHeight
      );
      const sectionHeightProblems = sectionHeightValidator(heightPartition);
      // Update only the 'height' part of feedback
      setSizeFeedback((prev) => ({
        ...prev,
        height: [...newHeightFeedback, ...sectionHeightProblems],
      }));
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

  useEffect(() => {
    if (!configuration.multiHeight) {
      if (typeof size?.h === 'string' && typeof size.h !== 'undefined') {
        return;
      }
      if (minMaxSizesOben && minHeightUnten) {
        setMultiHeight(
          smartHeightDivider(
            size?.h as number,
            minMaxSizesOben?.minHeight,
            minMaxSizesUnten?.minHeight
          )
        );
      }
    }
  }, [size?.h]);

  // if no previous partition available
  useEffect(() => {
    if (!size?.w || typeof size.w === 'string') return;

    if (obenSectionNumber > 1 && (!configuration.obenMultiWidth || widthManuallyChanged.current)) {
      const sectionsOben = 'oben' in configuration.type ? configuration.type.oben?.sections : [];
      const typeOben = (configuration.type as SubStyle).oben;
      const dividedWidthItems = obenNeedsCustomSplit
        ? buildCustomMultiWidth(
            size.w,
            minWidthTotal,
            obenNeedsCustomSplit,
            sectionsOben!,
            typeOben!,
            minMaxSizesOben!.sectionsMinWidthPack!
          )
        : smartDivider(size.w, obenSectionNumber);
      setObenMultiWidth(dividedWidthItems);
      setConfiguration((pr) => ({ ...pr, obenMultiWidth: dividedWidthItems }));
    }

    if (
      untenSectionNumber > 1 &&
      (!configuration.untenMultiWidth || widthManuallyChanged.current)
    ) {
      const sectionsUnten = 'unten' in configuration.type ? configuration.type.unten?.sections : [];
      const typeUnten = (configuration.type as SubStyle).unten;
      const dividedWidthItems = untenNeedsCustomSplit
        ? buildCustomMultiWidth(
            size.w,
            minWidthTotal,
            untenNeedsCustomSplit,
            sectionsUnten!,
            typeUnten!,
            minMaxSizesUnten!.sectionsMinWidthPack!
          )
        : smartDivider(size.w, untenSectionNumber);
      setUntenMultiWidth(dividedWidthItems);
      setConfiguration((pr) => ({ ...pr, untenMultiWidth: dividedWidthItems }));
    }

    // reset the manual update flag
    widthManuallyChanged.current = false;
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

  //const heightUnten = configuration.multiHeight?.untenHeight;

  return (
    <>
      <div id={style.oberlicht}>
        <div className={style.multi_widths}>
          {obenSectionNumber > 1 && size?.w && (
            <div className={style.multi_widths_inputs}>
              {Object.keys(obenMultiWidth).map((it, index) => (
                <input
                  key={index}
                  className={
                    sectionHasProblems(
                      obenMultiWidth[index],
                      extractMinWidthForSection(
                        index,
                        minMaxSizesOben?.minWidth || Infinity,
                        (configuration.type as SubStyle).oben!,
                        minMaxSizesOben!.sectionsMinWidthPack!,
                        obenSectionNumber
                      ),
                      extractMaxWidthForSection(
                        index,
                        minMaxSizesOben?.minWidth || Infinity,
                        maxWidthTotal,
                        (configuration.type as SubStyle).oben!,
                        minMaxSizesOben!.sectionsMaxWidthPack!,
                        obenSectionNumber
                      )
                    )
                      ? style.warn
                      : ''
                  }
                  type="number"
                  onChange={(e) => updateIndividualWidth(e, index, 'oben')}
                  onKeyDown={(event) => suppressArrows(event)}
                  value={obenMultiWidthConfig ? obenMultiWidthConfig[index] : 0}
                  min={extractMinWidthForSection(
                    index,
                    minWidthTotal,
                    (configuration.type as SubStyle).oben!,
                    minMaxSizesOben!.sectionsMinWidthPack!,
                    obenSectionNumber
                  )}
                  max={extractMaxWidthForSection(
                    index,
                    minWidthTotal,
                    maxWidthTotal,
                    (configuration.type as SubStyle).oben!,
                    minMaxSizesOben!.sectionsMaxWidthPack!,
                    obenSectionNumber
                  )}
                  placeholder="breite"
                  pattern="^[1-9][0-9]*$"
                  readOnly={index === Object.keys(obenMultiWidth).length - 1}
                  disabled={summary || index === Object.keys(obenMultiWidth).length - 1}
                />
              ))}
            </div>
          )}
        </div>
        {!summary && coverHeight && <h4>Rolladenkasten {size?.h && <span>{coverHeight}</span>}</h4>}
        <div id={style.central_holder}>
          <div className={style.small}>
            <div className={style.small_shell}>
              {displayedImageOne && (
                <Image src={displayedImageOne} alt="brand" width={230} height={230} />
              )}
            </div>
          </div>
          <div className={style.big}>
            <div className={style.big_shell}>
              {displayedImageTwo && (
                <Image src={displayedImageTwo} alt="brand" width={230} height={230} />
              )}
            </div>
          </div>
          <div id={style.heights} style={{ width: size?.h && !summary ? '75px' : '10px' }}>
            {summary && size?.h && (
              <div className={style.lines}>
                <span className={style.lines_top}>{configuration.multiHeight?.obenHeight} </span>
                <span className={style.lines_bottom}>{configuration.multiHeight?.untenHeight}</span>
              </div>
            )}
            {<div id={style.right_line} className={style.obenunten_rightline}></div>}
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
                      className={
                        sectionHeightHasProblems(
                          multiHeight.obenHeight,
                          minHeightOben,
                          maxHeightOben
                        )
                          ? style.warn
                          : ''
                      }
                    />
                    <span id={style.range}>
                      ({minHeightOben}-{maxHeightOben})
                    </span>
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
                        sectionHeightHasProblems(
                          multiHeight.untenHeight,
                          minHeightUnten,
                          maxHeightUnten
                        )
                          ? style.warn
                          : ''
                      }
                      readOnly
                      disabled
                    />
                    <span id={style.range}>
                      ({minHeightUnten}-{maxHeightUnten})
                    </span>
                  </div>
                </div>
              </>
            )}
            {!summary && (
              <div id={style.height_total}>
                <h5>
                  <span>Height Gesamt</span>
                </h5>
                <input
                  type="number"
                  onChange={(e) => updateTotalHeight(e)}
                  onKeyDown={(event) => suppressArrows(event)}
                  value={totalHeightConfig}
                  placeholder="höhe"
                  className={heightInputHasProblems() ? style.warn : ''}
                  ref={tHeight}
                />
                <span id={style.range}>
                  ({minHeight}-{maxHeight})
                </span>
              </div>
            )}
          </div>
        </div>
        <div
          className={style.multi_widths}
          style={{ height: size?.w && untenSectionNumber > 1 ? '25px' : '0px' }}
        >
          {untenSectionNumber > 1 && size?.w && (
            <div className={style.multi_widths_inputs}>
              {Object.keys(untenMultiWidth).map((item, index) => (
                <input
                  key={index}
                  className={
                    sectionHasProblems(
                      untenMultiWidth[index],
                      extractMinWidthForSection(
                        index,
                        minMaxSizesUnten?.minWidth || Infinity,
                        (configuration.type as SubStyle).unten!,
                        minMaxSizesUnten!.sectionsMinWidthPack!,
                        untenSectionNumber
                      ),
                      extractMaxWidthForSection(
                        index,
                        minMaxSizesUnten?.minWidth || Infinity,
                        maxWidthTotal,
                        (configuration.type as SubStyle).unten!,
                        minMaxSizesUnten!.sectionsMaxWidthPack!,
                        untenSectionNumber
                      )
                    )
                      ? style.warn
                      : ''
                  }
                  type="number"
                  onChange={(e) => updateIndividualWidth(e, index, 'unten')}
                  onKeyDown={(event) => suppressArrows(event)}
                  value={untenMultiWidthConfig ? untenMultiWidthConfig[index] : 0}
                  min={extractMinWidthForSection(
                    index,
                    minWidthTotal,
                    (configuration.type as SubStyle).unten!,
                    minMaxSizesUnten!.sectionsMinWidthPack!,
                    untenSectionNumber
                  )}
                  max={extractMaxWidthForSection(
                    index,
                    minWidthTotal,
                    maxWidthTotal,
                    (configuration.type as SubStyle).unten!,
                    minMaxSizesUnten!.sectionsMaxWidthPack!,
                    untenSectionNumber
                  )}
                  placeholder="breite"
                  pattern="^[1-9][0-9]*$"
                  readOnly={index === Object.keys(untenMultiWidth).length - 1}
                  disabled={summary || index === Object.keys(untenMultiWidth).length - 1}
                />
              ))}
            </div>
          )}
        </div>
        <div id={style.bottom_line}>
          <span id={style.bottom_width}>{size?.w} </span>
        </div>
        {!summary && (
          <div id={style.inputs}>
            <div id={style.input_line}>
              <h5>
                <span>Width</span>{' '}
                <span id={style.range}>
                  ({minWidthTotal}-{maxWidthTotal})
                </span>
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
        )}
      </div>
    </>
  );
}
