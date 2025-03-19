import styles from '../.././styles/KonfiguratorPage.module.css';
import { scrollToElement } from '@/utils';
import { steps } from '@/data/steps';
import { useConfiguration } from '@/context/ConfigurationContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import SizerSummary from '../SizerSummary/SizerSummary';
import { GroupKey, SubStyle } from '@/types/Configurator';
import { useEffect, useState } from 'react';

export default function SummaryDisplayer() {
  const { configuration, currentGroup, setCurrentStep, setCurrentGroup } = useConfiguration();
  const [expandeddGroup, setExpandedGroup] = useState<string | null>(null);

  const handleShowStep = (key: string) => {
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
  };

  // groupBasis
  const { material, brand, profile, style, type, cover, size } = configuration;
  const { colorExt, colorInt, colorMid, sealExt, sealInt, handle } = configuration;
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
    handle,
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

  const expandableGroups: {key: GroupKey, content: object}[] = [
    { key: 'farben', content: groupFarben },
    { key: 'verglasung', content: groupVerglasung },
  ];

  const valueExtractor = (value: object | boolean | string) => {
    if (typeof value === 'boolean') {
      return 'boolean';
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

  const selectBasisGroup = () => {
    if (currentGroup !== 'basis') {
      setCurrentGroup('basis');
    }
  };

  const handleExpandGroup = (groupKey: GroupKey) => {
    if(currentGroup !== groupKey){
      setCurrentGroup(groupKey);
    }
    if (groupKey === expandeddGroup) {
      return setExpandedGroup(null);
    }
    setExpandedGroup(groupKey);
  };

  const groupIsExpanded = (groupKey: string) => {
    return expandeddGroup === groupKey;
  };

  useEffect(()=>{
    if(currentGroup && currentGroup !== expandeddGroup){
      setExpandedGroup(currentGroup);
    }
  },[currentGroup])

  return (
    <div id={styles.summary}>
      <h3>Bestellübersicht</h3>
      <SizerSummary />
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
          className={expandeddGroup === group.key ? styles.expanded : styles.collapsed}
        >
          <button onClick={() => handleExpandGroup(group.key)}>
            {group.key.toUpperCase()}{' '}
            <FontAwesomeIcon icon={groupIsExpanded(group.key) ? faChevronUp : faChevronDown} />
          </button>
          {Object.entries(group.content).map(
            ([key, value]) =>
              value && (
                <div key={key} className={styles.item} onClick={() => handleShowStep(key)} id={key}>
                  <span id={styles.title}>&#x2022; {key.toUpperCase()}</span>
                  <span id={styles.value}>{valueExtractor(value) as string}</span>
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
