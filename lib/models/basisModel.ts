import { windowStyleKeys } from '@/data/common/common';

const selectionItemSchema = {
  bsonType: 'object',
  required: ['key', 'name'],
  additionalProperties: false,
  properties: {
    key: { bsonType: 'string' },
    name: { bsonType: 'string' },
  },
};

export const basisValidator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['basis', 'farben'],
    additionalProperties: false,
    properties: {
      _id: { bsonType: 'objectId' },
      basis: {
        bsonType: 'object',
        required: [
          'material',
          'brand',
          'profile',
          'style',
          'profileHeight',
          'type',
          'cover',
          'size',
        ],
        additionalProperties: false,
        properties: {
          material: {
            bsonType: 'object',
            required: ['key', 'name'],
            additionalProperties: false,
            properties: {
              key: { enum: ['plastic', 'wood', 'aluminum'] },
              name: { bsonType: 'string' },
            },
          },
          brand: {
            bsonType: 'object',
            required: ['key', 'name'],
            additionalProperties: false,
            properties: {
              key: { enum: ['drutex'] },
              name: { bsonType: 'string' },
            },
          },
          profile: {
            bsonType: 'object',
            required: ['key', 'name'],
            additionalProperties: false,
            properties: {
              key: { enum: ['I5', 'I5C', 'IE', 'IEC', 'IL'] },
              name: { bsonType: 'string' },
            },
          },
          profileHeight: {
            bsonType: 'object',
            required: ['key', 'name'],
            additionalProperties: false,
            properties: {
              key: { enum: ['height66', 'height75'] },
              name: { bsonType: 'string' },
            },
          },
          style: {
            bsonType: 'object',
            required: ['key', 'name'],
            additionalProperties: false,
            properties: {
              key: { enum: windowStyleKeys },
              name: { bsonType: 'string' },
            },
          },
          type: {
            bsonType: 'object',
            additionalProperties: true,
            properties: {
              key: {
                bsonType: 'string',
              },
              name: { bsonType: 'string' },
              handleNumber: { bsonType: 'int' },
              sectionNumber: { bsonType: 'int' },
              sections: {
                bsonType: 'array',
                items: { bsonType: 'string' },
              },
            },
          },
          cover: {
            bsonType: 'object',
            required: ['key', 'name'],
            additionalProperties: false,
            properties: {
              key: {
                bsonType: 'string',
              },
              name: { bsonType: 'string' },
              height: { bsonType: 'number' },
            },
          },
          size: {
            bsonType: 'object',
            required: ['w', 'h'],
            additionalProperties: false,
            properties: {
              w: {
                bsonType: 'number',
              },
              h: { bsonType: 'number' },
            },
          },
          // OPTIONALS
          multiHeight: {
            bsonType: 'object',
            required: ['obenHeight', 'untenHeight'],
            additionalProperties: false,
            properties: {
              obenHeight: { bsonType: 'number' },
              untenHeight: { bsonType: 'number' },
            }
          },
          multiWidth: {
            bsonType: 'object',
            additionalProperties: { bsonType: 'number' },
          },
          obenMultiWidth: {
            bsonType: 'object',
            additionalProperties: { bsonType: 'number' },
          },
          untenMultiWidth: {
            bsonType: 'object',
            additionalProperties: { bsonType: 'number' },
          },
        },
      },
      farben: {
        bsonType: 'object',
        required: [
          'colorExt',
          'colorInt',
          'dichtungAussen',
          'dichtungInnen',
          'colorMid'
        ],
        additionalProperties: false,
        properties: {
          colorExt: {
            bsonType: 'object',
            required: ['key', 'name', 'colorCode'],
            additionalProperties: false,
            properties: {
              key: { bsonType: 'string'  },
              name: { bsonType: 'string' },
              colorCode: { bsonType: 'string' },
            },
          },
          colorInt: {
            bsonType: 'object',
            required: ['key', 'name', 'colorCode'],
            additionalProperties: false,
            properties: {
              key: { bsonType: 'string'  },
              name: { bsonType: 'string' },
              colorCode: { bsonType: 'string' },
            },
          },
          dichtungAussen: {
            ...selectionItemSchema,
          },
          dichtungInnen: {
            ...selectionItemSchema,
          },
          colorMid: {
            ...selectionItemSchema,
          },
          // OPTIONALS
          fenstergriffe: {
            bsonType: 'object',
            required: ['type', 'choice'],
            additionalProperties: false,
            properties: {
              type: {
                ...selectionItemSchema,
              },
              choice: {
                ...selectionItemSchema,
              },
            },
          },
        },
      },
      verglasung: {
        bsonType: 'object',
        required: [
          'druckausgleichsventil',
          'glasspaket',
          'glasspaketWarmeKante',
          'ornament',
          'schallschutz',
          'sicherheitsverglasung',
          'sprossen'
        ],
        additionalProperties: false,
        properties: {
          druckausgleichsventil: {
            ...selectionItemSchema,
          },
          glasspaket: {
            ...selectionItemSchema,
          },
          glasspaketWarmeKante: {
            ...selectionItemSchema,
          },
          ornament: {
            ...selectionItemSchema,
          },
          schallschutz: {
            ...selectionItemSchema,
          },
          sicherheitsverglasung: {
            ...selectionItemSchema,
          },
          sprossen: {
            bsonType: 'string',
          },
        }
      },
      zusatze: {
        bsonType: 'object',
        required: [
          'sicherheitsbeschlage',
          'verdecktLiegenderBeschlag',
          'rahmenverbreiterung',
          'rahmenverbreitungMontiert',
          'dünneSchweißnahtVPerfect',
          'reedKontakt',
          'montagevorbohrungen',
          'lüftungssysteme',
          'druckausgleichsventilZusatze',
          'rahmenverbreiterungAuswahlen',
        ],
        additionalProperties: false,
        properties: {
          sicherheitsbeschlage: {
            bsonType: 'object',
            required: ['category'],
            additionalProperties: false,
            properties: {
              category: { ...selectionItemSchema },
              subCategory: { ...selectionItemSchema },
            },
          },
          verdecktLiegenderBeschlag: { ...selectionItemSchema },
          rahmenverbreiterung: { ...selectionItemSchema },
          rahmenverbreitungMontiert: { ...selectionItemSchema },
          dünneSchweißnahtVPerfect: { ...selectionItemSchema },
          reedKontakt: { ...selectionItemSchema },
          montagevorbohrungen: { ...selectionItemSchema },
          lüftungssysteme: {
            bsonType: 'object',
            required: ['category'],
            additionalProperties: false,
            properties: {
              category: { ...selectionItemSchema },
              subCategory: { ...selectionItemSchema },
              paar: { bsonType: 'number' },
            },
          },
          druckausgleichsventilZusatze: { ...selectionItemSchema },
          rahmenverbreiterungAuswahlen: {
            bsonType: 'object',
            required: ['links', 'rechts', 'oben', 'unten'],
            additionalProperties: false,
            properties: {
              links: { bsonType: 'number' },
              rechts: { bsonType: 'number' },
              oben: { bsonType: 'number' },
              unten: { bsonType: 'number' },
            },
          },
        },
      },
    },
  },
};
