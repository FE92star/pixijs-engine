/**
 * 获取实例类型
 */
export type InstanceType<T extends new (...args: any[]) => any> = T extends new (...args: any[]) => infer R ? R : any

export type EmptyFn = () => void
