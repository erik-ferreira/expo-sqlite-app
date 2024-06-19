import { Pressable, PressableProps, StyleSheet, Text } from "react-native"

interface ProductProps extends PressableProps {
  data: {
    name: string
    quantity: number
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#68AAA8",
    padding: 24,
    borderRadius: 4,
    gap: 12,
    flexDirection: "row",
  },
})

expo

export function Product({ data, ...rest }: ProductProps) {
  return (
    <Pressable style={styles.button} {...rest}>
      <Text>
        {data.quantity} - {data.name}
      </Text>
    </Pressable>
  )
}
