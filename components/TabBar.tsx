import { View, Platform, StyleSheet, LayoutChangeEvent } from 'react-native';
import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { AntDesign } from '@expo/vector-icons';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

export default  function TabBar({ state, descriptors, navigation } : BottomTabBarProps) {
    const { colors } = useTheme();
    const { buildHref } = useLinkBuilder();

    const [dimensions, setDimensions] = useState({ width: 100, height: 20 });
    const buttonWidth = dimensions.width / state.routes.length;
    const onTabBarLayout = (event: LayoutChangeEvent) => {
        const { width, height } = event.nativeEvent.layout;
        setDimensions({ width, height });
    }


    const tabPositionX = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{ translateX: tabPositionX.value }],
        };
    });

    return (
      <View style={styles.tabbar} onLayout={onTabBarLayout}>
        <Animated.View style={[animatedStyle, {
          position: 'absolute',
          backgroundColor: '#000',
          borderRadius: 30,
          marginHorizontal: 12,
          height: dimensions.height - 15,
          width: buttonWidth - 25,
        }]}/>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            tabPositionX.value = withSpring(index * buttonWidth, {duration: 1500});
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          
  
          return (

            <TabBarButton 
              key={route.name}
              onPress={onPress}
              onLongPress={onLongPress}
              isFocused={isFocused}
              label={label}
              color={isFocused ? colors.primary : colors.text}
              routeName={route.name}
            />
            // <PlatformPressable
            //   key={route.name}
            //   href={buildHref(route.name, route.params)}
            //   accessibilityState={isFocused ? { selected: true } : {}}
            //   accessibilityLabel={options.tabBarAccessibilityLabel}
            //   testID={options.tabBarButtonTestID}
            //   onPress={onPress}
            //   onLongPress={onLongPress}
            //   style={styles.tabItem}
            // >
            //    {icon[route.name as keyof typeof icon]({ focused: isFocused, color: colors.primary })}
            //   {/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>
            //     {label}
            //   </Text> */}
            // </PlatformPressable>
          );
        })}
      </View>
    );
  }

  const styles = StyleSheet.create({
    tabbar: {
      position: 'absolute',
      bottom: 30,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      backgroundColor: 'white',
      marginHorizontal: 10,
      paddingVertical: 12,
      borderRadius: 100,
      shadowColor: '#000',
      elevation: 6,
    }
  });
