export interface KarabinerModsBase {
  fn_function_keys: any[];
  simple_modifications: any[];
}

export interface KarabinerProfileDevice extends KarabinerModsBase {
  identifiers: {
    product_id: number;
    vendor_id: number;
  };
}

export interface KarabinerComplexRule {
  description: string;
  manipulators: any[]; // { from, to, type }
}

export interface KarabinerProfile extends KarabinerModsBase {
  name: string;
  complex_modifications: {
    rules: KarabinerComplexRule[];
  };
  devices: KarabinerProfileDevice[];
}

export interface KarabinerConfig {
  global: any;
  profiles: KarabinerProfile[];
}

export interface KeyObject {
  key_code: string;
  modifiers?: any;
}

export interface ConsumerKeyObject {
  consumer_key_code: any;
}
