import { windowStyleKeys } from '@/data/common/common';

export const basisValidator = {
  $jsonSchema: {
    bsonType: 'object',
    required: ['basis'],
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
            required: ['key', 'name'],
            additionalProperties: false,
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
          multiWidth: {
            bsonType: 'object',
            additionalProperties: { bsonType: 'number' },
          },
        },
      },
    },
  },
};
