import { sonnenschutzApplicabilitySizes } from '@/data/common/common';
import {
  initialConfiguration,
  initialSubstyle,
  optionNo,
  zusatzeOnlyOpeningWindowOptions,
} from '@/data/configurationData';
import { minMaxSizes } from '@/data/minMaxSizes/minMaxSizes';
import { weightMultiplier } from '@/data/priceLists/sonnenschutz/antriebsartPrices';
import { innenAussenCompatibleText } from '@/data/priceLists/sprossen/sprossen';
import { sprossenCards } from '@/data/selectionItems/verglasungData';
import { sonnenschutzStepPacks, steps } from '@/data/steps';
import {
  FensterConfig,
  GroupKey,
  MinMaxSet,
  MinMaxSize,
  MinMaxSizes,
  SelectionItem,
  Step,
  SubStyle,
  WindowMaterial,
  SonnenschutzKey,
} from '@/types/Configurator';
import {
  getSonnenschutzPartitionPossibilities as getSonnenschutzPartitionPossibilitiesUtil,
  showSonnenshutzNotApplicableWarning as showSonnenshutzNotApplicableWarningUtil,
} from '@/utils/sonnenschutzPricingUtil';
import { calculateTotalPriceForConfiguration } from '@/utils/priceCalculator';
import { createContext, useState, ReactNode, useContext, useEffect } from 'react';
import { getAntriebsartAvailability } from '@/utils/sonnenschutzPartition';

// Define the context type
interface ConfigurationContextType {
  configuration: FensterConfig;
  currentGroup: GroupKey;
  currentStep: Step | null;
  currentStepGroup: Step[];
  isLastStepInGroup: boolean;
  substyle: SubStyle;
  previousStep: Step;
  previousGroup: GroupKey;
  orderOfKeys: string[] | undefined;
  windowSectionCount: number;
  windowHandleNumber: number;
  motorCount: number;
  setConfiguration: React.Dispatch<React.SetStateAction<FensterConfig>>;
  setCurrentGroup: React.Dispatch<React.SetStateAction<GroupKey>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<Step | null>>;
  setSubStyle: React.Dispatch<React.SetStateAction<SubStyle>>;
  moveToNextStep: () => void;
  movePreviousGroup: () => void;
  moveNextGroup: () => void;
  getStepsForGroup: (key: GroupKey) => Step[];
  calculateTotalPrice: () => number | null | undefined;
  getMinMaxSizes: (
    selectedMaterial: SelectionItem<WindowMaterial>,
    selectedStyle: SelectionItem,
    selectedProfile: SelectionItem,
    selectedType: SelectionItem
  ) => MinMaxSizes;
  showSonnenshutzNotApplicableWarning: () => boolean;
  getSonnenschutzPartitionPossibilities: () => number[];
}

// Create the context with a default value
const ConfiurationContext = createContext<ConfigurationContextType | undefined>(undefined);

