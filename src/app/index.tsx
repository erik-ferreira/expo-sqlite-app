import { useEffect, useState } from "react"
import {
  StyleSheet,
  Button,
  View,
  Alert,
  FlatList,
  Pressable,
  Text,
} from "react-native"

import { Input } from "@/components/Input"

import {
  ProductDatabase,
  useProductDatabase,
} from "@/database/use-product-database"
import { Product } from "@/components/Product"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 32,
    gap: 16,
  },

  listContentContainerStyle: {
    gap: 16,
  },
})

export default function Index() {
  const database = useProductDatabase()

  const [id, setId] = useState("")
  const [name, setName] = useState("")
  const [search, setSearch] = useState("")
  const [quantity, setQuantity] = useState("")
  const [products, setProducts] = useState<ProductDatabase[]>([])

  async function onListProducts() {
    try {
      const response = await database.searchByName(search)

      setProducts(response)
    } catch (error) {
      console.log("error", error)
    }
  }

  async function handleCreateDatabase() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número.")
      }

      const response = await database.create({
        name,
        quantity: Number(quantity),
      })

      onListProducts()

      Alert.alert(
        "Produto",
        `Produto criado com sucesso. ID: ${response.insertedRowId}`
      )

      setName("")
      setQuantity("")
    } catch (error) {
      console.log("error", error)
    }
  }

  async function handleUpdateDatabase() {
    try {
      if (isNaN(Number(quantity))) {
        return Alert.alert("Quantidade", "A quantidade precisa ser um número.")
      }

      const response = await database.update({
        id: Number(id),
        name,
        quantity: Number(quantity),
      })

      onListProducts()

      Alert.alert("Produto", `Produto atualizado com sucesso. ID: ${id}`)

      setId("")
      setName("")
      setQuantity("")
    } catch (error) {
      console.log("error", error)
    }
  }

  function handleSetProduct(item: ProductDatabase) {
    setId(String(item.id))
    setName(item.name)
    setQuantity(String(item.quantity))
  }

  useEffect(() => {
    onListProducts()
  }, [search])

  return (
    <View style={styles.container}>
      <Input placeholder="Nome" value={name} onChangeText={setName} />
      <Input
        placeholder="Quantidade"
        value={quantity}
        onChangeText={setQuantity}
      />
      <Button title="Salvar" onPress={handleCreateDatabase} />
      <Button title="Atualizar" onPress={handleUpdateDatabase} />

      <Input placeholder="Pesquisar" value={search} onChangeText={setSearch} />

      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Product data={item} onPress={() => handleSetProduct(item)} />
        )}
        contentContainerStyle={styles.listContentContainerStyle}
      />
    </View>
  )
}
