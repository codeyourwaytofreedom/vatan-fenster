import Image, { StaticImageData } from 'next/image';
import style from './SingleSizer.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import React, { useEffect, useRef, useState } from 'react';
import { SizeFeedback } from '../Size_Holder';
import { SelectionItem } from '@/types/Configurator';

interface SingleSizeRProps {
  displayedImageTwo: StaticImageData;
  setSizeFeedback: React.Dispatch<React.SetStateAction<SizeFeedback>>;
  summary?: boolean;
}

export const smartDivider = (total: number, divisionNumber: number): Record<number, number> => {
  const baseSize = Math.floor(total / divisionNumber);
  const remainder = total % divisionNumber;
  return [...Array(divisionNumber)].reduce(
    (acc, _, index) => {
      acc[index] = baseSize + (index < remainder ? 1 : 0);
      return acc;
    },
    {} as Record<number, number>
  );
};

export const extractMinWidthForSection = (
  sectionIndex: number,
  minWidth: number,
  selectedType: SelectionItem,
  minWidthPack: Record<string, number>,
  numberOfSections: number
) => {
  if (!minWidthPack || Object.keys(minWidthPack).length === 0) {
    return Math.floor(minWidth / numberOfSections);
  }
  const sectionMinWidth = minWidthPack[(selectedType.sections || [])[sectionIndex]];
  return sectionMinWidth;
};

export const buildCustomMultiWidth = (
  currentWidth: number,
  minWidth: number,
  needsCustomSplit: boolean,
  sections: string[],
  windowType: SelectionItem,
  sectionsMinWidthPack: Record<string, number>
) => {
  if (needsCustomSplit) {
    // Create initial widths based on min widths
    const customMultiWidth = sections.reduce(
      (acc, _, index) => {
        acc[index] = extractMinWidthForSection(
          index,
          minWidth,
          windowType,
          sectionsMinWidthPack,
          sections.length
        );
        return acc;
      },
      {} as Record<number, number>
    );

    // Calculate total of current widths
    const total = Object.values(customMultiWidth).reduce((sum, val) => sum + val, 0);

    if (currentWidth > total) {
      const excess = currentWidth - total;
      const division = Math.floor(excess / sections.length);
      const remainder = excess % sections.length;

      // Spread the excess across all sections
      Object.keys(customMultiWidth).forEach((key, index) => {
        customMultiWidth[Number(key)] += division + (index < remainder ? 1 : 0);
      });
    }

    return customMultiWidth;
  }
  return {} as Record<number, number>;
};

