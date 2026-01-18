import { GetServerSideProps } from 'next';
import { getDb } from '@/lib/mongodb';
import { calculateTotalPriceForConfiguration } from '@/utils/priceCalculator';
import { FensterConfig } from '@/types/Configurator';
import { ObjectId } from 'mongodb';

type OrderDoc = {
  _id: string;
  basis?: unknown;
  farben?: unknown;
  verglasung?: unknown;
  zusatze?: unknown;
  sonnenschutz?: unknown;
  totalPrice?: number;
  calculatedTotalPrice?: number | null;
  [key: string]: unknown;
};

type DbOrderDoc = Omit<OrderDoc, '_id'> & {
  _id: ObjectId;
};

type TestsPageProps = {
  orders: OrderDoc[];
};

const formatValue = (key: string, value: unknown, order: OrderDoc): string => {
  if (value === null || value === undefined) return '--';
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return String(value);
  }
  if (key === 'size' && typeof value === 'object' && value) {
    const v = value as { w?: number; h?: number };
    return `Breite: ${v.w ?? '--'}, Höhe: ${v.h ?? '--'}`;
  }
  if (key === 'multiHeight' && typeof value === 'object' && value) {
    const v = value as { obenHeight?: number; untenHeight?: number };
    return `Oben: ${v.obenHeight ?? '--'}, Unten: ${v.untenHeight ?? '--'}`;
  }
  if (key === 'multiWidth' || key === 'obenMultiWidth' || key === 'untenMultiWidth') {
    return Object.values(value as Record<string, number>).join(' - ');
  }
  if (key === 'rahmenverbreiterung') {
    const selection = value as { name?: string };
    if (selection?.name === 'Nein') {
      return 'Nein';
    }
    const zusatze = order.zusatze as Record<string, unknown> | undefined;
    const auswahlen = (zusatze?.rahmenverbreiterungAuswahlen ?? {}) as Record<string, number>;
    const montiert =
      (zusatze?.rahmenverbreitungMontiert as { name?: string } | undefined)?.name ?? '--';
    const ausgewahlenText = Object.entries(auswahlen).reduce(
      (acc, [k, val]) => acc + `${k}: ${val} `,
      ''
    );
    return `${selection?.name ?? '--'} - Montiert: ${montiert} ${ausgewahlenText}`;
  }
  if (key === 'fenstergriffe' && typeof value === 'object' && value) {
    const v = value as { type?: { name?: string }; choice?: { name?: string } };
    return `${v.type?.name ?? '--'} - ${v.choice?.name ?? '--'}`;
  }
  if (key === 'kastenDimensions' && typeof value === 'object' && value) {
    const v = value as { w?: number; h?: number };
    return `w: ${v.w ?? '--'}, h: ${v.h ?? '--'}`;
  }
  if (typeof value === 'object' && value) {
    const v = value as Record<string, unknown>;
    if ('category' in v && 'subCategory' in v) {
      const cat = (v.category as { name?: string })?.name ?? '--';
      const sub = (v.subCategory as { name?: string })?.name ?? '--';
      return `${cat} - ${sub}`;
    }
    if ('name' in v) {
      return String((v as { name?: string }).name ?? '--');
    }
  }
  return '--';
};

const renderGroup = (title: string, group?: Record<string, unknown>, order?: OrderDoc) => {
  if (!group) return null;
  const entries = Object.entries(group);
  if (entries.length === 0) return null;
  return (
    <section style={{ marginTop: 12 }}>
      <h3
        style={{
          marginBottom: 6,
          backgroundColor: 'var(--color-1)',
          color: 'white',
          padding: '6px 8px',
          borderRadius: 6,
        }}
      >
        {title}
      </h3>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <tbody>
          {entries.map(([key, value]) => (
            <tr key={key}>
              <td
                style={{
                  padding: '6px 8px',
                  borderBottom: '1px solid #e3e3e3',
                  width: '30%',
                  fontWeight: 600,
                }}
              >
                {key}
              </td>
              <td style={{ padding: '6px 8px', borderBottom: '1px solid #e3e3e3' }}>
                {formatValue(key, value, order || { _id: '' })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default function TestsPage({ orders }: TestsPageProps) {
  return (
    <main style={{ padding: 24 }}>
      <div style={{ maxWidth: 900 }}>
        <h1>Orders</h1>
        <p>Total: {orders.length}</p>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div>
            {orders.map((order) => {
              const pricesMatch =
                typeof order.totalPrice === 'number' &&
                typeof order.calculatedTotalPrice === 'number' &&
                Math.abs(order.totalPrice - order.calculatedTotalPrice) <= 0.0000001;
              return (
                <details
                  key={order._id}
                  style={{
                    marginBottom: 12,
                    border: '1px solid #e3e3e3',
                    borderRadius: 8,
                    padding: '8px 10px',
                  }}
                >
                  <summary
                  style={{
                    cursor: 'pointer',
                    fontWeight: 600,
                    backgroundColor:
                      typeof order.totalPrice === 'number' &&
                      typeof order.calculatedTotalPrice === 'number'
                        ? pricesMatch
                          ? '#d1fae5'
                          : '#fee2e2'
                        : 'transparent',
                    padding: '4px 6px',
                    borderRadius: 6,
                  }}
                  >
                    {order._id}
                  </summary>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 6 }}>
                    {typeof order.totalPrice === 'number' && (
                      <div
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#e0f2fe',
                          color: '#0c4a6e',
                          fontWeight: 700,
                          borderRadius: 6,
                          display: 'inline-block',
                        }}
                      >
                        Stored Price: {order.totalPrice}
                      </div>
                    )}
                    {order.calculatedTotalPrice !== undefined && (
                      <div
                        style={{
                          padding: '6px 10px',
                          backgroundColor: '#fef3c7',
                          color: '#92400e',
                          fontWeight: 600,
                          borderRadius: 6,
                          display: 'inline-block',
                        }}
                      >
                        Calculated Price:{' '}
                        {order.calculatedTotalPrice === null ? '--' : order.calculatedTotalPrice}
                      </div>
                    )}
                    <div style={{ marginLeft: 'auto' }}></div>
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gap: 12,
                      gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
                    }}
                  >
                    {renderGroup('Basis', order.basis as Record<string, unknown>, order)}
                    {renderGroup('Farben', order.farben as Record<string, unknown>, order)}
                    {renderGroup('Verglasung', order.verglasung as Record<string, unknown>, order)}
                    {renderGroup('Zusatze', order.zusatze as Record<string, unknown>, order)}
                    {renderGroup(
                      'Sonnenschutz',
                      order.sonnenschutz as Record<string, unknown>,
                      order
                    )}
                  </div>
                </details>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps<TestsPageProps> = async () => {
  const db = await getDb();
  const docs = await db
    .collection<DbOrderDoc>('fenster-orders')
    .find({}, { sort: { _id: -1 }, limit: 50 })
    .toArray();

  const orders = docs.map((doc) => {
    const base: OrderDoc = {
      ...doc,
      _id: doc._id.toString(),
    };
    const configuration = {
      basis: base.basis,
      farben: base.farben,
      verglasung: base.verglasung,
      zusatze: base.zusatze,
      sonnenschutz: base.sonnenschutz ?? {},
    } as FensterConfig;

    const calculatedTotalPrice = calculateTotalPriceForConfiguration(configuration);

    return {
      ...base,
      calculatedTotalPrice,
    };
  });

  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
};
