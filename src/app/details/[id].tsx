import { useEffect, useState } from "react"
import { router, useLocalSearchParams } from "expo-router"
import { Button, StyleSheet, Text, View } from "react-native"

import {
  ProductDatabase,
  useProductDatabase,
} from "@/database/use-product-database"

type ParamsProps = {
  id: string
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },

  text: {
    fontSize: 32,
  },
})

export default function ProductDetails() {
  const database = useProductDatabase()
  const params = useLocalSearchParams<ParamsProps>()

  const [details, setDetails] = useState<Omit<ProductDatabase, "id">>({
    name: "",
    quantity: 0,
  })

  async function onLoadDetails() {
    if (!params?.id) return

    const response = await database.show(Number(params?.id))

    if (response) setDetails(response)
  }

  useEffect(() => {
    onLoadDetails()
  }, [params?.id])

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ID: {params.id}</Text>
      <Text style={styles.text}>Nome: {details.name}</Text>
      <Text style={styles.text}>Quantidade: {details.quantity}</Text>

      <Button title="Voltar" onPress={() => router.navigate("/")} />
    </View>
  )
}