// Provider component
export const ConfigurationProvider = ({ children }: { children: ReactNode }) => {
  const [configuration, setConfiguration] = useState<FensterConfig>(initialConfiguration);
  const [group, setCurrentGroup] = useState<GroupKey>('basis');
  const [currentStep, setCurrentStep] = useState<Step | null>(null);
  const [substyle, setSubStyle] = useState<SubStyle>(initialSubstyle);
  const [motorCount, setMotorCount] = useState<number>(1);

  const orderOfKeys =
    configuration.basis.style.name === 'Oberlicht'
      ? ['oben', 'unten']
      : configuration.basis.style.name === 'Unterlicht'
        ? ['unten', 'oben']
        : undefined;

  const getStepsForGroup = (group: GroupKey) => {
    // for sonnenschutz group, steps are built dynamically according to cover selection in Basis
    if (group === 'sonnenschutz') {
      const stepsForCover =
        sonnenschutzStepPacks[
          configuration.basis.cover.key as keyof typeof sonnenschutzStepPacks
        ] || [];
      if (motorCount === 2) {
        return stepsForCover.filter((step) => step.key !== 'antriebsseite');
      }
      return stepsForCover;
    }
    // farben steps changge if the window type has no handle
    if (group === 'farben') {
      let handleExists;
      if (
        'option' in configuration.basis.type &&
        'oben' in configuration.basis.type &&
        'unten' in configuration.basis.type
      ) {
        handleExists =
          configuration.basis.type.oben?.handleNumber &&
          configuration.basis.type.unten?.handleNumber;
        if (!handleExists) {
          return steps[group].filter((st) => st.key !== 'fenstergriffe');
        }
      }
      if (!Boolean('option' in configuration.basis.type)) {
        handleExists = (configuration.basis.type as SelectionItem).handleNumber;
      }
      if (!handleExists) {
        return steps[group].filter((st) => st.key !== 'fenstergriffe');
      }
    }
    // default steps for static groups
    return steps[group];
  };

  const currentStepPack = getStepsForGroup(group);

  const isLastStepInGroup = currentStep?.key === currentStepPack[currentStepPack.length - 1]?.key;

  const allGroups: GroupKey[] = ['basis', 'farben', 'verglasung', 'zusatze', 'sonnenschutz'];
  const visibleGroups: GroupKey[] =
    configuration.basis.cover.key === 'nein'
      ? allGroups.filter((g) => g !== 'sonnenschutz')
      : allGroups;

  const currentGroupIndex = visibleGroups.indexOf(group);
  const previousGroup = visibleGroups[currentGroupIndex - 1];

  const currentStepIndex = currentStepPack.indexOf(currentStep!);
  const nextStep = currentStepPack[currentStepIndex + 1];
  const previousStep = currentStepPack[currentStepIndex - 1];

  const windowSectionCount =
    'oben' in configuration.basis.type
      ? (configuration.basis.type.oben?.sectionNumber ?? 1) +
        (configuration.basis.type.unten?.sectionNumber ?? 1)
      : (configuration.basis.type.sectionNumber ?? 1);

  const windowHandleNumberTotal =
    'oben' in configuration.basis.type
      ? (configuration.basis.type.oben?.handleNumber ?? 0) +
        (configuration.basis.type.unten?.handleNumber ?? 0)
      : (configuration.basis.type.handleNumber ?? 0);

  const insektenschutzKey = configuration.sonnenschutz?.revisionsöffnung?.key.includes(
    'insektenschutz'
  )
    ? 'withInsektenschutz'
    : 'withoutInsektenschutz';

  const { sonnenschutzSectionMinWidth, sonnenschutzSectionMaxWidth } =
    sonnenschutzApplicabilitySizes[insektenschutzKey];

  const moveNextGroup = () => {
    const currentGroupIndex = visibleGroups.indexOf(group);
    const nextGroup = visibleGroups[currentGroupIndex + 1];
    const nextGroupSteps = getStepsForGroup(nextGroup);
    const firstStepInGroup = nextGroupSteps?.[0];
    if (nextGroup) {
      setTimeout(() => {
        setCurrentGroup(nextGroup);
        setCurrentStep(firstStepInGroup);
      }, 300);
    }
  };

  const movePreviousGroup = () => {
    if (previousGroup) {
      setTimeout(() => {
        setCurrentGroup(previousGroup);
      }, 300);
    }
  };

  const moveToNextStep = () => {
    if (nextStep) {
      setTimeout(() => {
        setCurrentStep(nextStep);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 300);
    }
    if (!nextStep) {
      moveNextGroup();
    }
  };

  const getMinMaxSizes = (
    selectedMaterial: SelectionItem<WindowMaterial>,
    selectedStyle: SelectionItem,
    selectedProfile: SelectionItem,
    selectedType: SelectionItem
  ) => {
    const selectedMaterialKey = selectedMaterial.key;
    const selectedStyleKey = selectedStyle.key;
    const selectedProfileKey = selectedProfile.key;
    const selectedTypeKey = (selectedType as SelectionItem).key;

    const sizesByMaterial = minMaxSizes[selectedMaterialKey as keyof typeof minMaxSizes];
    const sizesByStyle = sizesByMaterial?.[selectedStyleKey as keyof typeof sizesByMaterial];
    const sizesByProfile = sizesByStyle?.[selectedProfileKey as keyof typeof sizesByStyle];
    const sizesByType = sizesByProfile?.[selectedTypeKey];

    if (selectedStyle.key)
      if (sizesByType) {
        // if price table exists for selected window type, extract the min-max sizes from the table
        const { width, height } = sizesByType;

        const minWidth = (width as MinMaxSet).min;
        const maxWidth = (width as MinMaxSet).max;

        const minHeight = (height as MinMaxSet).min;
        const maxHeight = (height as MinMaxSet).max;
        return {
          minWidth,
          maxWidth,
          minHeight,
          maxHeight,
        } as MinMaxSizes;
      }
    // no price list available so can't extract minMaxSizes

    // flugel1 min-max values for different types available for selected profile
    // F, FF, K, DL, DR, DKL, DKR
    // so calculate the min-max sizes via aggregating each section's min-max values
    const minMaxSizesForSingleSections =
      sizesByMaterial.flugel1[selectedProfileKey as keyof typeof sizesByMaterial.flugel1];

    // selected type's sections --> ie F+F --> DK + DL
    const selectedTypeSections = selectedType.sections;

    // for each section in the selected type, get min-max sizes
    let minWidthDerivedFromSections = 0;
    let maxWidthDerivedFromSections = 0;
    const minHeightForEachSection: number[] = [];
    const maxHeightForEachSection: number[] = [];

    const sectionsMinWidthPack: Record<string, number> = {};
    const sectionsMaxWidthPack: Record<string, number> = {};

    selectedTypeSections?.forEach((section) => {
      const minMaxForSingleSectionInSelectedType = minMaxSizesForSingleSections[section];
      const { width, height } = minMaxForSingleSectionInSelectedType as MinMaxSize;
      const minWidthForSection = width.min;
      const maxWidthForSection = width.max;

      sectionsMinWidthPack[section] = minWidthForSection;
      sectionsMaxWidthPack[section] = maxWidthForSection;

      minHeightForEachSection.push(height.min);
      maxHeightForEachSection.push(height.max);

      // calculate minWidth by summing minWidth values for each section
      minWidthDerivedFromSections += minWidthForSection;

      // calculate maxWidth by summing maxWidth values for each section
      maxWidthDerivedFromSections += maxWidthForSection;
    });

    // from all sections' minHeight, take the biggest
    const minHeight = Math.max(...minHeightForEachSection);

    // from all sections' maxHeight, take the smallest
    const maxHeight = Math.min(...maxHeightForEachSection);

    return {
      // total window width can never be greater than 4800
      minWidth: Math.min(minWidthDerivedFromSections, 4800),
      maxWidth: Math.min(maxWidthDerivedFromSections, 4800),
      minHeight: minHeight,
      maxHeight: maxHeight,
      // provide each section's minWidth so that sizer can use it an minSectionWidth
      sectionsMinWidthPack,
      sectionsMaxWidthPack,
    } as MinMaxSizes;
  };

  const getSonnenschutzPartitionPossibilities = () =>
    getSonnenschutzPartitionPossibilitiesUtil(
      configuration,
      sonnenschutzSectionMinWidth,
      sonnenschutzSectionMaxWidth
    );

  /* ------------------------- PRICING ------------------------- */

  const calculateTotalPrice = () => calculateTotalPriceForConfiguration(configuration);

  const showSonnenshutzNotApplicableWarning = () =>
    showSonnenshutzNotApplicableWarningUtil(configuration);

  /* ------------------------- PRICING ------------------------- */

  const sonnenschutPartitionPossibilities = getSonnenschutzPartitionPossibilities();

  useEffect(() => {
    setConfiguration((prev) => {
      if (prev.basis.cover.key === 'nein') {
        return prev;
      }
      const nextSonnenschutz = { ...prev.sonnenschutz };
      Object.keys(nextSonnenschutz).forEach((key) => {
        delete nextSonnenschutz[key as keyof typeof nextSonnenschutz];
      });
      return {
        ...prev,
        basis: {
          ...prev.basis,
          cover: optionNo as SelectionItem<SonnenschutzKey>,
        },
        sonnenschutz: nextSonnenschutz,
      };
    });
  }, [configuration.basis.style, configuration.basis.type]);

  // for Lamellenart subcategory, select the first of possible partitions
  useEffect(() => {
    if (configuration.basis.cover.key !== 'nein') {
      if (sonnenschutPartitionPossibilities?.length > 0 && !showSonnenshutzNotApplicableWarning()) {
        const sonnenschutzSteps = getStepsForGroup('sonnenschutz');
        const lamellenartStep = sonnenschutzSteps.find((st) => st.key === 'lamellenart');

        if (!lamellenartStep || !('props' in lamellenartStep)) {
          return;
        }

        if (!('subCategoryItems' in lamellenartStep.props!)) {
          return;
        }

        const allPartitionOptions = Object.values(lamellenartStep.props?.subCategoryItems)[0];
        const partitionsPossible = getSonnenschutzPartitionPossibilities();

        const possibleOptions = allPartitionOptions.filter((o) =>
          partitionsPossible.includes(Number(o.key))
        );

        const styleKey = configuration.basis.style.key;
        const width = Number(configuration.basis.size?.w ?? 0);
        const height = Number(configuration.basis.size?.h ?? 0);
        const sectionNumber =
          styleKey === 'flugel1'
            ? 1
            : styleKey === 'flugel2'
              ? 2
              : styleKey === 'flugel3'
                ? 3
                : ((configuration.basis.type as SubStyle).oben?.sectionNumber ?? 1);
        const multiWidth =
          styleKey === 'oberlicht' || styleKey === 'unterlicht'
            ? Object.values(configuration.basis.obenMultiWidth ?? {})
            : Object.values(configuration.basis.multiWidth ?? {});

        const lamellenartOptionToApply = possibleOptions[0];

        const antriebsartAvailability = getAntriebsartAvailability({
          width,
          height,
          multiWidth,
          sectionNumber,
          teilungKey: String(lamellenartOptionToApply.key),
        });
        console.log('antriebsartAvailability', antriebsartAvailability);

        const antriebsartStep = sonnenschutzSteps.find((st) => st.key === 'antriebsart');
        if (!antriebsartStep || !('props' in antriebsartStep)) {
          return;
        }
        if (!('categoryItems' in antriebsartStep.props!)) {
          return;
        }
        const antriebsartCategories = antriebsartStep.props!.categoryItems as SelectionItem[];
        const antriebsartSubCategories =
          'subCategoryItems' in antriebsartStep.props!
            ? (antriebsartStep.props!.subCategoryItems as Record<string, SelectionItem[]>)
            : {};

        const antriebsartPriority: Array<keyof typeof antriebsartAvailability> = [
          'gurt',
          'motor',
          'kurbel',
        ];
        const antriebsartKeyToUse = antriebsartPriority.find((key) => antriebsartAvailability[key]);
        const antriebsartCategory = antriebsartKeyToUse
          ? antriebsartCategories.find((c) => c.key === antriebsartKeyToUse)
          : undefined;
        const antriebsartSubCategory = antriebsartCategory
          ? antriebsartSubCategories[antriebsartCategory.key]?.[0]
          : undefined;

        if (!antriebsartCategory || !antriebsartSubCategory) {
          return;
        }

        setConfiguration((pr) => {
          const existingCategory = pr.sonnenschutz.lamellenart?.category;
          const fallbackCategory =
            'categoryItems' in lamellenartStep.props!
              ? (lamellenartStep.props!.categoryItems as SelectionItem[])[0]
              : undefined;
          const categoryToUse = existingCategory ?? fallbackCategory;
          if (!categoryToUse) {
            return pr;
          }
          return {
            ...pr,
            sonnenschutz: {
              ...pr.sonnenschutz,
              lamellenart: {
                category: categoryToUse,
                subCategory: lamellenartOptionToApply,
              },
              antriebsart: {
                category: antriebsartCategory,
                subCategory: antriebsartSubCategory,
              },
            },
          };
        });
      }
    }
  }, [
    configuration.basis.size,
    sonnenschutPartitionPossibilities?.length,
    configuration.basis.cover,
  ]);

  // if sprossen color is custom-color for innen-aussen, when innen-aussen combination changes,
  // reset the sprossen color
  useEffect(() => {
    const colorCodeExt = configuration.farben.colorExt.colorCode;
    const colorCodeInt = configuration.farben.colorInt.colorCode;
    const intExtDifferent =
      colorCodeExt !== '0' && colorCodeInt !== '0' && colorCodeExt !== colorCodeInt;

    const ausfgesetzeSelected = configuration.verglasung.sprossen
      .split('-')[0]
      .includes('Aufgesetzte');
    const intExtDifferentForAufgesetzte =
      ausfgesetzeSelected && (colorCodeExt !== '0' || colorCodeInt !== '0');

    if (
      !intExtDifferent &&
      !intExtDifferentForAufgesetzte &&
      configuration.verglasung.sprossen.includes(innenAussenCompatibleText)
    ) {
      const sprossenWidthItems = sprossenCards.find(
        (sp) => sp.name === configuration.verglasung.sprossen.split('-')[0]
      )?.items;
      const width = configuration.verglasung.sprossen.split('-')[1];
      const defaultColors = sprossenWidthItems?.find((it) => it.name === width)?.colors;
      const newColor = defaultColors![0].name;
      const newSprossen = configuration.verglasung.sprossen.replace(
        innenAussenCompatibleText,
        newColor
      );
      setConfiguration((pr) => {
        return {
          ...pr,
          verglasung: {
            ...pr.verglasung,
            sprossen: newSprossen,
          },
        };
      });
    }
  }, [
    configuration.farben.colorExt,
    configuration.farben.colorInt,
    configuration.verglasung.sprossen,
  ]);

  // when type changes, if new type is single-flugel, reset sicherheitsbeschlage selection
  useEffect(() => {
    if (windowSectionCount < 2) {
      if (configuration.zusatze.sicherheitsbeschlage.category.key === 'ja') {
        setConfiguration((pr) => {
          return {
            ...pr,
            zusatze: {
              ...pr.zusatze,
              sicherheitsbeschlage: {
                category: optionNo,
                subCategory: undefined,
              },
            },
          };
        });
      }
    }
  }, [configuration.basis.type]);

  // when profile changes, if aufbohrschutz is selected with IE or IEC profile, reset to basissicherheit
  useEffect(() => {
    if (
      configuration.zusatze.sicherheitsbeschlage.subCategory?.key === 'aufbohrschutz' &&
      ['IE', 'IEC'].includes(configuration.basis.profile.key)
    ) {
      setConfiguration((pr) => {
        return {
          ...pr,
          sicherheitsbeschlage: {
            category: pr.zusatze.sicherheitsbeschlage.category,
            subCategory: {
              key: 'basissicherheit',
              name: 'Basissicherheit',
            },
          },
        };
      });
    }
  }, [configuration.basis.profile]);

  // when window has no opening flugel, reset options which are only for opening windows in zusatze group
  useEffect(() => {
    if (windowHandleNumberTotal === 0) {
      zusatzeOnlyOpeningWindowOptions.forEach((optionKey) => {
        if (
          typeof configuration.zusatze[optionKey] === 'object' &&
          configuration.zusatze[optionKey] &&
          'category' in configuration.zusatze[optionKey]
        ) {
          setConfiguration((pr) => {
            return {
              ...pr,
              zusatze: {
                ...pr.zusatze,
                [optionKey]: {
                  category: optionNo,
                  subCategory: undefined,
                },
              },
            };
          });
        } else if ((configuration.zusatze[optionKey] as SelectionItem).key === 'ja') {
          setConfiguration((pr) => {
            return {
              ...pr,
              zusatze: {
                ...pr.zusatze,
                [optionKey]: optionNo,
              },
            };
          });
        }
      });
    }
  }, [windowHandleNumberTotal]);

  // --------
  useEffect(() => {
    const verlangerung = configuration.sonnenschutz.verlangerung;
    const extension = verlangerung?.name ? parseInt(verlangerung.name) : 0;
    if (extension > 30 && 'montageartRollladen' in configuration.sonnenschutz) {
      const selectedmontageartRollladen = configuration.sonnenschutz
        .montageartRollladen as SelectionItem;
      if (selectedmontageartRollladen.key !== 'nein') {
        setConfiguration((pr) => {
          return {
            ...pr,
            sonnenschutz: {
              ...pr.sonnenschutz,
              montageartRollladen: { key: 'nein', name: 'Ohne Rollladenmontage' },
            },
          };
        });
      }
    }
  }, [configuration.sonnenschutz.verlangerung]);

  useEffect(() => {
    const size = configuration.basis.size;
    if (!size) {
      setMotorCount(1);
      return;
    }

    const width = Number(size.w) || 0;
    const height = Number(size.h) || 0;

    let additionalWidth = 0;
    if ('montageartRollladen' in configuration.sonnenschutz) {
      const montageartRollladenKey = (
        configuration.sonnenschutz.montageartRollladen as SelectionItem
      ).key;
      const { links, rechts } = configuration.zusatze.rahmenverbreiterungAuswahlen;
      const horizontalExtension = links + rechts;
      if (horizontalExtension > 0 && montageartRollladenKey === 'mrv') {
        additionalWidth = horizontalExtension;
      }
    }

    const totalWidth = width + additionalWidth;
    const area = (totalWidth * height) / 1000_000;
    const weight = area * weightMultiplier;

    setMotorCount(weight < 21 ? 1 : 2);
  }, [
    configuration.basis.size,
    configuration.sonnenschutz.montageartRollladen,
    configuration.zusatze.rahmenverbreiterungAuswahlen,
  ]);

  return (
    <ConfiurationContext.Provider
      value={{
        configuration,
        currentStep,
        currentStepGroup: currentStepPack,
        isLastStepInGroup,
        currentGroup: group,
        substyle,
        orderOfKeys,
        previousStep,
        previousGroup,
        windowSectionCount,
        windowHandleNumber: windowHandleNumberTotal,
        motorCount,
        getStepsForGroup,
        setConfiguration,
        setCurrentStep,
        setCurrentGroup,
        setSubStyle,
        moveToNextStep,
        movePreviousGroup,
        moveNextGroup,
        calculateTotalPrice,
        getMinMaxSizes,
        showSonnenshutzNotApplicableWarning,
        getSonnenschutzPartitionPossibilities,
      }}
    >
      {children}
    </ConfiurationContext.Provider>
  );
};

// Custom hook to use the context
export const useConfiguration = () => {
  const context = useContext(ConfiurationContext);
  if (!context) {
    throw new Error('useConfiguration must be used within an OrderDetailsProvider');
  }
  return context;
};
