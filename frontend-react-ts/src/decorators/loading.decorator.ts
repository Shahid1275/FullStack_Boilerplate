/**
 * Loading Decorator
 * Decorator to show loading state during async operations
 */

export function withLoading(loadingKey: string = 'loading') {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        // Set loading state
        if (this.setState) {
          this.setState({ [loadingKey]: true });
        }

        const result = await originalMethod.apply(this, args);

        // Clear loading state
        if (this.setState) {
          this.setState({ [loadingKey]: false });
        }

        return result;
      } catch (error) {
        // Clear loading state on error
        if (this.setState) {
          this.setState({ [loadingKey]: false });
        }
        throw error;
      }
    };

    return descriptor;
  };
}

export default withLoading;
