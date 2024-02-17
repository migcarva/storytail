import { Ionicons } from '@expo/vector-icons';
import React from 'react';

const TabBarIcon: React.FC<{
  name: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
}> = ({ name, color }) => {
  return <Ionicons style={{ marginBottom: 8 }} size={40} name={name} color={color} />;
};

export default TabBarIcon;
