/* eslint-disable */
import { Bytes, Text, u32, Null } from '@polkadot/types';
import { Option, Struct, Enum } from '@polkadot/types/codec';
import { Registry } from '@polkadot/types/types';
import AccountId from '@polkadot/types/primitive/Generic/AccountId';

export class MetadataRecord extends Struct {
  constructor (registry: Registry, value: any) {
    super(registry, {
      avatar: Text,
      display_name: Text,
      tagline: Text,
    }, value);
  }
  get avatar (): Text {
    return this.get('avatar');
  }
  get display_name (): Text {
    return this.get('display_name');
  }
  get tagline (): Text {
    return this.get('tagline');
  }
}

export class Registered extends Null { }
export class Attested extends Null { }
export class Verified extends Null { }

export class IdentityStage extends Enum {
  constructor (registry: Registry, value?: string, index?: number) {
    super(registry, {
      registered: Registered,
      attested: Attested,
      verified: Verified,
    }, value, index);
  }
}

export class IdentityRecord extends Struct {
  constructor (registry: Registry, value: any) {
    super(registry, {
      account: AccountId,
      identity_type: Text,
      identity: Bytes,
      stage: IdentityStage,
      expiration_time: u32,
      proof: Option.with(Text),
      metadata: Option.with(MetadataRecord),
    }, value);
  }
  get account (): AccountId {
    return this.get('account');
  }
  get identity (): Bytes {
    return this.get('identity');
  }
  get stage (): IdentityStage {
    return this.get('stage');
  }
  get expiration_time(): u32 {
    return this.get('expiration_time');
  }
  get proof (): Option<Text> {
    return this.get('proof');
  }
  get metadata (): Option<MetadataRecord> {
    return this.get('metadata');
  }
}

// Old types that aren't used anymore (kept for backwards compatability)
const ArchivedTypes = {
  IdentityIndex: u32,
  Claim: Bytes,
};

// Current types
const CurrentTypes = {
  IdentityStage,
  IdentityRecord,
  MetadataRecord,
  IdentityType: Text,
  Attestation: Bytes,
  Identity: Bytes,
};

export const IdentityTypes = { ...ArchivedTypes, ...CurrentTypes };
