import { View, Platform, StyleSheet, Pressable } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import icon from '@/constants/TabBarIcons';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
import { useEffect } from 'react';

const TabBarButton = ({ onPress, onLongPress, isFocused, label, color, routeName }: { onPress: Function, onLongPress: Function, isFocused: boolean, label: string, color: string, routeName: string }) => {
  const scale = useSharedValue(0);

  useEffect(() => {
    scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0) : isFocused, { duration: 350 });
  }, [isFocused, scale]);

  

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

    const top = interpolate(scale.value, [0, 1], [0, 7]);
    return {
      transform: [{ scale: scaleValue }], top
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0]);
    return {
      opacity,
    };
  });


  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      style={styles.tabItem}
    >
    <Animated.View style={[animatedIconStyle]}>
    {icon[routeName]({
        color: isFocused ? "#fff" : '#222'
      })}
    </Animated.View>
      <Animated.Text style={[animatedTextStyle, { color: isFocused ? "#673ab7" : "#222", fontSize: 10 }]}>
          {label}
        </Animated.Text>
    </Pressable>
  )
}

export default TabBarButton;

const styles = StyleSheet.create({
  tabItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
  },
})

