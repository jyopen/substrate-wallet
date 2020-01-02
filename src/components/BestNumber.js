// Copyright 2017-2019 @polkadot/react-query authors & contributors
// This software may be modified and distributed under the terms
// of the Apache-2.0 license. See the LICENSE file for details.

import React from 'react';
import {Text} from 'react-native';
import {formatNumber} from '@polkadot/util';
import {useApi, useCall} from '../hooks';

type Props = {
  children?: React.ReactNode,
  label?: string,
};

export default function BestNumber({children, style, label}: Props) {
  const {api, isApiReady} = useApi();
  const bestNumber = useCall(
    isApiReady ? api?.derive?.chain?.bestNumber : null,
    [],
  );
  return (
    <Text style={style}>
      {label || ''}
      {bestNumber ? formatNumber(bestNumber) : '-'}
      {children}
    </Text>
  );
}
