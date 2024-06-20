import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native"
import { MaterialIcons } from "@expo/vector-icons"

interface ProductProps extends PressableProps {
  data: {
    name: string
    quantity: number
  }
  onDelete?: () => void
  onView?: () => void
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#68AAA8",
    padding: 24,
    borderRadius: 4,
    gap: 12,
    flexDirection: "row",
  },
  text: {
    flex: 1,
  },
})

export function Product({ data, onDelete, onView, ...rest }: ProductProps) {
  return (
    <Pressable style={styles.button} {...rest}>
      <Text style={styles.text}>
        {data.quantity} - {data.name}
      </Text>

      <TouchableOpacity activeOpacity={0.7} onPress={onDelete}>
        <MaterialIcons name="delete" size={24} color="#003366" />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.7} onPress={onView}>
        <MaterialIcons name="visibility" size={24} color="#003366" />
      </TouchableOpacity>
    </Pressable>
  )
}
