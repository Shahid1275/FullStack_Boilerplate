export class PerformanceMonitor {
  static start(label) {
    performance.mark(`${label}-start`)
  }

  static end(label) {
    performance.mark(`${label}-end`)
    performance.measure(label, `${label}-start`, `${label}-end`)
    const measure = performance.getEntriesByName(label)[0]
    console.log(`${label}: ${measure.duration.toFixed(2)}ms`)
  }
}

export default PerformanceMonitor
