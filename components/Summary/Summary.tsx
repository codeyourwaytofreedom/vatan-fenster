import styles from '../.././styles/KonfiguratorPage.module.css';
import { getColoringMultiplier, purifyConfig, scrollToElement } from '@/utils';
import { steps } from '@/data/steps';
import { useConfiguration } from '@/context/ConfigurationContext';
import { calculateTotalPriceForConfiguration } from '@/utils/priceCalculator';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { DobuleSelection, GroupKey, SelectionItem, Size, SubStyle } from '@/types/Configurator';
import { useEffect, useState } from 'react';
import Sizer from '../Sizer/Sizer';
import { windowStyles } from '@/data/selectionItems/basisData';
import { useModal } from '@/context/ModalContext';
import Infobox from '../1_General/Infobox/Infobox';
import { zusatzeOnlyOpeningWindowOptions } from '@/data/configurationData';

export default function SummaryDisplayer() {
  const {
    configuration,
    substyle,
    currentGroup,
    windowHandleNumber,
    setCurrentStep,
    setCurrentGroup,
    getStepsForGroup,
  } = useConfiguration();

  const [expandedGroups, setExpandedGroups] = useState<string[]>([]);
  const slowAction = 100;

  const { openModal, closeModal } = useModal();
  const [isSaving, setIsSaving] = useState(false);

  const groupBasis = configuration.basis;

  const groupFarben = configuration.farben;

  const groupVerglasung = configuration.verglasung;

  const groupZusatze = () => {
    if (windowHandleNumber > 0) {
      // no need to show rahmenverbreiterungAuswahlen in summary
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { rahmenverbreiterungAuswahlen, ...rest } = configuration.zusatze;
      return rest;
    }
    const trimmedZusatze = { ...configuration.zusatze };
    zusatzeOnlyOpeningWindowOptions.forEach((key) => {
      delete trimmedZusatze[key];
    });
    // no need to show rahmenverbreiterungAuswahlen in summary
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { rahmenverbreiterungAuswahlen, ...rest } = trimmedZusatze;
    return rest;
  };

  const sonnenschutzSteps = getStepsForGroup('sonnenschutz');
  const sonnenschutzStepKeys = sonnenschutzSteps.map((step) => step.key);
  const groupSonnenschutz = Object.fromEntries(
    Object.entries(configuration.sonnenschutz).filter(([key]) => sonnenschutzStepKeys.includes(key))
  );

  // include sonnenschutzSteps if cover is selected
  const allSteps =
    configuration.basis.cover.key !== 'nein'
      ? { ...steps, sonnenschutz: sonnenschutzSteps }
      : steps;

  const expandableGroups: { key: GroupKey; content: object }[] = [
    { key: 'farben', content: groupFarben },
    { key: 'verglasung', content: groupVerglasung },
    { key: 'zusatze', content: groupZusatze() },
  ];

  const excludedSteps = ['adapter'];

  if (configuration.basis.cover.key !== 'nein') {
    expandableGroups.push({ key: 'sonnenschutz', content: groupSonnenschutz });
  }

  const valueExtractor = (key: string, value: object | boolean | string | undefined) => {
    if (value === undefined) {
      return '--';
    }

    if (typeof value === 'boolean' || typeof value === 'string') {
      return value;
    }

    if ('category' in value && 'subCategory' in value) {
      const doubleSelection = value as DobuleSelection;
      if (doubleSelection.category.name === 'Nein') {
        return 'Nein';
      }
      const paar = 'paar' in value ? '-' + value.paar + ' Paar' : '';
      return `${doubleSelection.category.name} - ${doubleSelection.subCategory.name || ''}${paar}`;
    }

    if (key === 'size') {
      return `Breite: ${(value as Size).w || '--'}, Höhe: ${(value as Size).h || '--'}`;
    }

    if (key === 'multiHeight' && 'untenHeight' in value && 'obenHeight' in value) {
      if (configuration.basis.style.name === 'Oberlicht') {
        return `Oben: ${value.obenHeight} - Unten: ${value.untenHeight}`;
      }
      if (configuration.basis.style.name === 'Unterlicht') {
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

      const ausgewahlenText = Object.entries(
        configuration.zusatze.rahmenverbreiterungAuswahlen
      ).reduce((acc, [key, val]) => acc + `${key}: ${val} `, '');

      return (
        `${selection.name} - Montiert: ${configuration.zusatze.rahmenverbreitungMontiert.name}\n` +
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

    if (key === 'profileHeight') {
      return 'Profile Height';
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
        const firstSelectableStep = groupSteps.find((st) => !excludedSteps.includes(st.key));
        setCurrentStep(firstSelectableStep || groupSteps[0]);
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
        if (configuration.basis.style.name === 'Oberlicht') {
          scrollToElement({ elementId: key, offset: 50 });
        }
        if (configuration.basis.style.name === 'Unterlicht') {
          if (key === 'oben') {
            scrollToElement({ elementId: 'unten', offset: 50 });
          }
          if (key === 'unten') {
            scrollToElement({ elementId: 'oben', offset: 50 });
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
    const selectedStyle = windowStyles.find((sty) => sty.key === configuration.basis['style'].key);
    const typesForSelectedStyle = selectedStyle?.children?.type;
    const selectedType = typesForSelectedStyle?.find(
      (typ) => typ.key === (configuration.basis.type as SelectionItem).key
    );
    return selectedType?.image;
  };

  const addToBasket = async () => {
    if (isSaving) return;
    setIsSaving(true);
    openModal(
      <div style={{ padding: 30, minWidth: 240 }}>
        <p style={{ margin: 0, color: 'white' }}>Saving configuration...</p>
      </div>
    );
    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));
      const response = await fetch('/api/basket/addToBasket', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...purifyConfig(configuration, ['image', 'details', 'children', 'isActive', 'zoomable']),
          totalPrice: totalPrice ?? null,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add to basket');
      }

      await response.json();
    } catch (error) {
      console.error('Error adding to basket:', error);
    } finally {
      closeModal();
      setIsSaving(false);
    }
  };

  const [totalPrice, setTotalPrice] = useState<number>();

  useEffect(() => {
    const timeout = setTimeout(() => {
      try {
        // dont calculate price when no valid size is available
        if (!configuration.basis.size) {
          setTotalPrice(undefined);
          return;
        }
        const total = calculateTotalPriceForConfiguration(configuration);
        setTotalPrice(total === null ? undefined : total);
      } catch {}
    }, 200);

    return () => clearTimeout(timeout);
  }, [configuration]);

  useEffect(() => {
    const { min10 } = getColoringMultiplier({
      colorExteriorCode: configuration.farben.colorExt.colorCode!,
      colorInteriorCode: configuration.farben.colorInt.colorCode!,
      colorMidKey: configuration.farben.colorMid?.key,
      selectedProfileKey: configuration.basis.profile.key,
    });
    if (min10) {
      openModal(
        <Infobox
          title="Achtung"
          details="Mevcut profil rengi seçimi için ilave ücret ödeyeceksiniz. En az 10 adet pencere eklemeniz 
          halinde ücret değişecek. HüSEYİN bura için Almanca metin verirsin"
          closeText="Schließen"
        />
      );
    }
  }, []);

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
                  onClick={!excludedSteps.includes(key) ? () => handleShowStep(key) : undefined}
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
        <button id={styles.add_to_chart} onClick={addToBasket} disabled={isSaving}>
          <>
            <FontAwesomeIcon icon={faShoppingCart} />
            <span style={{ marginLeft: '20px' }}>In den Warenkorb</span>
          </>
        </button>
      </div>
    </div>
  );
}