export default function SingleSizer({
  displayedImageTwo,
  summary,
  setSizeFeedback,
}: SingleSizeRProps) {
  const { orderOfKeys, configuration, setConfiguration, getMinMaxSizes } = useConfiguration();
  const numberOfSections = (configuration.type as SelectionItem).sectionNumber || 1;
  const { size, setSize } = useOrderDetailsReady();

  const [multiWidth, setMultiWidth] = useState<Record<string, number>>(
    configuration.multiWidth || {}
  );
  const [height, setHeight] = useState<number | string>(size?.h ?? '');

  const minMaxSizes = getMinMaxSizes(
    configuration.material,
    configuration.style,
    configuration.profile,
    configuration.type as SelectionItem
  );

  const sections = (configuration.type as SelectionItem).sections || [];

  const minHeight = minMaxSizes?.minHeight;
  const maxHeight = minMaxSizes?.maxHeight;

  const minWidth = minMaxSizes?.minWidth;
  const maxWidth = minMaxSizes?.maxWidth;

  // sectionMinWidth is dynamically calculated for each section
  // sectionMaxWidth is to be discussed
  const sectionMaxWidth = 3000;

  const customSplitNeeded = Boolean(minMaxSizes.sectionsMinWidthPack);

  const totalHeight = useRef<HTMLInputElement>(null);

  const coverHeight = (configuration.cover as SelectionItem & { height?: number }).height;

  const sectionHasProblems = (w: number, sectionIndex: number) => {
    const sectionMinWidth = extractMinWidthForSection(
      sectionIndex,
      minWidth,
      configuration.type as SelectionItem,
      minMaxSizes.sectionsMinWidthPack || {},
      numberOfSections
    );
    return w < sectionMinWidth || w > sectionMaxWidth;
  };

  const widthInputHasProblems = () => {
    if (!size || !size.w) return true;
    return (size?.w as number) < minWidth || (size?.w as number) > maxWidth;
  };

  const heightInputHasProblems = () => {
    if (!size || !size.h) return true;
    return (size?.h as number) < minHeight || (size?.h as number) > maxHeight;
  };

  const maxWidthViolated = `Die Breite darf ${maxWidth} mm nicht überschreiten.`;
  const minWidthViolated = `Die Breite darf nicht kleiner als ${minWidth} mm sein.`;

  const maxSectionWidthViolated = (val: number) =>
    `${val} mm ist ungültig! Die maximale Breite eines Abschnitts beträgt ${sectionMaxWidth} mm.`;

  const minSectionWidthViolated = (val: number, sectionMinWidth: number) =>
    `${val} mm ist ungültig! Die minimale Breite eines Abschnitts beträgt ${sectionMinWidth} mm.`;

  const maxHeightViolated = `Die Höhe darf ${maxHeight} mm nicht überschreiten.`;
  const minHeightViolated = `Die Höhe darf nicht kleiner als ${minHeight} mm sein.`;

  const updateWidth = (e: React.ChangeEvent<HTMLInputElement>, property: 'w') => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    const problems: string[] = [];
    if (value > maxWidth) {
      // Replace only width-related feedback
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
        [property]: undefined,
      }));
      setMultiWidth({});
    } else {
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        [property]: value,
      }));
      const dividedWidthItems = customSplitNeeded
        ? buildCustomMultiWidth(
            Number(value),
            minWidth,
            customSplitNeeded,
            sections,
            configuration.type as SelectionItem,
            minMaxSizes.sectionsMinWidthPack || {}
          )
        : smartDivider(value, numberOfSections);
      setMultiWidth(dividedWidthItems);
    }
  };

  const sectionWidthValidator = (multiWidth: Record<string, number>) => {
    return Object.values(multiWidth).reduce((issues: string[], width, sectionIndex) => {
      const sectionMinWidth = extractMinWidthForSection(
        sectionIndex,
        minWidth,
        configuration.type as SelectionItem,
        minMaxSizes.sectionsMinWidthPack || {},
        numberOfSections
      );
      if (width < sectionMinWidth && width > 0)
        issues.push(minSectionWidthViolated(width, sectionMinWidth));
      if (width > sectionMaxWidth) issues.push(maxSectionWidthViolated(width));
      return issues;
    }, []);
  };

  const updateIndividualWidth = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const allIssues: string[] = [];
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();

    // No immediate issues: continue to validate full layout
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
      const slotsToRight = numberOfSections - 1;
      const remainingWidth = width - value;
      const partition = /* autoSplit ? customMultiWidth() : */ smartDivider(
        remainingWidth,
        slotsToRight
      );

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
      const remainingWidth = width - multiWidth[0] - value;
      updatedMultiWidth = {
        0: multiWidth[0],
        1: value,
        2: remainingWidth,
      };
    }

    // default minus values to zero
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
      const { height } = prev;
      return {
        ...(height !== undefined ? { height } : {}),
        [index]: [...new Set(allIssues)],
      };
    });

    return setMultiWidth(updatedMultiWidth);
  };

  const updateHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    setHeight(value);
  };

  useEffect(() => {
    // when minMaxSizes changes, multiWidth is removed to make sure partition fires again here
    if (numberOfSections > 1 && !configuration.multiWidth) {
      if (typeof size?.w === 'string' && typeof size.w !== 'undefined') {
        return;
      }
      const dividedWidthItems = customSplitNeeded
        ? buildCustomMultiWidth(
            Number(size?.w),
            minWidth,
            customSplitNeeded,
            sections,
            configuration.type as SelectionItem,
            minMaxSizes.sectionsMinWidthPack || {}
          )
        : smartDivider(size?.w || 0, numberOfSections);
      setMultiWidth(dividedWidthItems);
      setConfiguration((pr) => {
        return { ...pr, multiWidth: dividedWidthItems };
      });
    }
  }, [numberOfSections, size, configuration.type]);

  // handle initial load
  useEffect(() => {
    if (numberOfSections === 1) {
      return;
    }
    if (multiWidth) {
      setConfiguration((pr) => {
        return { ...pr, multiWidth: multiWidth };
      });
    }
  }, [multiWidth, numberOfSections]);

  useEffect(() => {
    const newHeightFeedback: string[] = [];
    const numericHeight = Number(height);

    if (numericHeight && numericHeight < minHeight) {
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

    // Adjust size only if height is valid
    if (newHeightFeedback.length === 0) {
      setSize({ w: size?.w, h: height });
    } else {
      setSize({ w: size?.w, h: undefined });
    }
  }, [height]);

  return (
    <>
      {!orderOfKeys && (
        <>
          <div id={style.single}>
            <div className={style.big}>
              {!summary && coverHeight && (
                <h4>Rolladenkasten {size?.h && <span>{coverHeight}</span>}</h4>
              )}
              <div className={style.big_shell}>
                <Image src={displayedImageTwo!} alt="brand" width={230} height={230} />
              </div>
              <div className={style.heightHolder} style={{ paddingLeft: size?.h ? '30px' : '0' }}>
                <p style={{ width: size?.h ? '30px' : '0' }}>{size?.h}</p>
                <div id={style.right_line}></div>
                {!summary && (
                  <div id={style.height_line}>
                    <h5>
                      <span>Height</span>
                    </h5>
                    <input
                      type="number"
                      onChange={(e) => updateHeight(e)}
                      value={height}
                      min={minHeight}
                      max={maxHeight}
                      placeholder="höhe"
                      className={heightInputHasProblems() ? style.warn : ''}
                      ref={totalHeight}
                    />
                    <span id={style.range}>
                      {minHeight}-{maxHeight}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              className={style.multi_widths}
              style={{ height: size?.w && !summary && numberOfSections > 1 ? '25px' : '0px' }}
            >
              {numberOfSections > 1 && (
                <div className={style.multi_widths_inputs}>
                  {Object.keys(multiWidth).map((i) => (
                    <input
                      key={i}
                      className={sectionHasProblems(multiWidth[i], parseInt(i)) ? style.warn : ''}
                      type="number"
                      onChange={(e) => updateIndividualWidth(e, parseInt(i))}
                      value={multiWidth ? multiWidth[i] : 0}
                      min={extractMinWidthForSection(
                        parseInt(i),
                        minWidth,
                        configuration.type as SelectionItem,
                        minMaxSizes.sectionsMinWidthPack || {},
                        numberOfSections
                      )}
                      max={sectionMaxWidth}
                      placeholder="breite"
                      pattern="^[1-9][0-9]*$"
                      readOnly={parseInt(i) === Object.keys(multiWidth).length - 1}
                      disabled={parseInt(i) === Object.keys(multiWidth).length - 1}
                    />
                  ))}
                </div>
              )}
            </div>
            <div id={style.bottom_line}>
              <span id={style.width}>{size?.w}</span>
            </div>
            {!summary && (
              <div id={style.inputs}>
                <div id={style.input_line}>
                  <h5>
                    <span>Width</span>
                    <span id={style.range}>
                      {minWidth}-{maxWidth}
                    </span>
                  </h5>
                  <input
                    type="number"
                    onChange={(e) => updateWidth(e, 'w')}
                    value={size?.w}
                    min={minWidth}
                    max={minHeight}
                    placeholder="breite"
                    className={widthInputHasProblems() ? style.warn : ''}
                    autoFocus
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        totalHeight.current?.focus();
                      }
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
