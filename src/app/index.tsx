import { useState } from "react"
import { StyleSheet, Button, View, Alert } from "react-native"

import { Input } from "@/components/Input"

import { useProductDatabase } from "@/database/use-product-database"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },
})

export default function Index() {
  const database = useProductDatabase()

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [quantity, setQuantity] = useState("")
  const [products, setProducts] = useState([])

  async function handleCreateDatabase() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número.")
      }

      const response = await database.create({
        name,
        quantity: Number(quantity),
      })

      Alert.alert(
        "Produto",
        `Produto criado com sucesso. ID: ${response.insertedRowId}`
      )
    } catch (error) {
      console.log("error", error)
    }
  }

  async function onListProducts() {
    try {
    } catch (error) {
      console.log("error", error)
    }
  }

  return (
    <View style={styles.container}>
      <Input placeholder="Nome" value={name} onChangeText={setName} />
      <Input
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Salvar" onPress={handleCreateDatabase} />
    </View>
  )
}
