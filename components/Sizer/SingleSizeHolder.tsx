import Image, { StaticImageData } from 'next/image';
import style from './Sizer.module.css';
import { useConfiguration } from '@/context/ConfigurationContext';
import { SelectionItem } from '@/data/configuration_options';
import { useOrderDetailsReady } from '@/context/OrderDetailsContext';
import React, { useEffect, useState } from 'react';

interface SingleSizeRProps {
  displayedImageTwo: StaticImageData;
  setSizeFeedback: React.Dispatch<React.SetStateAction<string[] | null>>;
}

export default function SingleSizer({ displayedImageTwo, setSizeFeedback }: SingleSizeRProps) {
  const { orderOfKeys, configuration, setConfiguration } = useConfiguration();
  const numberOfSections = (configuration.type as SelectionItem).sectionNumber || 1;
  const { size, setSize } = useOrderDetailsReady();

  const [multiWidth, setMultiWidth] = useState<Record<string, number>>(configuration.multiWidth || {});
  const [height, setHeight] = useState<number | string >(size?.h ?? '');

  const minHeight = 500;
  const maxHeight = 1800;

  const minWidth = 500;
  const maxWidth = 1800;

  const sectionMinWidth =  300;
  const sectionMaxWidth =  900;

  const maxWidthViolated = `Die Breite darf ${maxWidth} mm nicht überschreiten.`;
  const minWidthViolated = `Die Breite darf nicht kleiner als ${minWidth} mm sein.`;
  
  const maxTotalWidthViolated = `Die Gesamtbreite darf ${maxWidth} mm nicht überschreiten.`;
  const minTotalWidthViolated = `Die Gesamtbreite darf nicht kleiner als ${minWidth} mm sein.`;
  
  const maxSectionWidthViolated = (val: number) =>
    `${val} mm ist ungültig! Die maximale Breite eines Abschnitts beträgt ${sectionMaxWidth} mm.`;
  
  const minSectionWidthViolated = (val: number) =>
    `${val} mm ist ungültig! Die minimale Breite eines Abschnitts beträgt ${sectionMinWidth} mm.`;  

  const maxHeightViolated = `Die Höhe darf ${maxHeight} mm nicht überschreiten.`;
  const minHeightViolated = `Die Höhe darf nicht kleiner als ${minHeight} mm sein.`;  


  const updateSingleWidth = (e: React.ChangeEvent<HTMLInputElement>, property: 'w' | 'h' | 'h_unten') => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    const problems: string[] = [];
    if(value > maxWidth){
      // Replace only width-related feedback
      problems.push(maxWidthViolated);
    }
    if(value < minWidth){
      problems.push(minWidthViolated);
    }
    setSizeFeedback((prev) => {
      const otherMessages = (prev || []).filter(msg => !msg.toLowerCase().includes("breite"));
      return [...otherMessages, ...problems];
    });
    if(problems.length > 0){
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        [property]: undefined,
      }));
    }
    else{
      setSize((prevSize) => ({
        ...(prevSize || { w: undefined, h: undefined }),
        [property]: value,
      }));
    }
  };

  const initialSmartDivider = (total: number, divisionNumber: number): Record<number, number> => {
    const baseSize = Math.floor(total / divisionNumber);
    const remainder = total % divisionNumber;
  
    return [...Array(divisionNumber)].reduce((acc, _, index) => {
      acc[index] = baseSize + (index < remainder ? 1 : 0);
      return acc;
    }, {} as Record<number, number>);
  };
  

  useEffect(() => {
    if (numberOfSections > 1 && !configuration.multiWidth) {
      if (typeof size?.w === 'string' && typeof size.w !== 'undefined') {
        return;
      }
      const dividedWidthItems = initialSmartDivider(size?.w || 0, numberOfSections);
      setMultiWidth(dividedWidthItems);
    }
  }, [numberOfSections, size?.w]);

  const updateIndividualWidth = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    setMultiWidth((prevSize) => ({
      ...(prevSize || { w: undefined, h: undefined }),
      [index]: (value),
    }));
  };

  const updateHeight = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? Number(e.target.value.replace(/^0+(?=\d)/, '')) : 0;
    e.target.value = value === 0 ? '' : value.toString();
    setHeight(value);
  };

  // handle multiwidth changes
  useEffect(() => {
    if(numberOfSections === 1){
      return;
    }
    if (multiWidth) {
      setConfiguration((pr)=>{
        return {...pr, multiWidth: multiWidth}
      });
      const problems: string[] = [];
        // Min/max validation for individual sections
        Object.values(multiWidth).forEach((val) => {
          if (Number(val) < sectionMinWidth) {
            problems.push(minSectionWidthViolated(val));
          }
          if (Number(val) > sectionMaxWidth) {
            problems.push(maxSectionWidthViolated(val));
          }
        });
      
  
      // Total width validation
      const totalWidth = Object.values(multiWidth).reduce((acc, val) => acc + Number(val), 0);
      if (totalWidth > maxWidth) {
        problems.push(maxTotalWidthViolated);
      }
      if(totalWidth < minWidth){
        problems.push(minTotalWidthViolated);
      }
  
      // Replace only width-related feedback
      setSizeFeedback((prev) => {
        const otherMessages = (prev || []).filter(msg => !msg.toLowerCase().includes("breite"));
        return [...otherMessages, ...problems];
      });
      if(problems.length ===  0){
        setSize({w: totalWidth, h: size?.h});
      }
      else{
        setSize({w: undefined, h: size?.h});
      }
    }
  }, [multiWidth, numberOfSections]);
  

  useEffect(()=>{
    if(configuration.multiWidth){
      setMultiWidth(configuration.multiWidth);
    }
  },[]);

  // handle height changes
  useEffect(() => {
    const newHeightFeedback: string[] = [];
      const numericHeight = Number(height);
      if (numericHeight < minHeight) {
        newHeightFeedback.push(minHeightViolated);
      }
      if (numericHeight > maxHeight) {
        newHeightFeedback.push(maxHeightViolated);
      }
    
  
    setSizeFeedback((prev) => {
      const otherMessages = (prev || []).filter(msg => !msg.toLowerCase().includes("höhe"));
      return [...otherMessages, ...newHeightFeedback];
    });
    if(newHeightFeedback.length ===  0){
      setSize({w: size?.w, h: height});
    }
    else{
      setSize({w: size?.w, h: undefined});
    }
  }, [height]);
  
  return (
    <>
      {!orderOfKeys && (
        <>
          <div className={style.container_big}>
            <div className={style.container_big_shell}>
              <Image src={displayedImageTwo!} alt="brand" width={230} height={230} />
            </div>
            <div id={style.right_line}>
              <span>{size?.h}</span>
            </div>
          </div>
          <div id={style.bottom_line}>
            {numberOfSections > 1 && multiWidth && (
              <div id={style.sections}>
                {Object.keys(multiWidth).map((i) => (
                  <span className={style.section} key={i}>
                    <span className={style.value}>
                      {multiWidth[i]}
                    </span>
                  </span>
                ))}
              </div>
            )}
            <span id={style.width}>{size?.w}</span>
          </div>
          <div id={style.inputs}>
            <div id={style.input_line}>
              <h5>
                <span>Width</span> <span id={style.range}>{minWidth}-{maxWidth}</span>
              </h5>
              {numberOfSections === 1 ? (
                <input
                  type="number"
                  onChange={(e) => updateSingleWidth(e, 'w')}
                  value={size?.w}
                  min={minWidth}
                  max={minHeight}
                  placeholder="breite"
                />
              ) : (
                [...Array(numberOfSections)].map((s, i) => (
                  <input
                    key={i}
                    type="number"
                    onChange={(e) => updateIndividualWidth(e,i)}
                    value={ multiWidth ? multiWidth[i] : 0}
                    min={sectionMinWidth}
                    max={sectionMaxWidth}
                    placeholder="breite"
                    pattern="^[1-9][0-9]*$"
                  />
                ))
              )}
            </div>
            <div id={style.input_line}>
              <h5>
                <span>Height Oben</span> <span id={style.range}>{minHeight}-{maxHeight}</span>
              </h5>
              <input
                type="number"
                onChange={(e) => updateHeight(e)}
                value={height}
                min={minHeight}
                max={maxHeight}
                placeholder="höhe"
              />
            </div>
          </div>
        </>
      )}
    </>
  );
}
