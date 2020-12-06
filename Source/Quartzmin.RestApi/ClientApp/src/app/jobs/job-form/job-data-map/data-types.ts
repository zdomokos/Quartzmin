export enum DataType {
  string = 'String',
  stringMultiline = 'String (multiline)',
  boolean = 'Boolean',
  dateTime = 'DateTime',
  dateTimeUtc = 'DateTime UTC',
  date = 'Date',
  binary = 'Binary Data',
  decimal = 'Decimal',
  double = 'Double',
  float = 'Float',
  integer = 'Integer',
  long = 'Long'
}

export const DataTypeMap = Object.keys(DataType).map(key => {
  return {
    name: DataType[key],
    value: key
  };
});

type DataTypeKeysType = Partial<{ [key in keyof typeof DataType]: string }>;

export const DataTypeKeys = Object.keys(DataType).reduce<DataTypeKeysType>((acc, key) => ({ ...acc, ...{ [key]: key } }), {});

export const dataTypes = [
  { name: 'String' },
  { name: 'String (multiline)' },
  { name: 'Boolean' },
  { name: 'DateTime' },
  { name: 'DateTime UTC' },
  { name: 'Date' },
  { name: 'Binary Data' },
  { name: 'Decimal' },
  { name: 'Double' },
  { name: 'Float' },
  { name: 'Integer' },
  { name: 'Long' },
];
