/**
 * 生成symbol类型的provide key
 * @param module 模块名称
 * @returns func
 */
export const provideKeyFactory = (module: string) => (key: string) => Symbol(`@${module}:${key}`);