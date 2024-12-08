import { AntDesign } from "@expo/vector-icons";

const icon = {
    index: (props: { color: string }) => (<AntDesign name='home' size={22} color={props.color} />),
    habits: (props: { color: string }) => (<AntDesign name='calendar' size={22} color={props.color} />),
    ai: (props: { color: string }) => (<AntDesign name='home' size={22} color={props.color} />),
    knowledge: (props: { color: string }) => (<AntDesign name='book' size={22} color={props.color} />),
    progress: (props: { color: string }) => (<AntDesign name='linechart' size={22} color={props.color} />),
}

export default icon;