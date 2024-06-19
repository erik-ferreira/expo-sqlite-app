import { StyleSheet, TextInput, TextInputProps } from "react-native"

const styles = StyleSheet.create({
  input: {
    height: 54,
    borderWidth: 1,
    borderColor: "#d4d4d",
    borderRadius: 8,
    paddingHorizontal: 16,
  },
})

export function Input({ ...rest }: TextInputProps) {
  return <TextInput style={styles.input} {...rest} />
}
