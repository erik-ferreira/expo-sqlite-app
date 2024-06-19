import { Slot } from "expo-router"
import { SQLiteProvider } from "expo-sqlite"

import { initializeDatabase } from "@/database/initialize-database"

export default function Layout() {
  return (
    <SQLiteProvider databaseName="sqlite.db" onInit={initializeDatabase}>
      <Slot />
    </SQLiteProvider>
  )
}
