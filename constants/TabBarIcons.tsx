import { AntDesign } from "@expo/vector-icons";

type IconProps = {
    color: string;
};

const TabBarIcons = {
    'index': ({ color }: IconProps) => <AntDesign name='home' size={22} color={color} />,
    'habits': ({ color }: IconProps) => <AntDesign name='calendar' size={22} color={color} />,
    'ai': ({ color }: IconProps) => <AntDesign name='linechart' size={22} color={color} />,
    'knowledge': ({ color }: IconProps) => <AntDesign name='book' size={22} color={color} />,
} as const;

export default TabBarIcons;