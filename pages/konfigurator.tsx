import { steps } from '@/data/steps';
import style from '.././styles/KonfiguratorPage.module.css';
import { GroupKey } from '@/types/Configurator';
import SummaryDisplayer from '@/components/Summary/Summary';
import Configuration_Group from '@/components/Configuration_Group/Configuration_Group';
import Basis_Configuration from '@/components/Configuration_Basis/Configuration_Basis';
import { OrderDetailsProvider } from '@/context/OrderDetailsContext';
import { ConfigurationProvider } from '@/context/ConfigurationContext';
import Sonnenschutz_Group from '@/components/Configuration_Sonnenschutz/SonnensschutzGroup';
import UniversalModal from '@/components/UniversalModal/UniversalModal';
import { ModalProvider } from '@/context/ModalContext';
import Grouper from '@/components/Grouper/Grouper';

export default function Page() {
  return (
    <OrderDetailsProvider>
      <ConfigurationProvider>
        <ModalProvider>
          <PageContent />
          <UniversalModal />
        </ModalProvider>
      </ConfigurationProvider>
    </OrderDetailsProvider>
  );
}

function PageContent() {
  return (
    <>
      <div className={style.config}>
        <div>
          <Grouper />
          {Object.entries(steps).map(([stepKey]) =>
            stepKey === 'basis' ? (
              <Basis_Configuration key={stepKey} />
            ) : stepKey === 'sonnenschutz' ? (
              <Sonnenschutz_Group key={stepKey} />
            ) : (
              <Configuration_Group
                key={stepKey}
                groupTitle={stepKey as GroupKey}
              />
            )
          )}
        </div>
        <SummaryDisplayer />
      </div>
    </>
  );
}
