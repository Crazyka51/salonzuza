import type React from "react"
import type { AdminModule } from "../core/types"
import { moduleComponents } from "../modules"

// Dynamic module loader
export class ModuleLoader {
  private loadedModules: Map<string, React.ComponentType<any>> = new Map()

  async loadModule(moduleName: string): Promise<React.ComponentType<any> | null> {
    // Check if already loaded
    if (this.loadedModules.has(moduleName)) {
      return this.loadedModules.get(moduleName)!
    }

    // Load module dynamically
    const moduleLoader = moduleComponents[moduleName as keyof typeof moduleComponents]
    if (!moduleLoader) {
      console.error(`Module ${moduleName} not found`)
      return null
    }

    try {
      const ModuleComponent = await moduleLoader()
      this.loadedModules.set(moduleName, ModuleComponent)
      return ModuleComponent
    } catch (error) {
      console.error(`Failed to load module ${moduleName}:`, error)
      return null
    }
  }

  // Preload modules for better performance
  async preloadModules(modules: AdminModule[]) {
    const loadPromises = modules.map((module) => this.loadModule(module.component as string))
    await Promise.allSettled(loadPromises)
  }

  // Clear loaded modules (useful for development)
  clearCache() {
    this.loadedModules.clear()
  }
}

// Global module loader instance
export const moduleLoader = new ModuleLoader()
