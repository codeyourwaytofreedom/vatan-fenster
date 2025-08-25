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
} from '@/types/Configurator';
import { useEffect, useState } from 'react';
import Sizer from '../Sizer/Sizer';
import { windowStyles } from '@/data/selectionItems/basisData';
import { allSonnenschutzStepsKeys } from '@/data/selectionItems/sonnenschutzData';

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

  const { calculateTotalPrice } = useConfiguration();

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
    const selectedStyle = windowStyles.find((sty) => sty.key === configuration['style'].key);
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find(
      (typ) => typ.key === (configuration.type as SelectionItem).key
    );
    return selectedType?.image;
  };

  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        // dont calculate price when no valid size is available
        if (!configuration.size) return;

        const colorCodeExt = configuration.colorExt.colorCode;

        let totalPrice: number = 0;
        setTotalPrice(totalPrice);

        // if style is Oberlicht, calculate for 2 components seperately
        if (
          configuration.style.key === 'oberlicht' &&
          'oben' in configuration.type &&
          'unten' in configuration.type
        ) {
          /* Calculate oben part */
          const sectionNumberOben = configuration.type.oben?.sectionNumber || 1;
          const windowStyleOben =
            sectionNumberOben === 1
              ? windowStyles.find((st) => st.key === 'flugel1')
              : sectionNumberOben === 2
                ? windowStyles.find((st) => st.key === 'flugel2')
                : windowStyles.find((st) => st.key === 'flugel3');
          const windowProfileOben = configuration.profile;
          const windowTypeOben = configuration.type.oben!;
          const obenPrice = calculateTotalPrice(
            configuration.material.key,
            windowProfileOben.key,
            windowStyleOben!.key,
            windowTypeOben.key,
            Number((size as Size).w),
            Number(configuration.multiHeight!['obenHeight']),
            configuration.obenMultiWidth,
            colorCodeExt!,
            'oben'
          );
          /* Calculate unten part */
          const sectionNumberUnten = configuration.type.unten?.sectionNumber || 1;
          const windowStyleUnten =
            sectionNumberUnten === 1
              ? windowStyles.find((st) => st.key === 'flugel1')
              : sectionNumberUnten === 2
                ? windowStyles.find((st) => st.key === 'flugel2')
                : windowStyles.find((st) => st.key === 'flugel3');
          const windowProfileUnten = configuration.profile;
          const windowTypeUnten = configuration.type.unten!;
          const untenPrice = calculateTotalPrice(
            configuration.material.key,
            windowProfileUnten.key,
            windowStyleUnten!.key,
            windowTypeUnten.key,
            Number((size as Size).w),
            Number(configuration.multiHeight!['untenHeight']),
            configuration.untenMultiWidth,
            colorCodeExt!,
            'unten'
          );
          totalPrice = (obenPrice ?? 0) + (untenPrice ?? 0);
        }

        // if style is Unterlicht, calculate for 2 components seperately
        if (
          configuration.style.key === 'unterlicht' &&
          'oben' in configuration.type &&
          'unten' in configuration.type
        ) {
          /* Calculate oben part */
          const sectionNumberOben = configuration.type.unten?.sectionNumber || 1;
          const windowStyleOben =
            sectionNumberOben === 1
              ? windowStyles.find((st) => st.key === 'flugel1')
              : sectionNumberOben === 2
                ? windowStyles.find((st) => st.key === 'flugel2')
                : windowStyles.find((st) => st.key === 'flugel3');
          const windowProfileOben = configuration.profile;
          const windowTypeOben = configuration.type.unten!;
          const obenPrice = calculateTotalPrice(
            configuration.material.key,
            windowProfileOben.key,
            windowStyleOben!.key,
            windowTypeOben.key,
            Number((size as Size).w),
            Number(configuration.multiHeight!['obenHeight']),
            configuration.obenMultiWidth,
            colorCodeExt!,
            'unten'
          );

          /* Calculate unten part */
          const sectionNumberUnten = configuration.type.oben?.sectionNumber || 1;
          const windowStyleUnten =
            sectionNumberUnten === 1
              ? windowStyles.find((st) => st.key === 'flugel1')
              : sectionNumberUnten === 2
                ? windowStyles.find((st) => st.key === 'flugel2')
                : windowStyles.find((st) => st.key === 'flugel3');
          const windowProfileUnten = configuration.profile;
          const windowTypeUnten = configuration.type.oben!;
          const untenPrice = calculateTotalPrice(
            configuration.material.key,
            windowProfileUnten.key,
            windowStyleUnten!.key,
            windowTypeUnten.key,
            Number((size as Size).w),
            Number(configuration.multiHeight!['untenHeight']),
            configuration.untenMultiWidth,
            colorCodeExt!,
            'oben'
          );

          totalPrice = (obenPrice ?? 0) + (untenPrice ?? 0);
        }

        if (['flugel1', 'flugel2', 'flugel3'].includes(configuration.style.key)) {
          totalPrice =
            calculateTotalPrice(
              configuration.material.key,
              configuration.profile.key,
              configuration.style.key,
              (configuration.type as SelectionItem).key,
              Number((size as Size).w),
              Number((size as Size).h),
              configuration.multiWidth,
              colorCodeExt!
            ) || 0;
        }

        // round for 2 decimal points
        totalPrice = Math.round(totalPrice * 100) / 100;
        setTotalPrice(totalPrice);
      } catch {}
    }, 200);

    return () => clearTimeout(timeout);
  }, [
    size,
    configuration.material,
    configuration.profile,
    configuration.style,
    configuration.type,
    configuration.size,
    calculateTotalPrice,
    configuration.multiWidth,
    configuration.obenMultiWidth,
    configuration.untenMultiWidth,
    configuration.multiHeight,
    configuration.colorExt.colorCode,
  ]);

  return (
    <div id={styles.summary}>
      <h3>Bestellübersicht</h3>
      <Sizer substyle={substyle} sizeImage={findSizeImage()!} summary={true} />
      <br />
      <div className={styles.price} style={{ height: totalPrice !== undefined ? '30px' : '0' }}>
        {totalPrice !== undefined && <h2>{totalPrice}</h2>}
      </div>
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
