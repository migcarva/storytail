import React from 'react';
import { Ionicons } from '@expo/vector-icons';

export function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}) {
  return <Ionicons style={{ marginBottom: 8 }} size={40} {...props} />;
}
