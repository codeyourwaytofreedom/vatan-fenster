import styles from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';
import { useConfiguration } from '@/context/ConfigurationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DobuleSelection, GroupKey, SelectionItem, SubStyle } from '@/types/Configurator';
import { useState } from 'react';
import Sizer from '../Sizer/Sizer';
import { windowStyles } from '@/data/selectionItems/basisData';

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

  const handleShowStep = (key: string) => {
    setTimeout(() => {
      if (['oben', 'unten'].includes(key)) {
        setCurrentStep(steps[currentGroup].find((st) => st.key === 'type') || null);
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
      let parentKey = Object.entries(steps).find(
        ([, value]) => Array.isArray(value) && value.some((item) => item.key === key)
      )?.[0] as GroupKey;

      if (key === 'glasspaketWarmeKante') {
        key = 'glasspaket';
        parentKey = 'verglasung';
      }

      setCurrentGroup(parentKey);
      setCurrentStep(steps[parentKey].find((st) => st.key === key) || null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, slowAction);
  };

  // group basis
  const { material, brand, profile, style, type, cover, size } = configuration;
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

  const groupSonnenschutz = {};

  //const sonnenschutzSteps = getStepsForGroup('sonnenschutz');

  const expandableGroups: { key: GroupKey; content: object }[] = [
    { key: 'farben', content: groupFarben },
    { key: 'verglasung', content: groupVerglasung },
    { key: 'zusatze', content: groupZusatze },
  ];

  if (configuration.cover.key !== 'nein') {
    expandableGroups.push({ key: 'sonnenschutz', content: groupSonnenschutz });
  }

  const valueExtractor = (key: string, value: object | boolean | string) => {
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
    const flatSteps = Object.values(steps).flat();
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

  return (
    <div id={styles.summary}>
      <h3>Bestellübersicht</h3>
      <Sizer substyle={substyle} sizeImage={findSizeImage()!} summary={true} />
      <br />
      <div id={styles.items}>
        <button onClick={selectBasisGroup}>BASIS</button>
        {Object.entries(groupBasis).map(
          ([key, value]) =>
            value && (
              <div key={key} className={styles.item} onClick={() => handleShowStep(key)} id={key}>
                <span id={styles.title}>&#x2022; {labelExtractor(key)}</span>
                <span id={styles.value}>{valueExtractor(key, value) as string}</span>
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
                    (valueExtractor(key, value) as string).length < 25
                      ? styles.item
                      : styles.itemGrid
                  }
                  onClick={() => handleShowStep(key)}
                  id={key}
                >
                  <span id={styles.title}>&#x2022; {labelExtractor(key)}</span>
                  <div id={styles.value}>{valueExtractor(key, value) as string}</div>
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
