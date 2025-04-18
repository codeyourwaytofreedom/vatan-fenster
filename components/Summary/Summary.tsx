import styles from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';
import { useConfiguration } from '@/context/ConfigurationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { GroupKey, SubStyle } from '@/types/Configurator';
import { useState } from 'react';
import Sizer from '../Sizer/Sizer';
import { SelectionItem, windowStyles } from '@/data/configuration_options';

export default function SummaryDisplayer() {
  const { configuration, substyle, currentGroup, setCurrentStep, setCurrentGroup } =
    useConfiguration();
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

  // groupBasis
  const { material, brand, profile, style, type, cover, size } = configuration;
  const { colorExt, colorInt, colorMid, sealExt, sealInt, fenstergriffe } = configuration;
  const {
    glasspaket,
    glasspaketWarmeKante,
    ornament,
    sicherheitsverglasung,
    schallschutz,
    sprossen,
    druckausgleichsventil,
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
    colorMid,
    sealExt,
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

  const expandableGroups: { key: GroupKey; content: object }[] = [
    { key: 'farben', content: groupFarben },
    { key: 'verglasung', content: groupVerglasung },
  ];

  const valueExtractor = (value: object | boolean | string) => {
    if (typeof value === 'boolean') {
      return value;
    }
    if (typeof value === 'string') {
      return value;
    }
    if (typeof value === 'object') {
      if ('name' in value) {
        return value.name;
      }
      if ('option' in value) {
        return (value as SubStyle).option!.name;
      }
      return '--';
    }
    return '--';
  };

  const keyExtractor = (key: string) => {
    if (key === 'glasspaketWarmeKante') {
      return 'warme kante';
    }
    return key;
  };

  const selectBasisGroup = () => {
    if (currentGroup !== 'basis') {
      setTimeout(() => {
        setCurrentGroup('basis');
      }, slowAction);
    }
  };

  const handleExpandGroup = (groupKey: GroupKey) => {
    setTimeout(() => {
      if (currentGroup !== groupKey) {
        setCurrentGroup(groupKey);
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
                <span id={styles.title}>&#x2022; {key.toUpperCase()}</span>
                <span id={styles.value}>{valueExtractor(value) as string}</span>
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
                    (valueExtractor(value) as string).length < 25 ? styles.item : styles.itemGrid
                  }
                  onClick={() => handleShowStep(key)}
                  id={key}
                >
                  <span id={styles.title}>&#x2022; {keyExtractor(key).toUpperCase()}</span>
                  <div id={styles.value}>{valueExtractor(value) as string}</div>
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
