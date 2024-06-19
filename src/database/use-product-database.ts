import { useSQLiteContext } from "expo-sqlite"

export interface ProductDatabase {
  id: number
  name: string
  quantity: number
}

export function useProductDatabase() {
  const database = useSQLiteContext()

  async function create(data: Omit<ProductDatabase, "id">) {
    const statement = await database.prepareAsync(`
      INSERT INTO products (name, quantity) VALUES ($name, $quantity)  
    `)

    try {
      const result = await statement.executeAsync({
        $name: data.name,
        $quantity: data.quantity,
      })

      const insertedRowId = result.lastInsertRowId.toLocaleString()

      return { insertedRowId }
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  async function searchByName(name: string) {
    try {
      const query = "SELECT * FROM products WHERE name LIKE ?"

      const response = await database.getAllAsync<ProductDatabase>(
        query,
        `%${name}%`
      )

      return response
    } catch (error) {
      throw error
    }
  }

  async function update(data: ProductDatabase) {
    const statement = await database.prepareAsync(`
      UPDATE products SET name = $name, quantity = $quantity WHERE id = $id  
    `)

    try {
      await statement.executeAsync({
        $id: data.id,
        $name: data.name,
        $quantity: data.quantity,
      })
    } catch (error) {
      throw error
    } finally {
      await statement.finalizeAsync()
    }
  }

  return {
    create,
    searchByName,
    update,
  }
}
