import styles from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';
import { useConfiguration } from '@/context/ConfigurationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import {
  Config,
  DobuleSelection,
  GroupKey,
  SelectionItem,
  Size,
  SubStyle,
  WindowMaterial,
  WindowStyle,
} from '@/types/Configurator';
import { useState } from 'react';
import Sizer from '../Sizer/Sizer';
import { windowStyles } from '@/data/selectionItems/basisData';
import { allSonnenschutzStepsKeys } from '@/data/selectionItems/sonnenschutzData';
import { priceLists } from '@/data/priceLists/priceLists';

export default function SummaryDisplayer() {
  const {
    configuration,
    substyle,
    currentGroup,
    setCurrentStep,
    setCurrentGroup,
    getStepsForGroup,
  } = useConfiguration();
  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const slowAction = 100;

  // group basis
  const {
    material,
    brand,
    profile,
    style,
    type,
    cover,
    size,
    multiHeight,
    multiWidth,
    obenMultiWidth,
    untenMultiWidth,
  } = configuration;
  // group farben
  const { colorExt, colorInt, dichtungAussen, dichtungInnen, sealInt, fenstergriffe } =
    configuration;
  // group verglasung
  const {
    glasspaket,
    glasspaketWarmeKante,
    ornament,
    sicherheitsverglasung,
    schallschutz,
    sprossen,
    druckausgleichsventil,
  } = configuration;
  // group zusatze
  const {
    sicherheitsbeschlage,
    verdecktLiegenderBeschlag,
    dünneSchweißnahtVPerfect,
    reedKontakt,
    montagevorbohrungen,
    lüftungssysteme,
    rahmenverbreiterung,
  } = configuration;

  const groupBasis = {
    material,
    brand,
    profile,
    style,
    type,
    cover,
    size,
    multiHeight,
    multiWidth,
    obenMultiWidth,
    untenMultiWidth,
  };

  const groupFarben = {
    colorExt,
    colorInt,
    dichtungAussen,
    dichtungInnen,
    sealInt,
    fenstergriffe,
  };

  const groupVerglasung = {
    glasspaket,
    glasspaketWarmeKante,
    ornament,
    sicherheitsverglasung,
    schallschutz,
    sprossen,
    druckausgleichsventil,
  };

  const groupZusatze = {
    sicherheitsbeschlage,
    verdecktLiegenderBeschlag,
    dünneSchweißnahtVPerfect,
    reedKontakt,
    montagevorbohrungen,
    lüftungssysteme,
    rahmenverbreiterung,
  };

  const groupSonnenschutz = Object.fromEntries(
    Object.entries(configuration).filter(([key]) => allSonnenschutzStepsKeys.includes(key))
  );

  const sonnenschutzSteps = getStepsForGroup('sonnenschutz');

  // include sonnenschutzSteps if cover is selected
  const allSteps =
    configuration.cover.key !== 'nein' ? { ...steps, sonnenschutz: sonnenschutzSteps } : steps;

  const expandableGroups: { key: GroupKey; content: object }[] = [
    { key: 'farben', content: groupFarben },
    { key: 'verglasung', content: groupVerglasung },
    { key: 'zusatze', content: groupZusatze },
  ];

  if (configuration.cover.key !== 'nein') {
    expandableGroups.push({ key: 'sonnenschutz', content: groupSonnenschutz });
  }

  const valueExtractor = (key: keyof Config, value: object | boolean | string) => {
    if (typeof value === 'boolean' || typeof value === 'string') {
      return value;
    }

    if ('category' in value && 'subCategory' in value) {
      const doubleSelection = value as DobuleSelection;
      if (doubleSelection.category.name === 'Nein') {
        return 'Nein';
      }
      return `${doubleSelection.category.name} - ${doubleSelection.subCategory.name || ''}`;
    }

    if (key === 'size') {
      return `Breite: ${(value as Size).w || '--'}, Höhe: ${(value as Size).h || '--'}`;
    }

    if (key === 'multiHeight' && 'untenHeight' in value && 'obenHeight' in value) {
      if (configuration.style.name === 'Oberlicht') {
        return `Oben: ${value.obenHeight} - Unten: ${value.untenHeight}`;
      }
      if (configuration.style.name === 'Unterlicht') {
        return `Oben: ${value.obenHeight} - Unten: ${value.untenHeight}`;
      }
    }

    if (key === 'multiWidth') {
      return Object.values(value).join(' - ');
    }

    if (key === 'obenMultiWidth') {
      return Object.values(value).join(' - ');
    }
    if (key === 'untenMultiWidth') {
      return Object.values(value).join(' - ');
    }

    if (key === 'rahmenverbreiterung') {
      const selection = value as SelectionItem;
      if (selection.name === 'Nein') {
        return 'Nein';
      }

      const ausgewahlenText = Object.entries(configuration.rahmenverbreiterungAuswahlen).reduce(
        (acc, [key, val]) => acc + `${key}: ${val} `,
        ''
      );

      return (
        `${selection.name} - Montiert: ${configuration.rahmenverbreitungMontiert.name}\n` +
        ausgewahlenText
      );
    }

    if (key === 'fenstergriffe') {
      const selection = value as { type: SelectionItem; choice: SelectionItem };
      return `${selection.type?.name} - ${selection.choice.name}`;
    }

    if (key === 'kastenDimensions' && 'w' in value && 'h' in value) {
      return `w: ${value.w || '--'}, h: ${value.h || '--'}`;
    }

    if (typeof value === 'object') {
      if ('name' in value) {
        return (value as { name: string }).name;
      }

      if ('option' in value) {
        return (value as SubStyle).option!.name;
      }

      return '--';
    }

    return '--';
  };

  const labelExtractor = (key: string) => {
    if (key === 'glasspaketWarmeKante') {
      return 'Warme Kante';
    }

    if (key === 'multiHeight') {
      return 'Höhe';
    }

    if (key === 'obenMultiWidth') {
      return 'Obere Breite';
    }

    if (key === 'untenMultiWidth') {
      return 'Untere Breite';
    }

    if (key === 'multiWidth') {
      return 'Breite';
    }

    const flatSteps = Object.values(allSteps).flat();

    const stepLabel = flatSteps.find((st) => st.key === key)?.name || '--';
    return stepLabel;
  };

  const selectBasisGroup = () => {
    if (currentGroup !== 'basis') {
      setTimeout(() => {
        setCurrentGroup('basis');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, slowAction);
    }
  };

  const handleExpandGroup = (groupKey: GroupKey) => {
    setTimeout(() => {
      if (currentGroup !== groupKey) {
        setCurrentGroup(groupKey);
        const groupSteps = getStepsForGroup(groupKey);
        setCurrentStep(groupSteps[0]);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
      if (expandedGroups?.includes(groupKey)) {
        return setExpandedGroups(expandedGroups.filter((gr) => gr !== groupKey));
      }
      setExpandedGroups([...expandedGroups, groupKey]);
    }, slowAction);
  };

  const handleShowStep = (key: string) => {
    setTimeout(() => {
      if (['oben', 'unten'].includes(key)) {
        setCurrentStep(allSteps[currentGroup].find((st) => st.key === 'type') || null);
        if (configuration.style.name === 'Oberlicht') {
          scrollToElement(key, 50);
        }
        if (configuration.style.name === 'Unterlicht') {
          if (key === 'oben') {
            scrollToElement('unten', 50);
          }
          if (key === 'unten') {
            scrollToElement('oben', 50);
          }
        }
        return;
      }
      let parentKey = Object.entries(allSteps).find(
        ([, value]) => Array.isArray(value) && value.some((item) => item.key === key)
      )?.[0] as GroupKey;

      if (key === 'glasspaketWarmeKante') {
        key = 'glasspaket';
        parentKey = 'verglasung';
      }

      setCurrentGroup(parentKey);
      setCurrentStep(allSteps[parentKey].find((st) => st.key === key) || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, slowAction);
  };

  const groupIsExpanded = (groupKey: string) => {
    return expandedGroups.includes(groupKey);
  };

  const findSizeImage = () => {
    const selectedStyle = windowStyles.find((sty) => sty.name === configuration['style'].name);
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find(
      (typ) => typ.name === (configuration.type as SelectionItem).name
    );
    return selectedType?.image;
  };

/*   const priceLists: Record<string, Record<number, Record<number, number>>> = {
    I5_F: I5_F,
    I5_FF: I5_FF,
    I5_DR: I5_DR,
    I5_DL: I5_DL,
    I5_DKR: I5_DKR,
    I5_DKL: I5_DKL,
    I5_K: I5_K,

    I5C_F: I5C_F,
    I5C_FF: I5C_FF,
    I5C_DR: I5C_DR,
    I5C_DL: I5C_DL,
    I5C_DKR: I5C_DKR,
    I5C_DKL: I5C_DKL,
    I5C_K: I5C_K,

    IE_F: IE_F,
    IE_FF: IE_FF,
    IE_DR: IE_DR,
    IE_DL: IE_DL,
    IE_DKR: IE_DKR,
    IE_DKL: IE_DKL,
    IE_K: IE_K,

    IEC_F: IEC_F,
    IEC_FF: IEC_FF,
    IEC_K: IEC_K,
    IEC_DL: IEC_DL,
    IEC_DR: IEC_DR,
    IEC_DKR: IEC_DKR,
    IEC_DKL: IEC_DKL,

    IL_DKL: IL_DKL,
    IL_DKR: IL_DKR,
    IL_DL: IL_DL,
    IL_DR: IL_DR,
    IL_F: IL_F,
    IL_FF: IL_FF,
    IL_K: IL_K
  } */

  const calculateAdditionalWindowPrice = (m2Price: number = 8, w: number, h: number) => {
    const additionalWindowPrice = w * h * m2Price * 2 / 1_000_000;
    const truncatedAdditionalWindowPrice = Math.floor(additionalWindowPrice * 100) / 100;
    return truncatedAdditionalWindowPrice;
  }

  const testPricing = () => {
    const selectedMaterial: WindowMaterial = configuration.material.key as WindowMaterial;
    const selectedWindowStyle: WindowStyle = configuration.style.key as WindowStyle;

    const priceListForSelectedWindowStyle = priceLists[selectedWindowStyle][selectedMaterial];

    const width = Number((size as Size).w) || 0;
    const height = Number((size as Size).h) || 0;

    //alert(selectedMaterial);
    //alert(selectedWindowStyle);


    if(width === 0 || height === 0) return;

    if(['flugel2', 'flugel3', 'oberlicht', 'unterlicht'].includes(configuration.style.key)){
      alert(`${configuration.style.key} not ready for pricing yett`);
      return;
    }

    // additional calculation for the glass
    // deafult is 2 layer of glass so multiply by 2
    const additionalWindowPrice = calculateAdditionalWindowPrice(8,width,height);
    alert(additionalWindowPrice);

    // adjust for overlicht and unterlicht
    const priceListKey = `${(configuration.profile as SelectionItem).key}_${(configuration.type as SelectionItem).key}`;

    let totalPrice: number;
    totalPrice = additionalWindowPrice;

    const priceListForSelectedType = priceListForSelectedWindowStyle[priceListKey];
    // take height as reference point
    for (const [key, value] of Object.entries(priceListForSelectedType)) {
      const keyAsNumber = Number(key);
      if(height === keyAsNumber || height < keyAsNumber){
        for(const [w, price] of Object.entries(value)){
          const wid = Number(w);
          if(width === wid || width < wid){
            totalPrice = totalPrice + price;
            alert(totalPrice);
            return;
          }
        }
        break;
      }
    }
    return null;
  };

  return (
    <div id={styles.summary}>
      <h3 onClick={()=>testPricing()}>Bestellübersicht</h3>
      <Sizer substyle={substyle} sizeImage={findSizeImage()!} summary={true} />
      <br />
      <div id={styles.items}>
        <button onClick={selectBasisGroup}>BASIS</button>
        {Object.entries(groupBasis).map(
          ([key, value]) =>
            value && (
              <div key={key} className={styles.item} onClick={() => handleShowStep(key)} id={key}>
                <span id={styles.title}>&#x2022; {labelExtractor(key)}</span>
                <span id={styles.value}>
                  {valueExtractor(key as keyof Config, value) as string}
                </span>
              </div>
            )
        )}
      </div>

      {expandableGroups.map((group) => (
        <div
          key={group.key}
          id={styles.items}
          className={expandedGroups.includes(group.key) ? styles.expanded : styles.collapsed}
        >
          <button onClick={() => handleExpandGroup(group.key)}>
            {group.key.toUpperCase()}
            <FontAwesomeIcon icon={groupIsExpanded(group.key) ? faChevronUp : faChevronDown} />
          </button>
          {Object.entries(group.content).map(
            ([key, value]) =>
              value && (
                <div
                  key={key}
                  className={
                    (valueExtractor(key as keyof Config, value) as string).length < 25
                      ? styles.item
                      : styles.itemGrid
                  }
                  onClick={() => handleShowStep(key)}
                  id={key}
                >
                  <span id={styles.title}>&#x2022; {labelExtractor(key)}</span>
                  <div id={styles.value}>
                    {valueExtractor(key as keyof Config, value) as string}
                  </div>
                </div>
              )
          )}
        </div>
      ))}

      <div id={styles.note}>
        <textarea name="note" placeholder="Geben Sie hier Ihre Sonderwünsche ein"></textarea>
      </div>
      <div id={styles.actions}>
        <button id={styles.add_to_chart}>
          <>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span style={{ marginLeft: '20px' }}>In den Warenkorb</span>
          </>
        </button>
      </div>
    </div>
  );
}
